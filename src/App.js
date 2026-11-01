import React, { useState, useEffect, useRef } from 'react';
import AboutContent from './components/page-contents/AboutContent';
import ExperienceContent from './components/page-contents/ExperienceContent';
import ProjectsContent, {PROJECTS_DETAILS} from './components/page-contents/ProjectsContent';
import ContactContent from './components/page-contents/ContactContents';
import CardHand from './components/CardHand';
import generateCardData from './components/CardData'; 

// ==========================================
// 1. WEB AUDIO SYNTHESIZER
// ==========================================
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playHover() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.06);
    }

    playCardPlay() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.3);

        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(160, now);
        sub.frequency.exponentialRampToValueAtTime(30, now + 0.35);

        subGain.gain.setValueAtTime(0.25, now);
        subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        sub.connect(subGain);
        subGain.connect(this.ctx.destination);
        sub.start();
        sub.stop(now + 0.35);
    }

    playPotion() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(now + 0.2);
    }

    playToggle() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(now + 0.12);
    }
}

const sounds = new SoundEngine();

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
export default function App () {
    const [activeCardId, setActiveCardId] = useState('about');
    const [animatingCardId, setAnimatingCardId] = useState(null);
    const [isLightMode, setIsLightMode] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [activeModalProject, setActiveModalProject] = useState(null);
    const [isHandOpen, setHandOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [cardData, setCardData] = useState([{
        id: 'about',
        title: 'Justin Siu',
        type: 'About',
        condition: () => activeCardId !== 'about',
        action: () => setActiveCardId('about'),
        cost: 2,
        icon: 'fa-user-gear',
        badgeBgDark: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        badgeBgLight: 'bg-purple-100 text-purple-900 border-purple-300',
        borderDark: 'border-purple-500/60',
        borderLight: 'border-purple-600',
        glowDark: '#6366f1',
        glowLight: '#6159fa',
        bgDark: 'from-purple-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-purple-50 via-white to-slate-50',
        effect: 'Open the About page. Cannot be played if About page is open.',
        flavorText: 'Learn about the engineer behind the operation.'
    }])

    const activeGlowRef = useRef('#3b82f6');
    
    useEffect(() => {
        setCardData(
            generateCardData(
                isLightMode,
                setIsLightMode,
                soundEnabled,
                toggleSound,
                activeCardId,
                setActiveCardId
            )
        )
    }, [isLightMode, soundEnabled, activeCardId])

    useEffect(() => {
        // Check if the device has a coarse pointer (touch screen)
        const mediaQuery = window.matchMedia('(pointer: coarse)');
        
        // Set initial state
        setIsMobile(mediaQuery.matches);

        // Listen for changes (e.g., if a user plugs a mouse into a tablet)
        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [isLightMode]);

    useEffect(() => {
        const activeCard = cardData.find(c => c.id === activeCardId);
        if (activeCard) {
            activeGlowRef.current = isLightMode ? activeCard.glowLight : activeCard.glowDark;
        }
    }, [activeCardId, isLightMode]);

    const toggleSound = () => {
        sounds.enabled = !soundEnabled;
        setSoundEnabled(!soundEnabled);
        if (!soundEnabled) sounds.playHover();
    };

    const handlePlayCard = (card) => {

        sounds.playCardPlay();
        setAnimatingCardId(card.id);

        setTimeout(() => {
            card.action();
            setAnimatingCardId(null);
        }, 300);
    };

    const handleCardClick = (card) => {
        if (isHandOpen) {
            handlePlayCard(card);
        }
    };

    return (
        <div className={`h-dvh flex flex-col relative overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden`}>

            <BackgroundCanvas isLightMode={isLightMode} activeGlowRef={activeGlowRef} />

            <Header/>

            <main className="w-full max-w-6xl mx-auto px-4 pt-24 pb-48 md:pb-36 flex-1 flex flex-col items-center justify-center z-10">
                <MainStage 
                    cardData={cardData}
                    activeCardId={activeCardId} 
                    isLightMode={isLightMode} 
                    onOpenModal={(idx) => setActiveModalProject(PROJECTS_DETAILS[idx])}
                    setActiveCardId={setActiveCardId}
                />
            </main>

            {/* Universal Card Hand Dock (Always visible on mobile & desktop) */}
            <CardHand 
                sounds={sounds}
                isHandOpen={isHandOpen}
                setHandOpen={setHandOpen}
                isMobile={isMobile}
                cards={cardData.filter((card) => card.condition())}
                activeCardId={activeCardId}
                animatingCardId={animatingCardId}
                isLightMode={isLightMode}
                onCardClick={handleCardClick}
            />

            {activeModalProject && (
                <ProjectModal 
                    project={activeModalProject}  
                    onClose={() => setActiveModalProject(null)} 
                />
            )}
        </div>
    );
}

// ==========================================
// 4. HEADER COMPONENT
// ==========================================
function Header() {
    return (
        <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-20 backdrop-blur-md border-b transition-colors duration-400 fixed top-0 left-0" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
            
            {/* Name Section (Top Left) */}
            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shadow-sm">
                    <i className="fa-solid fa-code text-base sm:text-lg"></i>
                </div>
                <div>
                    <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-amber-500 hover:text-amber-400 transition-colors duration-200">Justin Siu</h1>
                    <p className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-main)' }}>Software Engineer</p>
                </div>
            </div>
        </header>
    );
}

// ==========================================
// 6. MAIN STAGE VIEW COMPONENT
// ==========================================
function MainStage({ activeCardId, isLightMode, onOpenModal, setActiveCardId, cardData}) {
    const card = cardData.find(c => c.id === activeCardId) || cardData[0];
    console.log(card)
    console.log(activeCardId)
    console.log(cardData)

    return (
        <div 
            className={`stage-container w-full rounded-2xl p-5 sm:p-8 md:p-10 border shadow-2xl transition-all duration-400 overflow-hidden ${isLightMode ? card.borderLight : card.borderDark}`}
        >
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-700/60">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                    <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">{card.type}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ color: 'var(--text-main)' }}>{card.title}</h2>
                </div>
            </div>

            {activeCardId === 'about' && <AboutContent switchToContactSection={() => setActiveCardId('contact')}/>}

            {activeCardId === 'experience' && <ExperienceContent/>}

            {activeCardId === 'projects' && <ProjectsContent onOpenModal={onOpenModal}/>}

            {activeCardId === 'contact' && <ContactContent/>}
        </div>
    );
}

