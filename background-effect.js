document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(37, 99, 235, ${Math.random() * 0.3})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 150; // Increased number of particles for better coverage
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Handle scroll to keep particles fixed
    window.addEventListener('scroll', function() {
        // This ensures the canvas stays fixed during scroll
        canvas.style.transform = `translateY(${window.scrollY}px)`;
    });
    
    // Animation loop
    function animate() {
        // Clear canvas with a slight fade effect
        ctx.fillStyle = 'rgba(249, 250, 251, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update canvas size if window was resized
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            resizeCanvas();
        }
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(37, 99, 235, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});
