document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#menu-list a');
    const homeContent = document.getElementById('home-content');
    const contentSections = document.querySelectorAll('.content-section');

    // Función para mostrar el contenido
    function showContent(contentId) {
        // Ocultar contenido inicial
        homeContent.style.display = 'none';

        // Ocultar todas las secciones de contenido
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección de contenido correcta
        const targetSection = document.getElementById(contentId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Añadir listeners a los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Quitar la clase 'active' de todos los enlaces
            menuLinks.forEach(link => link.classList.remove('active'));
            
            // Añadir la clase 'active' al enlace clickado
            this.classList.add('active');

            const contentId = this.getAttribute('data-content');
            showContent(contentId);
        });
    });
});