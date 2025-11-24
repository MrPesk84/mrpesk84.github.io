document.addEventListener('DOMContentLoaded', function() {
  // --- LÓGICA PARA EL CAMBIO DE TAMAÑO DE FUENTE ---

  const increaseButton = document.getElementById('font-increase');
  const decreaseButton = document.getElementById('font-decrease');
  const resetButton = document.getElementById('font-reset');
  const htmlElement = document.documentElement; // Seleccionamos el tag <html>

  if(increaseButton){
    increaseButton.addEventListener('click', function() {
      changeFontSize(1); // Aumenta en 1px la base
    });
  }

  if(decreaseButton){
    decreaseButton.addEventListener('click', function() {
      changeFontSize(-1); // Disminuye en 1px la base
    });
  }

  if(resetButton){
    resetButton.addEventListener('click', function() {
      htmlElement.style.fontSize = ''; // Resetea al valor por defecto del CSS
    });
  }

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

  if(upSelector){
    upSelector.addEventListener('change', function() {
      const selectedUP = upSelector.value;
      if (selectedUP) {
        // Si se ha seleccionado una opción válida, navegar a esa página
        window.location.href = selectedUP;
      }
    });
  }

  // --- LÓGICA PARA EL ACORDEÓN ---
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems.length > 0) {
      accordionItems.forEach(item => {
          const header = item.querySelector('.accordion-header');
          const content = item.querySelector('.accordion-content');

          header.addEventListener('click', () => {
              const isActive = item.classList.contains('active');

              // Cierra todos los demás items
              accordionItems.forEach(otherItem => {
                  if (otherItem.classList.contains('active')) {
                      otherItem.classList.remove('active');
                      otherItem.querySelector('.accordion-content').style.maxHeight = null;
                  }
              });

              // Si el item actual no estaba activo, ábrelo
              if (!isActive) {
                  item.classList.add('active');
                  content.style.maxHeight = content.scrollHeight + "px";
              }
          });
      });
  }

});