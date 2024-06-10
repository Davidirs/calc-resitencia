const bandasSelect = document.getElementById('bandas');
const bandasColorContenedor = document.getElementById('bandas-color');
const selectoresColorContenedor = document.getElementById('selectores-color');
const valorResistenciaSpan = document.getElementById('valor-resistencia');
const toleranciaSpan = document.getElementById('tolerancia');
let coloresSeleccionados = [];
let numeroBandas = 3;

const colores = {
    black: '#000000',
    brown: '#96633D',
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    green: '#008000',
    blue: '#0000FF',
    violet: '#800080',
    grey: '#C0C0C0',
    white: '#FFFFFF',
    gold: '#DAA52B',
    silver: '#C0C0C0'
};

const codigosColores = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
    gold: 5,
    silver: 6
};

const tolerancias = {
    grey: '0,05%',
    violet: '0,10%',
    blue: '0,25%',
    green: '0,5%',
    brown: '1%',
    red: '2%',
    green: '3%',
    gold: '5%',
    silver: '10%'
};
bandasSelect.addEventListener('change', actualizarTabla);

// Crear selectores de color iniciales para 3 bandas
actualizarTabla();

function limpiarValores() {

    coloresSeleccionados = [];
    valorResistenciaSpan.textContent = '';
    toleranciaSpan.textContent = '';
    crearBandasColor()
    document.querySelectorAll('.seleccionado').forEach(item => {
        item.classList.remove('seleccionado');
    })
    document.querySelectorAll('.hidden').forEach(item => {
        item.classList.remove('hidden');
    })
}
function actualizarTabla() {
    numeroBandas = parseInt(bandasSelect.value);
    limpiarValores();


    // Limpiar selectores de color existentes
    selectoresColorContenedor.innerHTML = '';

    // Crear y agregar selectores de color según el número de bandas
    for (const color in colores) {

        const selector = crearSelectorColor(color);
        selector.classList.add(color);
        selectoresColorContenedor.appendChild(selector);
    }

    // Seleccionar los colores por defecto para 3 bandas (after loop)
    /* const coloresDefecto3Bandas = ['black', 'marron', 'orange'];
    for (let i = 0; i < coloresDefecto3Bandas.length; i++) {
        const selector = document.querySelector(`.selector-color[style="background-color: ${coloresDefecto3Bandas[i]}"]`);
        if (selector) { // Check if selector exists before accessing classList
            selector.classList.add('seleccionado');
        }
    } */

    calcularResistenciaTolerancia();
    bloquearSelectores();

}



function crearSelectorColor(color) {
    const selector = document.createElement('div');
    selector.classList.add('selector-color');
    selector.style.backgroundColor = color;
    console.log(color);

    selector.addEventListener('click', click => {

        if (coloresSeleccionados.length === numeroBandas) {
            return;
        }
        seleccionarColor(color);

        crearBandasColor();

    });

    return selector;
}

function color(color) {

}


function seleccionarColor(colorSeleccionado) {
    const existe = document.querySelector(`.${colorSeleccionado}.seleccionado`)

    // Si existe suspender
    /* if (existe) {
        return;
    } */
    // Marcar el selector de color seleccionado
    const selectorSeleccionado = document.querySelector(`.${colorSeleccionado}`);
    selectorSeleccionado.classList.add('seleccionado');
    coloresSeleccionados.push(colorSeleccionado)

    // Actualizar el cálculo de la resistencia y la tolerancia
    calcularResistenciaTolerancia();

    bloquearSelectores()
}


function calcularResistenciaTolerancia() {
    numeroBandas = parseInt(bandasSelect.value);/* 
    const coloresSeleccionados = document.querySelectorAll('.selector-color.seleccionado'); */

    // Validar que se hayan seleccionado todos los colores necesarios
    if (coloresSeleccionados.length < numeroBandas) {
        return;
    }
    // Obtener los valores de las bandas
    let valorPrimeraBanda;
    let valorSegundaBanda;
    let multiplicador;
    let tolerancia;

    for (let i = 0; i < coloresSeleccionados.length; i++) {
        const color = coloresSeleccionados[i];

        tolerancia = '20%';

        if (i < 2) {
            const valorBanda = codigosColores[color];
            if (valorBanda === undefined) {
                return; // Color no válido
            }

            if (i === 0) {
                valorPrimeraBanda = valorBanda;
            } else {
                valorSegundaBanda = valorBanda;
            }
        } else if (i === 2) {
            multiplicador = codigosColores[color];
            if (multiplicador === undefined) {
                return; // Color no válido
            }
        } else { // Banda 3 o 4 (tolerancia)

            tolerancia = tolerancias[color];
            if (tolerancia === undefined) {
                return;
            }
        }
    }

    // Calcular el valor de la resistencia
    let valorResistencia = valorPrimeraBanda * 100 + valorSegundaBanda * 10;
    valorResistencia *= Math.pow(10, multiplicador - 1);

    // Mostrar el resultado en la tabla
    valorResistenciaSpan.textContent = valorResistencia;
    toleranciaSpan.textContent = tolerancia;

}

function crearBandasColor() {

    bandasColorContenedor.textContent = '';
    for (let i = 0; i < numeroBandas; i++) {
        const banda = document.createElement('div');
        banda.classList.add('banda-color');
        banda.style.backgroundColor = coloresSeleccionados[i];

        bandasColorContenedor.appendChild(banda);

    }
}
function bloquearSelectores() {

    document.querySelector('.gold').classList.add('hidden');
    document.querySelector('.silver').classList.add('hidden');
    switch (numeroBandas) {
        
        case 4:
            if (coloresSeleccionados.length > 2) {
                document.querySelector('.black').classList.add('hidden');
                document.querySelector('.orange').classList.add('hidden');
                document.querySelector('.yellow').classList.add('hidden');
                document.querySelector('.white').classList.add('hidden');
                document.querySelector('.gold').classList.remove('hidden');
                document.querySelector('.silver').classList.remove('hidden');
            }

            break;

        case 5:
            if (coloresSeleccionados.length > 3) {
                document.querySelector('.black').classList.add('hidden');
                document.querySelector('.orange').classList.add('hidden');
                document.querySelector('.yellow').classList.add('hidden');
                document.querySelector('.white').classList.add('hidden');
                document.querySelector('.gold').classList.remove('hidden');
                document.querySelector('.silver').classList.remove('hidden');
            } else {
                document.querySelector('.gold').classList.add('hidden');
                document.querySelector('.silver').classList.add('hidden');

            }

            break;

        default:
            break;
    }
    document.querySelectorAll('.hidden').forEach(item => {
        
        console.log('ocultado');
      });
      
}