// Lógica para el puzzle "El Laberinto Infinito"

// --- Configuración del Laberinto ---
const GRID_SIZE = 10;
const CELL_SIZE = 30; // px
const PATH = 0;
const WALL = 1;
const EXIT_SALIDA = 2;
const EXIT_BIEN = 3;
const EXIT_LOOP = 4;

// Definición del laberinto (10x10)
// 0: Camino, 1: Pared, 2: Salida "Salida", 3: Salida "Bien", 4: Salida "Loop"
// El camino del algoritmo "Repite 4 veces: Avanza 3, Gira Derecha, Avanza 1, Gira Izquierda"
// desde (0,0) Este, lleva a (7,9)
const labyrinth = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 3], // (0,9) is EXIT_BIEN
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 4], // (3,9) is EXIT_LOOP
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // (9,0) is EXIT_SALIDA
];

// --- Estado del Robot ---
let robotX, robotY; // Posición actual en la cuadrícula
let robotDir;      // Dirección (0: Norte, 1: Este, 2: Sur, 3: Oeste)
let pathHistory = []; // Historial de celdas visitadas
let isMoving = false; // Para evitar movimientos rápidos

// --- Referencias DOM ---
let labyrinthGridElement;
let robotElement;
let resultMessageElement;
let labyrinthForm;
let labyrinthKeyInput;
let commandButtons;
let resetButton;

// --- Funciones de Dibujo y Reseteo ---