// ==========================================
// 8. PROJECT MODAL COMPONENT
// ==========================================
function ProjectModal({ project, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm fade-in duration-500">
            <div className="modal-box-bg w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800/80 transition-colors"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-400/50 flex items-center justify-center text-emerald-600">
                        <i className={`fa-solid ${project.icon} text-base`}></i>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Artifact Inspection</span>
                        <h3 className="text-2xl font-black text-slate-900">{project.title}</h3>
                    </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-medium" style={{ color: 'var(--text-muted)' }}>{project.description}</p>

                <div className="content-box-bg grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center mb-6">
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-700" style={{ color: 'var(--text-muted)' }}>Mana Cost</span>
                        <span className="text-sm font-extrabold text-blue-600">{project.stats.ManaCost}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-700" style={{ color: 'var(--text-muted)' }}>Lines of Code</span>
                        <span className="text-sm font-extrabold text-emerald-600">{project.stats.LinesOfCode}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-700" style={{ color: 'var(--text-muted)' }}>Rating</span>
                        <span className="text-sm font-extrabold text-amber-600">{project.stats.Rating}</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                    >
                        Close
                    </button>
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors flex items-center space-x-2"
                    >
                        <span>Repository</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 9. CANVAS BACKGROUND PARTICLES COMPONENT
// ==========================================
function BackgroundCanvas({ isLightMode, activeGlowRef }) {
    const isLightModeRef = useRef(isLightMode);

    useEffect(() => {
        isLightModeRef.current = isLightMode;
    }, [isLightMode]);

    useEffect(() => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = document.documentElement.scrollHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.documentElement.scrollHeight;
        };

        window.addEventListener('resize', handleResize);

        const particles = Array.from({ length: 200 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: 1
        }));

        let animId;
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = activeGlowRef.current || '#3b82f6';
                ctx.globalAlpha = p.alpha * (isLightModeRef.current ? 0.5 : 0.4);
                ctx.fill();
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return null;
}