// Lógica para el puzzle "El Guardián Lógico"

// Variable global para almacenar la elección correcta del sobre
let correctEnvelope = '';

// Función para manejar la primera parte: decidir el sobre correcto
function handleGuardianLogic(event) {
    event.preventDefault();
    const groupSizeInput = document.getElementById('group-size-input');
    const groupSize = parseInt(groupSizeInput.value, 10);

    if (isNaN(groupSize) || groupSize <= 0) {
        alert('Por favor, introduce un número válido de viajeros.');
        return;
    }

    // Aplicar las reglas condicionales
    if (groupSize > 5) {
        correctEnvelope = 'verde';
    } else if (groupSize % 2 === 0) {
        correctEnvelope = 'azul';
    } else {
        correctEnvelope = 'rojo';
    }

    // Ocultar la parte 1 y mostrar la parte 2
    document.getElementById('guardian-part-1').classList.add('hidden');
    document.getElementById('guardian-part-2').classList.remove('hidden');
}

// Función para manejar la segunda parte: abrir un sobre
function openEnvelope(color) {
    if (color === correctEnvelope) {
        // Si es correcto, ocultar la parte 2 y mostrar la parte 3
        document.getElementById('guardian-part-2').classList.add('hidden');
        document.getElementById('guardian-part-3').classList.remove('hidden');
    } else {
        alert('Esta gema no reacciona. Parece que no es vuestra senda. Vuelve a intentarlo desde el principio.');
        // Opcional: recargar la página para que elijan de nuevo el número
        window.location.reload();
    }
}

// Función para manejar la tercera parte: comprobar la solución binaria
function checkBinaryCode(event) {
    event.preventDefault();
    const solutionInput = document.getElementById('binary-solution-input');
    const solution = solutionInput.value;

    if (solution.toUpperCase() === 'HOLA') {
        alert('El golem asiente y la palabra resuena en la sala. La puerta se abre.');
        window.location.href = 'laberinto-infinito.html';
    } else {
        alert('La palabra pronunciada no tiene efecto. Debe ser incorrecta.');
    }
}


// --- INICIALIZACIÓN DEL PUZZLE ---
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el nombre del jugador (función de script.js)
    if(typeof loadPlayerName === 'function') {
        loadPlayerName();
    }

    // Asignar los eventos a los formularios de este puzzle
    const form1 = document.getElementById('guardian-form-1');
    if (form1) {
        form1.addEventListener('submit', handleGuardianLogic);
    }

    const form2 = document.getElementById('guardian-form-2');
    if (form2) {
        form2.addEventListener('submit', checkBinaryCode);
    }
});
