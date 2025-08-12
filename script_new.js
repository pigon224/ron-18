// ===== SIMPLE BIRTHDAY WEBSITE - PHOTO FOCUSED =====

// Configuration - Add your photo and video filenames here
const PHOTOS = [
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg',
    'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg',
    'photo9.jpg', 'photo10.jpg', 'photo11.jpg', 'photo12.jpg'
];

const VIDEOS = [
    'video1.mp4', 'video2.mp4', 'video3.mp4'
];

// Global variables
let currentPhotoIndex = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPhotos();
    loadVideos();
    console.log('🎉 אתר יום הולדת נטען בהצלחה!');
});

// Load photos into the gallery
function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;
    
    photoGrid.innerHTML = '';
    
    PHOTOS.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.innerHTML = `
            <img src="media/photos/${photo}" 
                 alt="תמונה ${index + 1}" 
                 onerror="this.parentElement.style.display='none'"
                 loading="lazy">
        `;
        
        // Add click event to open lightbox
        photoDiv.addEventListener('click', () => openLightbox(index));
        photoGrid.appendChild(photoDiv);
    });
    
    // Show message if no photos found
    if (photoGrid.children.length === 0) {
        photoGrid.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: #666; grid-column: 1/-1;">
                <h3>🖼️ אין תמונות עדיין</h3>
                <p>הוסף תמונות לתיקיית media/photos ועדכן את הרשימה ב-script.js</p>
            </div>
        `;
    }
}

// Load videos into the video section
function loadVideos() {
    const videoContainer = document.getElementById('videoContainer');
    if (!videoContainer) return;
    
    videoContainer.innerHTML = '';
    
    VIDEOS.forEach((video, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'video-item';
        videoDiv.innerHTML = `
            <video controls>
                <source src="media/videos/${video}" type="video/mp4">
                הדפדפן שלך לא תומך בסרטונים
            </video>
            <h4>סרטון ${index + 1}</h4>
        `;
        videoContainer.appendChild(videoDiv);
    });
    
    // Show message if no videos found
    if (videoContainer.children.length === 0) {
        videoContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: #666;">
                <h3>🎬 אין סרטונים עדיין</h3>
                <p>הוסף סרטונים לתיקיית media/videos ועדכן את הרשימה ב-script.js</p>
            </div>
        `;
    }
}

// Open lightbox to view image in full size
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = `media/photos/${PHOTOS[index]}`;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeydown);
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    document.removeEventListener('keydown', handleKeydown);
}

// Navigate to previous image
function previousImage() {
    currentPhotoIndex = (currentPhotoIndex - 1 + PHOTOS.length) % PHOTOS.length;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentPhotoIndex = (currentPhotoIndex + 1) % PHOTOS.length;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    if (!lightboxImage) return;
    
    lightboxImage.src = `media/photos/${PHOTOS[currentPhotoIndex]}`;
}

// Handle keyboard navigation
function handleKeydown(event) {
    switch(event.key) {
        case 'ArrowLeft':
            previousImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
}

// ===== CELEBRATION FUNCTIONS =====

// Original celebration function - creates confetti and shows message
function celebrate() {
    console.log('🎉 התחלת חגיגה!');
    
    // Create confetti effect
    createConfetti();
    
    // Show celebration message
    setTimeout(() => {
        alert('🎉 יום הולדת שמח! מזל טוב על הגעה לגיל 18! 🎂');
    }, 500);
    
    // Add floating elements
    createFloatingElements();
}

// Reveal photos with animation
function revealPhotos() {
    console.log('📸 חושף תמונות!');
    
    const photoSection = document.querySelector('.main-gallery');
    const photoGrid = document.getElementById('photoGrid');
    
    if (!photoSection || !photoGrid) {
        alert('📸 לא נמצאה גלריית תמונות!');
        return;
    }
    
    // Scroll to photos section
    photoSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add special reveal animation
    photoGrid.style.transform = 'scale(0.8)';
    photoGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        photoGrid.style.transition = 'all 1s ease';
        photoGrid.style.transform = 'scale(1)';
        photoGrid.style.opacity = '1';
        
        // Add sparkle effect to photos
        createSparkleEffect(photoGrid);
    }, 500);
    
    // Create mini confetti
    createMiniConfetti('#4ecdc4');
}

// Reveal videos with animation  
function revealVideos() {
    console.log('🎬 חושף סרטונים!');
    
    const videoSection = document.querySelector('.video-section');
    
    if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add glow effect
        videoSection.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5)';
        
        setTimeout(() => {
            videoSection.style.transition = 'box-shadow 1s ease';
            videoSection.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        }, 2000);
        
        // Create mini confetti
        createMiniConfetti('#667eea');
    } else {
        alert('🎬 אין סרטונים עדיין - הוסף סרטונים לתיקיית videos!');
    }
}

