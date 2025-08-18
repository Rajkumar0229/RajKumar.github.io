// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    document.body.appendChild(menuBtn);
    
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle sidebar when menu button is clicked
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuBtn.innerHTML = sidebar.classList.contains('active') ? '×' : '☰';
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = sidebar.contains(event.target) || menuBtn.contains(event.target);
        if (!isClickInside && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuBtn.innerHTML = '☰';
        }
    });
    
    // Close sidebar when a link is clicked (for mobile)
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
