// Initialize particles and animations when the page loads
document.addEventListener("DOMContentLoaded", function () {
    createParticles();
    setupScrollAnimations();
});

// Create floating particles in the background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    // Using simple heart and star emojis for particles
    const particleEmojis = ['⭐', '💖', '✨', '🎈', '❤️', '💫'];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        particle.style.fontSize = (Math.random() * 10 + 14) + 'px';
        
        // Random animation duration and delay for a natural look
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Function to smoothly scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Set up Intersection Observer for "fade-up" animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.05, 
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.photo-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    const messageCard = document.querySelector('.message-card');
    if (messageCard) {
        const messageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMessageText();
                    messageObserver.unobserve(messageCard);
                }
            });
        }, { threshold: 0.4 });
        
        messageObserver.observe(messageCard);
    }
}

// Animate text elements within the message card sequentially
function animateMessageText() {
    const messageTexts = document.querySelectorAll('.message-text, .message-signature');
    messageTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 1000);
    });
}

// Like Button functionality
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.innerHTML = '❤️';
        createFloatingHeart(button);
    } else {
        heartIcon.innerHTML = '♡';
    }
}

// Visual feedback: a heart animation on click
function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart-animation';
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);

    const rect = button.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = (rect.top + rect.height / 2) + 'px';

    heart.animate(
        [
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: 'translate(-50%, -100px) scale(1.5)', opacity: 0 }
        ],
        {
            duration: 1500,
            easing: 'ease-out'
        }
    ).onfinish = () => {
        document.body.removeChild(heart);
    };
}