// Big surprise function
function bigSurprise() {
    console.log('🎁 הפתעה גדולה!');
    
    // Multiple effects combined
    createBigConfetti();
    createFireworks();
    
    // Show birthday message with style
    const surpriseMessage = document.createElement('div');
    surpriseMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #f093fb, #f5576c);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            font-size: 1.5rem;
            max-width: 80%;
        ">
            <h2 style="margin: 0; font-size: 2.5rem;">🎁 הפתעה! 🎁</h2>
            <p style="margin: 1rem 0;">יום הולדת 18 שמח!</p>
            <p style="margin: 1rem 0;">שנה מלאה באהבה, שמחה והצלחות! ✨</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: white; color: #f5576c; border: none; padding: 1rem 2rem; border-radius: 50px; cursor: pointer; font-weight: bold;">
                תודה! 💕
            </button>
        </div>
    `;
    
    document.body.appendChild(surpriseMessage);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (surpriseMessage.parentElement) {
            surpriseMessage.remove();
        }
    }, 10000);
}

// ===== VISUAL EFFECTS =====

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            
            Object.assign(confetti.style, {
                position: 'fixed',
                left: Math.random() * 100 + 'vw',
                top: '-10px',
                width: (8 + Math.random() * 6) + 'px',
                height: (8 + Math.random() * 6) + 'px',
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                pointerEvents: 'none',
                zIndex: '999',
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `confetti-fall ${2 + Math.random() * 3}s linear forwards`
            });
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentElement) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 20);
    }
}

// Create mini confetti with specific color
function createMiniConfetti(color) {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            
            Object.assign(confetti.style, {
                position: 'fixed',
                left: Math.random() * 100 + 'vw',
                top: '-10px',
                width: '6px',
                height: '6px',
                backgroundColor: color,
                pointerEvents: 'none',
                zIndex: '999',
                borderRadius: '50%',
                animation: `confetti-fall ${1 + Math.random() * 2}s linear forwards`
            });
            
            document.body.appendChild(confetti);
            setTimeout(() => {
                if (confetti.parentElement) {
                    confetti.remove();
                }
            }, 3000);
        }, i * 15);
    }
}

// Create big confetti effect
function createBigConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#f093fb', '#f5576c'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            
            Object.assign(confetti.style, {
                position: 'fixed',
                left: Math.random() * 100 + 'vw',
                top: '-10px',
                width: (10 + Math.random() * 8) + 'px',
                height: (10 + Math.random() * 8) + 'px',
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                pointerEvents: 'none',
                zIndex: '999',
                borderRadius: Math.random() > 0.3 ? '50%' : '0',
                animation: `confetti-fall ${3 + Math.random() * 4}s linear forwards`
            });
            
            document.body.appendChild(confetti);
            setTimeout(() => {
                if (confetti.parentElement) {
                    confetti.remove();
                }
            }, 7000);
        }, i * 10);
    }
}

// Create sparkle effect
function createSparkleEffect(element) {
    if (!element) return;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const rect = element.getBoundingClientRect();
            
            Object.assign(sparkle.style, {
                position: 'fixed',
                left: (rect.left + Math.random() * rect.width) + 'px',
                top: (rect.top + Math.random() * rect.height) + 'px',
                width: '4px',
                height: '4px',
                backgroundColor: '#ffd700',
                pointerEvents: 'none',
                zIndex: '998',
                borderRadius: '50%',
                animation: 'sparkle 1.5s ease-out forwards'
            });
            
            document.body.appendChild(sparkle);
            setTimeout(() => {
                if (sparkle.parentElement) {
                    sparkle.remove();
                }
            }, 1500);
        }, i * 100);
    }
}

// Create fireworks effect
function createFireworks() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = 20 + Math.random() * 60; // Random position 20-80% of screen width
            const y = 20 + Math.random() * 40; // Random position 20-60% of screen height
            
            // Create explosion
            for (let j = 0; j < 25; j++) {
                const particle = document.createElement('div');
                const angle = (j / 25) * Math.PI * 2;
                const velocity = 50 + Math.random() * 50;
                
                Object.assign(particle.style, {
                    position: 'fixed',
                    left: x + '%',
                    top: y + '%',
                    width: '4px',
                    height: '4px',
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    pointerEvents: 'none',
                    zIndex: '999',
                    borderRadius: '50%',
                    animation: `firework-particle 2s ease-out forwards`
                });
                
                // Set custom properties for animation
                particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
                
                document.body.appendChild(particle);
                setTimeout(() => {
                    if (particle.parentElement) {
                        particle.remove();
                    }
                }, 2000);
            }
        }, i * 600);
    }
}

// Create floating elements
function createFloatingElements() {
    const emojis = ['🎈', '🎉', '🎂', '🎁', '⭐', '💖', '🌟'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            
            Object.assign(element.style, {
                position: 'fixed',
                left: Math.random() * 100 + 'vw',
                top: '100vh',
                fontSize: (20 + Math.random() * 20) + 'px',
                pointerEvents: 'none',
                zIndex: '997',
                animation: `float-up ${4 + Math.random() * 3}s ease-out forwards`
            });
            
            element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            document.body.appendChild(element);
            
            setTimeout(() => {
                if (element.parentElement) {
                    element.remove();
                }
            }, 7000);
        }, i * 200);
    }
}

// ===== CSS ANIMATIONS (Added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes firework-particle {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
    }
    
    @keyframes float-up {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Debug - Check if all elements exist on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 בודק אלמנטים:');
    console.log('photoGrid:', document.getElementById('photoGrid') ? '✅' : '❌');
    console.log('videoContainer:', document.getElementById('videoContainer') ? '✅' : '❌');
    console.log('celebration buttons:', document.querySelector('.celebration-buttons') ? '✅' : '❌');
});
