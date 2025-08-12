// Nuke Nation - Breaking Gaming Style Platform

class NukeNation {
    constructor() {
        this.init();
        this.setupBreakingFeatures();
        this.setupCarousel();
        this.setupTabs();
        this.setupEditor();
        this.setupAchievements();
        this.setupBackgroundAnimation();
        this.setupLoginModal();
    }

    init() {
        // Initialize state
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.editorMode = false;
        this.backgroundAnimation = null;
        
        // DOM Elements
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselSlides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        this.tickerText = document.querySelector('.ticker-text');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.editorSection = document.querySelector('#editor');
        this.colorPickers = document.querySelectorAll('.color-picker');
        
        console.log('🚀 Nuke Nation Breaking Gaming Platform Initialized!');
    }

    setupBreakingFeatures() {
        // Auto-slide carousel
        this.startAutoSlide();
        
        // Enhanced ticker animation
        this.setupTickerAnimation();
        
        // Interactive elements
        this.setupInteractiveElements();
        
        // Scroll effects
        this.setupScrollEffects();
    }

    setupCarousel() {
        if (!this.carouselTrack) return;

        // Manual controls
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch/swipe support
        this.setupTouchControls();
    }

    setupTouchControls() {
        let startX = 0;
        let endX = 0;

        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                this.nextSlide();
            } else if (endX - startX > 50) {
                this.previousSlide();
            }
        });
    }

    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.carouselTrack) return;

        this.carouselTrack.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    setupTickerAnimation() {
        // Enhanced ticker with dynamic content
        const tickerContent = [
            "¡Nuevo torneo de CS2 este fin de semana!",
            "Actualización de servidores disponible",
            "Nuevos rangos Premium ahora disponibles",
            "Sorteo de skins exclusivos en Discord",
            "¡Únete a nuestro WhatsApp para torneos!",
            "Nueva temporada de facciones en Minecraft",
            "Top 15 ranking actualizado - ¡Mira tu posición!"
        ];

        let tickerIndex = 0;
        
        setInterval(() => {
            tickerIndex = (tickerIndex + 1) % tickerContent.length;
            this.updateTicker(tickerContent[tickerIndex]);
        }, 8000);
    }

    updateTicker(text) {
        if (!this.tickerText) return;
        
        // Fade out current text
        this.tickerText.style.opacity = '0';
        
        setTimeout(() => {
            this.tickerText.textContent = text;
            this.tickerText.style.opacity = '1';
        }, 300);
    }

    setupTabs() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        // Update buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Update content
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tab === tab);
        });

        // Simulate loading data
        this.loadRankingData(tab);
    }

    loadRankingData(tab) {
        console.log(`Loading ranking data for: ${tab}`);
        
        // Simulate API call
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        
        const activeTab = document.querySelector(`.tab-content[data-tab="${tab}"]`);
        if (activeTab) {
            activeTab.style.opacity = '0.5';
            setTimeout(() => {
                activeTab.style.opacity = '1';
            }, 500);
        }
    }

    setupEditor() {
        // Color picker functionality
        this.colorPickers.forEach(picker => {
            picker.addEventListener('change', (e) => {
                const property = e.target.dataset.property;
                const value = e.target.value;
                this.updateColor(property, value);
            });
        });

        // Background selector
        const bgSelector = document.querySelector('.bg-selector');
        if (bgSelector) {
            bgSelector.addEventListener('change', (e) => {
                this.changeBackgroundAnimation(e.target.value);
            });
        }

        // Editor toggle
        const adminBtn = document.querySelector('.admin-btn');
        if (adminBtn) {
            adminBtn.addEventListener('click', () => {
                this.toggleEditor();
            });
        }

        // Save and reset buttons
        const saveBtn = document.querySelector('.save-btn');
        const resetBtn = document.querySelector('.reset-btn');
        
        saveBtn?.addEventListener('click', () => this.saveEditorSettings());
        resetBtn?.addEventListener('click', () => this.resetEditorSettings());
    }

    updateColor(property, value) {
        document.documentElement.style.setProperty(property, value);
        
        // Update preview in logo
        if (property === '--primary-color') {
            document.querySelector('.logo-preview i').style.color = value;
        }
    }

    changeBackgroundAnimation(type) {
        const canvas = document.getElementById('bg-animation');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Clear previous animation
        if (this.backgroundAnimation) {
            cancelAnimationFrame(this.backgroundAnimation);
        }

        let particles = [];
        const particleCount = 50;

        // Create particles based on type
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                type: type,
                rotation: Math.random() * Math.PI * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += 0.01;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = particle.opacity;

                // Draw based on type
                switch (particle.type) {
                    case 'cs':
                        ctx.fillStyle = 'var(--primary-color)';
                        ctx.font = `${particle.size * 5}px FontAwesome`;
                        ctx.fillText('', 0, 0);
                        break;
                    case 'minecraft':
                        ctx.fillStyle = 'var(--success-color)';
                        ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
                        break;
                    default:
                        ctx.fillStyle = 'var(--secondary-color)';
                        ctx.beginPath();
                        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                        ctx.fill();
                }

                ctx.restore();
            });

            this.backgroundAnimation = requestAnimationFrame(animate);
        };

        animate();
    }

    toggleEditor() {
        this.editorMode = !this.editorMode;
        this.editorSection.style.display = this.editorMode ? 'block' : 'none';
        
        if (this.editorMode) {
            this.editorSection.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Modo Editor activado', 'success');
        } else {
            this.showNotification('Modo Editor desactivado', 'info');
        }
    }

    saveEditorSettings() {
        const settings = {
            primaryColor: document.querySelector('[data-property="--primary-color"]').value,
            secondaryColor: document.querySelector('[data-property="--secondary-color"]').value,
            backgroundType: document.querySelector('.bg-selector').value,
            logoText: document.querySelector('.logo-preview span').textContent
        };

        localStorage.setItem('nukeNationSettings', JSON.stringify(settings));
        this.showNotification('Configuración guardada', 'success');
    }

    resetEditorSettings() {
        const defaultSettings = {
            primaryColor: '#ff6b35',
            secondaryColor: '#00d4ff',
            backgroundType: 'generic',
            logoText: 'NUKE NATION'
        };

        // Reset color pickers
        document.querySelector('[data-property="--primary-color"]').value = defaultSettings.primaryColor;
        document.querySelector('[data-property="--secondary-color"]').value = defaultSettings.secondaryColor;
        document.querySelector('.bg-selector').value = defaultSettings.backgroundType;
        document.querySelector('.logo-preview span').textContent = defaultSettings.logoText;

        // Reset CSS variables
        Object.entries(defaultSettings).forEach(([key, value]) => {
            if (key.includes('Color')) {
                document.documentElement.style.setProperty(`--${key.replace('Color', '-color')}`, value);
            }
        });

        localStorage.removeItem('nukeNationSettings');
        this.showNotification('Configuración reseteada', 'info');
    }

    setupAchievements() {
        // Simulate unlocking achievements
        this.checkAchievements();
        
        // Add hover effects
        document.querySelectorAll('.achievement-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('locked')) {
                    card.style.transform = 'scale(1.05)';
                    card.style.filter = 'grayscale(0.5)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('locked')) {
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'grayscale(1)';
                }
            });
        });
    }

    checkAchievements() {
        // Simulate achievement checking
        const achievements = [
            { id: 'firstTournament', condition: () => true, unlock: true },
            { id: '100Hours', condition: () => true, unlock: true },
            { id: 'top10', condition: () => true, unlock: true },
            { id: 'killStreak', condition: () => false, unlock: false }
        ];

        achievements.forEach(achievement => {
            this.updateAchievementStatus(achievement.id, achievement.unlock);
        });
    }

    updateAchievementStatus(id, unlocked) {
        const achievement = document.querySelector(`[data-achievement="${id}"]`);
        if (achievement) {
            achievement.classList.toggle('unlocked', unlocked);
            achievement.classList.toggle('locked', !unlocked);
        }
    }

    setupBackgroundAnimation() {
        // Initialize background animation
        this.changeBackgroundAnimation('cs');
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    resizeCanvas() {
        const canvas = document.getElementById('bg-animation');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    setupInteractiveElements() {
        // Enhanced server connections
        document.querySelectorAll('.server-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serverName = e.target.closest('.server-card').querySelector('h3').textContent;
                this.connectToServer(serverName);
            });
        });

        // Rank store interactions
        document.querySelectorAll('.rank-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rank = e.target.closest('.rank-card').querySelector('h3').textContent;
                this.purchaseRank(rank);
            });
        });

        // Social media interactions
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = e.target.closest('.social-link').title;
                this.openSocialMedia(platform);
            });
        });

        // Login button interaction
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }
    }
    
    setupLoginModal() {
        const modal = document.getElementById('login-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking on overlay
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Setup login options
        const discordBtn = modal.querySelector('.login-option.discord');
        const steamBtn = modal.querySelector('.login-option.steam');
        
        discordBtn.addEventListener('click', () => {
            this.showNotification('Iniciando sesión con Discord...', 'info');
            setTimeout(() => {
                modal.style.display = 'none';
                this.showNotification('Inicio de sesión con Discord exitoso', 'success');
            }, 1500);
        });
        
        steamBtn.addEventListener('click', () => {
            this.showNotification('Iniciando sesión con Steam...', 'info');
            setTimeout(() => {
                modal.style.display = 'none';
                this.showNotification('Inicio de sesión con Steam exitoso', 'success');
            }, 1500);
        });
    }
    
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        modal.style.display = 'flex';
    }

    connectToServer(serverName) {
        this.showNotification(`Conectando a ${serverName}...`, 'info');
        
        setTimeout(() => {
            this.showNotification(`¡Conectado exitosamente a ${serverName}!`, 'success');
        }, 2000);
    }

    purchaseRank(rank) {
        this.showModal(`
            <div class="purchase-modal">
                <h3>Comprar ${rank}</h3>
                <p>Selecciona tu método de pago:</p>
                <div class="payment-methods">
                    <button class="payment-btn" data-method="stripe">Stripe</button>
                    <button class="payment-btn" data-method="paypal">PayPal</button>
                    <button class="payment-btn" data-method="crypto">Crypto</button>
                </div>
            </div>
        `);
    }

    openSocialMedia(platform) {
        const urls = {
            'Facebook': 'https://facebook.com/nukenation',
            'Instagram': 'https://instagram.com/nukenation',
            'YouTube': 'https://youtube.com/nukenation',
            'TikTok': 'https://tiktok.com/@nukenation',
            'WhatsApp': 'https://wa.me/+1234567890',
            'Twitch': 'https://twitch.tv/nukenation'
        };

        const url = urls[platform];
        if (url) {
            window.open(url, '_blank');
            this.showNotification(`Abriendo ${platform}...`, 'info');
        }
    }

    setupScrollEffects() {
        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const parallaxElements = document.querySelectorAll('.float-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.server-card, .achievement-card, .rank-card').forEach(el => {
            observer.observe(el);
        });
    }

    showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'breaking-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content breaking-style">
                <button class="modal-close">&times;</button>
                ${content}
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .breaking-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            .modal-content.breaking-style {
                background: var(--gradient-card);
                border: 1px solid var(--primary-color);
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                position: relative;
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--text-light);
                cursor: pointer;
            }
            .purchase-modal h3 {
                font-family: var(--font-primary);
                color: var(--text-light);
                margin-bottom: 20px;
                text-align: center;
            }
            .payment-methods {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .payment-btn {
                background: var(--gradient-primary);
                color: var(--bg-dark);
                border: none;
                padding: 15px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition-smooth);
            }
            .payment-btn:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);

        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });

        // Payment button handlers
        modal.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const method = e.target.dataset.method;
                this.processPayment(method);
                modal.remove();
            });
        });
    }

    processPayment(method) {
        this.showNotification(`Procesando pago con ${method}...`, 'info');
        
        setTimeout(() => {
            this.showNotification('¡Pago procesado exitosamente!', 'success');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `breaking-notification ${type}`;
        notification.textContent = message;

        // Styles
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Load saved settings
    loadSettings() {
        const saved = localStorage.getItem('nukeNationSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            
            // Apply colors
            Object.entries(settings).forEach(([key, value]) => {
                if (key.includes('Color')) {
                    document.documentElement.style.setProperty(`--${key.replace('Color', '-color')}`, value);
                    const picker = document.querySelector(`[data-property="--${key.replace('Color', '-color')}"]`);
                    if (picker) picker.value = value;
                } else if (key === 'logoText') {
                    document.querySelector('.logo-preview span').textContent = value;
                } else if (key === 'backgroundType') {
                    document.querySelector('.bg-selector').value = value;
                    this.changeBackgroundAnimation(value);
                }
            });
        }
    }

    // Real-time updates simulation
    setupRealTimeUpdates() {
        setInterval(() => {
            this.updateServerStats();
            this.updateUserStats();
        }, 30000);

        setInterval(() => {
            this.updateTickerContent();
        }, 15000);
    }

    updateServerStats() {
        const serverCards = document.querySelectorAll('.server-card');
        serverCards.forEach(card => {
            const playerCount = card.querySelector('.detail-item:nth-child(2) span');
            const adminCount = card.querySelector('.detail-item:nth-child(3) span');
            
            if (playerCount) {
                const [current, max] = playerCount.textContent.match(/(\d+)\/(\d+)/).slice(1, 3);
                const newCurrent = Math.max(0, Math.min(parseInt(max), parseInt(current) + Math.floor(Math.random() * 5) - 2));
                playerCount.textContent = `Jugadores: ${newCurrent}/${max}`;
            }
            
            if (adminCount) {
                const current = parseInt(adminCount.textContent.match(/(\d+) Online/)[1]);
                const newCurrent = Math.max(0, Math.min(10, current + Math.floor(Math.random() * 3) - 1));
                adminCount.textContent = `Admins: ${newCurrent} Online`;
            }
        });
    }

    updateUserStats() {
        const userStats = document.querySelectorAll('.stat-item span');
        userStats.forEach(stat => {
            if (stat.textContent.includes('horas jugadas')) {
                const hours = parseInt(stat.textContent);
                stat.textContent = `${hours + 1} horas jugadas`;
            } else if (stat.textContent.includes('puntos')) {
                const points = parseInt(stat.textContent);
                stat.textContent = `${points + Math.floor(Math.random() * 10)} puntos`;
            }
        });
    }

    updateTickerContent() {
        const tickerTexts = [
            "¡Actualización de servidores disponible!",
            "Nuevos logros desbloqueados",
            "Torneo especial este fin de semana",
            "¡Descuentos en la tienda!",
            "Nuevos jugadores se unen cada día",
            "Mantente actualizado con nuestras redes"
        ];
        
        const randomText = tickerTexts[Math.floor(Math.random() * tickerTexts.length)];
        this.updateTicker(randomText);
    }
}

// Enhanced CSS for Breaking Gaming features
const breakingStyles = document.createElement('style');
breakingStyles.textContent = `
    /* Breaking Gaming Enhanced Styles */
    .breaking-notification {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }
    
    .breaking-notification.success {
        background: linear-gradient(135deg, #4caf50, #45a049);
    }
    
    .breaking-notification.error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
    }
    
    .breaking-notification.warning {
        background: linear-gradient(135deg, #ff9800, #f57c00);
    }
    
    .breaking-notification.info {
        background: linear-gradient(135deg, #2196f3, #1976d2);
    }
    
    /* Enhanced loading states */
    .loading {
        text-align: center;
        padding: 20px;
        color: var(--primary-color);
    }
    
    /* Smooth transitions */
    * {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    /* Enhanced hover effects */
    .server-card:hover .server-image img {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .achievement-card.unlocked:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
    }
    
    /* Scroll indicator */
    .scroll-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--bg-dark);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .scroll-indicator.show {
        opacity: 1;
    }
    
    /* Enhanced responsive */
    @media (max-width: 768px) {
        .breaking-nav {
            padding: 10px 0;
        }
        
        .main-menu {
            gap: 2px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .main-menu li a {
            padding: 8px 12px;
            font-size: 0.9rem;
            min-width: 65px;
        }
        
        .carousel-content {
            padding: 15px;
            margin: 0 10px;
        }
        
        .carousel-content h3 {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(breakingStyles);
// script.js

// Crear el cliente de Supabase
const supabase = Supabase.createClient(
  'https://<https://fsmpgzystzedgwrinukb.supabase.co>.supabase.co',  // Reemplaza con tu URL de Supabase
  '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbXBnenlzdHplZGd3cmludWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTk2ODksImV4cCI6MjA3MDQ5NTY4OX0.6bXgSLXvqKRt7T5yt-togXQQX4fbW-zk0z-4PRHt2yg>'  // Reemplaza con tu clave de API
);

// Ejemplo de consulta a la base de datos
async function getNews() {
  const { data, error } = await supabase
    .from('news')  // Nombre de tu tabla de noticias
    .select('*');   // Seleccionar todas las columnas de la tabla 'news'

  if (error) {
    console.error('Error al obtener noticias:', error);
  } else {
    console.log('Noticias obtenidas:', data);
  }
}

// Llamar a la función para probar la conexión
getNews();


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new NukeNationBreaking();
    
    // Load saved settings
    app.loadSettings();
    
    // Start real-time updates
    app.setupRealTimeUpdates();
    
    // Global access for debugging
    window.NukeNationBreaking = app;
    
    console.log('🎮 Nuke Nation Platform Ready!');
});
