document.addEventListener('DOMContentLoaded', function() {
  // --- LÓGICA PARA EL CAMBIO DE TAMAÑO DE FUENTE ---

  const increaseButton = document.getElementById('font-increase');
  const decreaseButton = document.getElementById('font-decrease');
  const resetButton = document.getElementById('font-reset');
  const htmlElement = document.documentElement; // Seleccionamos el tag <html>

  increaseButton.addEventListener('click', function() {
    changeFontSize(1); // Aumenta en 1px la base
  });

  decreaseButton.addEventListener('click', function() {
    changeFontSize(-1); // Disminuye en 1px la base
  });

  resetButton.addEventListener('click', function() {
    htmlElement.style.fontSize = ''; // Resetea al valor por defecto del CSS
  });

  function changeFontSize(amount) {
    let currentSize = parseFloat(getComputedStyle(htmlElement).fontSize);
    let newSize = currentSize + amount;
    // Ponemos límites para no hacer la fuente demasiado grande o pequeña
    if (newSize >= 12 && newSize <= 24) {
      htmlElement.style.fontSize = newSize + 'px';
    }
  }

  // --- LÓGICA PARA EL SELECTOR DE UNIDADES DE PROGRAMACIÓN (UP) ---

  const upSelector = document.getElementById('up-selector');

  upSelector.addEventListener('change', function() {
    const selectedUP = upSelector.value;
    if (selectedUP) {
      // Si se ha seleccionado una opción válida, navegar a esa página
      window.location.href = selectedUP;
    }
  });

});