function drawLabyrinth() {
    labyrinthGridElement.innerHTML = ''; // Limpiar grid
    labyrinthGridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
    labyrinthGridElement.style.gridTemplateRows = `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (labyrinth[y][x] === WALL) {
                cell.classList.add('wall');
            } else if (labyrinth[y][x] === EXIT_SALIDA) {
                cell.classList.add('exit');
                cell.textContent = 'SALIDA';
            } else if (labyrinth[y][x] === EXIT_BIEN) {
                cell.classList.add('exit');
                cell.textContent = 'BIEN';
            } else if (labyrinth[y][x] === EXIT_LOOP) {
                cell.classList.add('exit', 'loop');
                cell.textContent = 'LOOP';
            }
            cell.dataset.x = x;
            cell.dataset.y = y;
            labyrinthGridElement.appendChild(cell);
        }
    }
}

function updateRobotPosition() {
    robotElement.style.left = `${robotX * CELL_SIZE + 1}px`; // +1 para borde
    robotElement.style.top = `${robotY * CELL_SIZE + 1}px`;  // +1 para borde
}

function resetGame() {
    robotX = 0;
    robotY = 0;
    robotDir = 1; // Empieza mirando al Este
    pathHistory = [];
    resultMessageElement.textContent = '';
    
    // Limpiar celdas resaltadas
    document.querySelectorAll('.grid-cell.path-taken').forEach(cell => {
        cell.classList.remove('path-taken');
    });

    // Ocultar formulario de clave
    labyrinthForm.classList.add('hidden');
    labyrinthKeyInput.value = '';
    labyrinthKeyInput.removeAttribute('readonly'); // Permitir edición si se reinicia

    updateRobotPosition();
    isMoving = false; // Resetear estado de movimiento
}

// --- Funciones de Movimiento del Robot ---

function moveForward(steps) {
    for (let i = 0; i < steps; i++) {
        let nextX = robotX;
        let nextY = robotY;

        if (robotDir === 0) nextY--; // Norte
        else if (robotDir === 1) nextX++; // Este
        else if (robotDir === 2) nextY++; // Sur
        else if (robotDir === 3) nextX--; // Oeste

        // Comprobar límites y paredes
        if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE || labyrinth[nextY][nextX] === WALL) {
            resultMessageElement.textContent = '¡El autómata ha chocado con una pared o límite!';
            return false; // Movimiento inválido
        }

        robotX = nextX;
        robotY = nextY;
        pathHistory.push({ x: robotX, y: robotY });
        
        // Resaltar celda
        const cell = document.querySelector(`.grid-cell[data-x="${robotX}"][data-y="${robotY}"]`);
        if (cell) {
            cell.classList.add('path-taken');
        }
        updateRobotPosition();
    }
    return true; // Movimiento válido
}

function turnRight() {
    robotDir = (robotDir + 1) % 4;
}

function turnLeft() {
    robotDir = (robotDir + 3) % 4; // (robotDir - 1 + 4) % 4
}

// --- Ejecución de Comandos ---

function executeCommand(commandType, value) {
    if (isMoving) return; // Evitar comandos mientras se mueve
    isMoving = true;

    let success = true;
    if (commandType === 'move') {
        success = moveForward(value);
    } else if (commandType === 'turn') {
        if (value === 'right') turnRight();
        else if (value === 'left') turnLeft();
    }

    // Pequeño retraso para que la animación se vea
    setTimeout(() => {
        if (success) {
            checkFinalPosition();
        }
        isMoving = false;
    }, 100); // Retraso para la animación
}

function checkFinalPosition() {
    const finalCellType = labyrinth[robotY][robotX];
    let exitMessage = '';
    let isCorrectExit = false;

    if (finalCellType === EXIT_SALIDA) {
        exitMessage = 'El autómata ha llegado a la salida "SALIDA".';
    } else if (finalCellType === EXIT_BIEN) {
        exitMessage = 'El autómata ha llegado a la salida "BIEN".';
    } else if (finalCellType === EXIT_LOOP) {
        exitMessage = '¡El autómata ha llegado a la salida "LOOP"! Esta es la clave.';
        isCorrectExit = true;
    } else if (finalCellType === PATH) {
        // No ha llegado a una salida, solo está en un camino
        exitMessage = '';
    } else {
        exitMessage = 'El autómata ha terminado en un lugar inesperado.';
    }
    resultMessageElement.textContent = exitMessage;

    if (isCorrectExit) {
        labyrinthForm.classList.remove('hidden');
        labyrinthKeyInput.value = 'LOOP';
        labyrinthKeyInput.setAttribute('readonly', 'true'); // Hacer el input de solo lectura
    } else {
        labyrinthForm.classList.add('hidden');
        labyrinthKeyInput.value = '';
    }
}


// --- Verificación de la Clave Final ---

function checkLabyrinthKey(event) {
    event.preventDefault();
    const keyInput = document.getElementById('labyrinth-key-input');
    const key = keyInput.value;

    if (key.toUpperCase() === 'LOOP') {
        alert('¡Has descifrado el recorrido! La puerta se abre.');
        window.location.href = 'depura-sistema.html';
    } else {
        alert('Clave incorrecta. El autómata sigue atrapado. Revisa el algoritmo.');
    }
}

// --- INICIALIZACIÓN DEL PUZZLE ---
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el nombre del jugador (función de script.js)
    if(typeof loadPlayerName === 'function') {
        loadPlayerName();
    }

    // Obtener referencias DOM
    labyrinthGridElement = document.getElementById('labyrinth-grid');
    robotElement = document.getElementById('robot');
    simulateButton = document.getElementById('simulate-button'); // Ya no se usa, pero por si acaso
    resetButton = document.getElementById('reset-button');
    resultMessageElement = document.getElementById('result-message');
    labyrinthForm = document.getElementById('labyrinth-form');
    labyrinthKeyInput = document.getElementById('labyrinth-key-input');
    commandButtons = document.querySelectorAll('.command-button');

    // Dibujar laberinto y resetear robot
    drawLabyrinth();
    resetGame();

    // Asignar eventos
    if (resetButton) resetButton.addEventListener('click', resetGame);
    if (labyrinthForm) labyrinthForm.addEventListener('submit', checkLabyrinthKey);
    
    commandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            const value = button.dataset.value;
            executeCommand(command, parseInt(value) || value); // Convertir a int si es número
        });
    });
});
