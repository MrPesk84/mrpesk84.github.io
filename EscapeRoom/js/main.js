// --- LÓGICA DE LAS PUERTAS ---

// Puerta 1: Guardar el nombre y redirigir al puzzle de frases
function handleDoor1(event) {
    event.preventDefault();
    const input = document.getElementById('password-input').value;

    if (input.trim() === '') {
        alert('El nombre no puede estar vacío.');
        return;
    }

    // Guardar el nombre del jugador en el almacenamiento local del navegador
    localStorage.setItem('escapeRoomPlayerName', input);

    // Redirigir al nuevo puzzle
    window.location.href = 'puzzle-frases.html';
}

// --- LÓGICA DEL PUZZLE DE FRASES ---

function initializeSentencePuzzle() {
    const list = document.getElementById('sentence-list');
    if (!list) return;

    let draggedItem = null;

    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    });

    list.addEventListener('dragend', (e) => {
        setTimeout(() => {
            e.target.classList.remove('dragging');
            draggedItem = null;
        }, 0);
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        const currentElement = document.querySelector('.dragging');
        if (afterElement == null) {
            list.appendChild(currentElement);
        } else {
            list.insertBefore(currentElement, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}

function checkSentenceOrder(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('password-input').value;

    if (passwordInput.toUpperCase() !== 'PROGRAMADOR') {
        alert('Palabra de poder incorrecta.');
        return;
    }

    const correctOrder = [
        "Preparas el cepillo y el vaso.",
        "Remojas el cepillo con agua.",
        "Obtienes la pasta y destapas el tubo.",
        "Giras el tubo y pones una pequeña cantidad en el cepillo.",
        "Recoges el cepillo y lo llevas a la boca.",
        "Acomodas el cepillo sobre los dientes.",
        "Mueves el cepillo por todas las superficies durante 2 minutos.",
        "Aclara con agua la boca.",
        "Dejas el cepillo enjuagado y escurrido.",
        "Ordenas el baño: tapas la pasta.",
        "Revisas que todo quede limpio."
    ];

    const listItems = document.querySelectorAll('#sentence-list li');
    let isCorrect = true;

    listItems.forEach((item, index) => {
        const itemText = item.innerText.substring(1).trim();
        const correctText = correctOrder[index].substring(1).trim();

        if (itemText !== correctText) {
            isCorrect = false;
            item.classList.add('incorrect');
        } else {
            item.classList.remove('incorrect');
        }
    });

    if (isCorrect) {
        alert('¡Ritual completado! Has descifrado el siguiente protocolo.');
        window.location.href = 'guardian-logico.html'; // Redirect to the next puzzle
    } else {
        alert('El orden del ritual es incorrecto. Las frases mal posicionadas se han marcado en rojo.');
    }
}

// --- LÓGICA DEL PUZZLE DE CÓDIGO ---

function checkCodePuzzle(event) {
    event.preventDefault();
    const keyInput = document.getElementById('password-input').value;

    if (keyInput.trim() === '30') {
        alert('¡Sistema depurado! Clave correcta.');
        window.location.href = 'pergamino-final.html';
    } else {
        alert('Clave incorrecta. Revisa tus cálculos, el sistema sigue fallando.');
    }
}


// --- LÓGICA DE LA PANTALLA FINAL ---

// Cargar el nombre del jugador y mostrarlo
function loadPlayerName() {
    const playerName = localStorage.getItem('escapeRoomPlayerName');
    const displayElement = document.getElementById('player-name-display');

    if (displayElement) {
        if (playerName) {
            displayElement.textContent = `Aventurero: ${playerName}`;
        } else {
            displayElement.textContent = 'Aventurero: [ANÓNIMO]';
        }
    }
}

// Generar el PDF
function generateCertificate() {
    const playerName = localStorage.getItem('escapeRoomPlayerName') || 'Aventurero Anónimo';
    const { jsPDF } = window.jspdf;

    const backgroundImage = new Image();
    // Añadimos esto para evitar problemas de CORS en algunos navegadores al usar canvas
    backgroundImage.crossOrigin = "Anonymous";
    backgroundImage.src = 'img/fondo-diploma.png';

    backgroundImage.onload = () => {
        // --- Inicio del método Canvas ---
        const canvas = document.createElement('canvas');
        canvas.width = backgroundImage.naturalWidth;
        canvas.height = backgroundImage.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(backgroundImage, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        // --- Fin del método Canvas ---

        const doc = new jsPDF();

        // Añadir la imagen desde la URL de datos (Base64)
        doc.addImage(dataUrl, 'PNG', 0, 0, 210, 297);

        doc.saveGraphicsState();
        doc.setGState(new doc.GState({opacity: 0.75}));
        doc.setFillColor(255, 255, 255);
        doc.rect(15, 50, 180, 180, 'F');
        doc.restoreGraphicsState();

        doc.setTextColor(0, 0, 0);
        doc.setFont('times', 'italic');
        doc.setFontSize(26);
        doc.text("Pergamino de los Héroes", 105, 70, null, null, "center");
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        doc.text("Que conste en los anales de la historia que el valiente aventurero:", 105, 90, null, null, "center");
        doc.setFontSize(22);
        doc.setFont("times", "bold");
        doc.text(playerName, 105, 110, null, null, "center");
        doc.setFontSize(14);
        doc.setFont("times", "normal");
        doc.text("ha superado con ingenio y coraje todos los desafíos", 105, 130, null, null, "center");
        doc.text("del legendario Castillo de las Sombras.", 105, 140, null, null, "center");

        doc.setFontSize(16);
        doc.setFont('times', 'italic');
        doc.text("¡Que su nombre sea recordado por siempre!", 105, 170, null, null, "center");
        doc.setFontSize(14);
        doc.setFont("times", "bold");
        doc.text("¿Estás listo para empezar la aventura tecnológica?", 105, 200, null, null, "center");
        doc.save(`Pergamino_${playerName.replace(/\s/g, '_')}.pdf`);
    };

    backgroundImage.onerror = () => {
        alert("Error crítico: No se pudo cargar la imagen de fondo para el diploma. Asegúrate de que el archivo 'fondo-diploma.png' está en la carpeta 'img' y que el servidor local está funcionando.");
    };
}


// --- INICIALIZACIÓN ---
// (Quitamos el listener genérico para usar los que están en cada HTML)
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerName();
});
