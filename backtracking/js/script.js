document.addEventListener('DOMContentLoaded', function() {
    const exampleBtn = document.getElementById('exampleBtn');
    const exampleContent = document.getElementById('exampleContent');

    if (exampleBtn && exampleContent) {
        exampleBtn.addEventListener('click', function() {
            // Toggle visibility
            if (exampleContent.classList.contains('hidden')) {
                exampleContent.classList.remove('hidden');
                exampleBtn.textContent = 'Ocultar Ejemplo';
            } else {
                exampleContent.classList.add('hidden');
                exampleBtn.textContent = 'Ver un Ejemplo Clásico';
            }
        });
    }
});
