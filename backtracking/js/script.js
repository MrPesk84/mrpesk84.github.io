document.addEventListener('DOMContentLoaded', () => {
    const exampleBtn = document.getElementById('exampleBtn');
    const exampleContent = document.getElementById('exampleContent');

    if (exampleBtn) {
        exampleBtn.addEventListener('click', () => {
            if (exampleContent) {
                exampleContent.classList.toggle('hidden');
            }
        });
    }

    // --- Visualizador del Problema de las 4 Reinas ---
    const visualizer = document.getElementById('queens-visualizer');
    if (visualizer) {
        const boardContainer = document.getElementById('board-container');
        const explanationText = document.getElementById('step-explanation');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        let currentStep = 0;

        const steps = [
            { board: [], explanation: "Paso 0: El tablero está vacío. Empezamos en la fila 0." },
            { board: [[0,0]], explanation: "Paso 1: Colocamos la reina en (0,0). Pasamos a la fila 1." },
            { board: [[0,0], [1,2]], explanation: "Paso 2: Posición segura en (1,2). Pasamos a la fila 2." },
            { board: [[0,0], [1,2]], explanation: "Paso 3: No hay columna segura en la fila 2. Hay que retroceder." },
            { board: [[0,0]], explanation: "Paso 4: BACKTRACK. Quitamos la reina de la fila 1." },
            { board: [[0,0], [1,3]], explanation: "Paso 5: Siguiente posición segura en fila 1 es (1,3). Pasamos a la fila 2." },
            { board: [[0,0], [1,3], [2,1]], explanation: "Paso 6: Posición segura en (2,1). Pasamos a la fila 3."},
            { board: [[0,0], [1,3], [2,1]], explanation: "Paso 7: No hay columna segura en la fila 3. Hay que retroceder."},
            { board: [[0,0], [1,3]], explanation: "Paso 8: BACKTRACK. Quitamos la reina de la fila 2. No hay más opciones." },
            { board: [[0,0]], explanation: "Paso 9: BACKTRACK. Quitamos la reina de la fila 1. No hay más opciones." },
            { board: [], explanation: "Paso 10: BACKTRACK. Quitamos la reina de la fila 0." },
            { board: [[0,1]], explanation: "Paso 11: Siguiente posición en fila 0 es (0,1). Pasamos a la fila 1." },
            { board: [[0,1], [1,3]], explanation: "Paso 12: Posición segura en (1,3). Pasamos a la fila 2." },
            { board: [[0,1], [1,3], [2,0]], explanation: "Paso 13: Posición segura en (2,0). Pasamos a la fila 3." },
            { board: [[0,1], [1,3], [2,0], [3,2]], explanation: "Paso 14: Posición segura en (3,2). ¡SOLUCIÓN ENCONTRADA!" },
        ];

        function createBoardSVG(queens) {
            const size = 4;
            const squareSize = 50;
            let svg = `<svg viewBox="0 0 ${size * squareSize} ${size * squareSize}" xmlns="http://www.w3.org/2000/svg">`;
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    const isLight = (row + col) % 2 === 0;
                    svg += `<rect x="${col * squareSize}" y="${row * squareSize}" width="${squareSize}" height="${squareSize}" fill="${isLight ? '#FFF' : '#D2B48C'}" />`;
                }
            }
            queens.forEach(([row, col]) => {
                svg += `<text x="${col * squareSize + squareSize / 2}" y="${row * squareSize + squareSize / 2}" font-size="30" text-anchor="middle" dominant-baseline="central">♛</text>`;
            });
            svg += `</svg>`;
            return svg;
        }

        function updateView() {
            const step = steps[currentStep];
            boardContainer.innerHTML = createBoardSVG(step.board);
            explanationText.textContent = step.explanation;
            prevBtn.disabled = currentStep === 0;
            nextBtn.disabled = currentStep === steps.length - 1;
        }

        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateView();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateView();
            }
        });

        updateView();
    }

    // --- Metáfora Personalizada ---
    const personalMetaphorZone = document.getElementById('personal-metaphor-zone');
    if (personalMetaphorZone) {
        const applyBtn = document.getElementById('applyBtn');
        const userInput = document.getElementById('userInput');
        const metaphorOutput = document.getElementById('metaphorOutput');

        applyBtn.addEventListener('click', () => {
            const activity = userInput.value.trim();
            if (!activity) {
                metaphorOutput.innerHTML = "<p>Por favor, escribe una actividad para aplicar el backtracking.</p>";
                metaphorOutput.classList.remove('hidden');
                return;
            }

            const metaphorHTML = `
                <h4>Aplicando Backtracking a "${activity}":</h4>
                <p>Imagina que <strong>${activity}</strong> es un problema complejo con múltiples pasos. Así es como un algoritmo de backtracking lo abordaría:</p>
                <ol>
                    <li><strong>Punto de Partida:</strong> Tu estado inicial es el objetivo de "${activity}" por delante.</li>
                    <li><strong>Primera Decisión:</strong> Tomas una primera decisión lógica y avanzas por ese camino.</li>
                    <li><strong>Exploración:</strong> Continúas tomando decisiones, paso a paso, profundizando en el proceso. Cada paso te acerca a una posible solución.</li>
                    <li><strong>Detección de Problema:</strong> De repente, te das cuenta de que una de tus decisiones anteriores fue incorrecta y te impide terminar con éxito. Este camino se ha convertido en un callejón sin salida.</li>
                    <li><strong>El Momento Clave (Backtrack):</strong> En lugar de abandonar, ¡retrocedes! Deshaces tu última decisión y vuelves al punto anterior donde tenías otras alternativas que no exploraste.</li>
                    <li><strong>Prueba de Alternativa:</strong> Eliges un camino diferente que no habías probado antes y continúas desde ahí.</li>
                    <li><strong>Iteración hacia la Solución:</strong> Repites este ciclo de explorar, encontrar un bloqueo y retroceder hasta que todos los pasos para "${activity}" encajan perfectamente.</li>
                    <li><strong>Solución Encontrada:</strong> ¡Lo has conseguido! Has completado "${activity}" con éxito. Has navegado el "árbol de decisiones" y has "podado" las ramas que no funcionaban hasta encontrar la que te llevó al resultado final.</li>
                </ol>
            `;

            metaphorOutput.innerHTML = metaphorHTML;
            metaphorOutput.classList.remove('hidden');
        });
    }
});
