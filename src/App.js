import React, { useState, useEffect, useRef } from 'react';
import AboutContent from './components/page-contents/AboutContent';
import ExperienceContent from './components/page-contents/ExperienceContent';
import ProjectsContent, {PROJECTS_DETAILS} from './components/page-contents/ProjectsContent';

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
// 2. DATA DEFINITIONS
// ==========================================
const CARDS_DATA = [
    {
        id: 'about',
        title: 'Justin Siu',
        type: 'Software Engineer',
        cost: 2,
        icon: 'fa-user-gear',
        badgeBgDark: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        badgeBgLight: 'bg-blue-100 text-blue-800 border-blue-300',
        borderDark: 'border-blue-500/60',
        borderLight: 'border-blue-600',
        glowDark: '#3b82f6',
        glowLight: '#2563eb',
        bgDark: 'from-blue-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-blue-50 via-white to-slate-50',
        flavorText: 'Full-stack engineer specializing in C++, Python, and reactive frontend architectures.'
    },
    {
        id: 'experience',
        title: 'Career Log',
        type: 'Experience',
        cost: 3,
        icon: 'fa-briefcase',
        badgeBgDark: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        badgeBgLight: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        borderDark: 'border-indigo-500/60',
        borderLight: 'border-indigo-600',
        glowDark: '#6366f1',
        glowLight: '#4f46e5',
        bgDark: 'from-indigo-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-indigo-50 via-white to-slate-50',
        flavorText: 'Timeline chronicle of backend engineering roles, internships, and shipped software.'
    },
    {
        id: 'projects',
        title: 'Inventory',
        type: 'Projects',
        cost: 4,
        icon: 'fa-laptop-code',
        badgeBgDark: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/50',
        badgeBgLight: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        borderDark: 'border-emerald-400/60',
        borderLight: 'border-emerald-600',
        glowDark: '#10b981',
        glowLight: '#059669',
        bgDark: 'from-emerald-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-emerald-50 via-white to-slate-50',
        flavorText: 'Live applications and open-source software built with React, Stockfish, and Python.'
    },
    {
        id: 'contact',
        title: 'Get In Touch',
        type: 'Contact',
        cost: 1,
        icon: 'fa-envelope-open-text',
        badgeBgDark: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        badgeBgLight: 'bg-rose-100 text-rose-900 border-rose-300',
        borderDark: 'border-rose-500/60',
        borderLight: 'border-rose-600',
        glowDark: '#f43f5e',
        glowLight: '#e11d48',
        bgDark: 'from-rose-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-rose-50 via-white to-slate-50',
        flavorText: 'Send a direct message to connect for software roles, projects, or collaborations.'
    }
];

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
export default function App () {
    const MAX_MANA_CAP = 10;
    const [currentMana, setCurrentMana] = useState(MAX_MANA_CAP);
    const [activeCardId, setActiveCardId] = useState('about');
    const [animatingCardId, setAnimatingCardId] = useState(null);
    const [isLightMode, setIsLightMode] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [activeModalProject, setActiveModalProject] = useState(null);
    const [manaLossNotice, setManaLossNotice] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeGlowRef = useRef('#3b82f6');

    // Auto-Replenishing Mana Engine
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentMana(prev => {
                if (prev < MAX_MANA_CAP) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1500);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [isLightMode]);

    useEffect(() => {
        const activeCard = CARDS_DATA.find(c => c.id === activeCardId);
        if (activeCard) {
            activeGlowRef.current = isLightMode ? activeCard.glowLight : activeCard.glowDark;
        }
    }, [activeCardId, isLightMode]);

    const toggleSound = () => {
        sounds.enabled = !soundEnabled;
        setSoundEnabled(!soundEnabled);
        if (!soundEnabled) sounds.playHover();
    };

    const handleReplenishMana = () => {
        sounds.playPotion();
        setCurrentMana(MAX_MANA_CAP);
    };

    const handlePlayCard = (card) => {
        if (card.id === activeCardId || currentMana < card.cost) return;

        setCurrentMana(prev => Math.max(0, prev - card.cost));
        setManaLossNotice(`-${card.cost} MANA`);
        setTimeout(() => setManaLossNotice(null), 1000);

        sounds.playCardPlay();
        setAnimatingCardId(card.id);

        setTimeout(() => {
            setActiveCardId(card.id);
            setAnimatingCardId(null);
            // Auto-close mobile drawer when selecting a card
            setIsMobileMenuOpen(false);
        }, 400);
    };

    return (
        <React.Fragment>

            {/* Canvas for particle effect background */}
            <BackgroundCanvas isLightMode={isLightMode} activeGlowRef={activeGlowRef} />

            <Header 
                currentMana={currentMana}
                maxMana={MAX_MANA_CAP}
                onReplenish={handleReplenishMana}
                manaLossNotice={manaLossNotice}
                isLightMode={isLightMode}
                onToggleTheme={() => {
                    sounds.playToggle();
                    setIsLightMode(!isLightMode);
                }}
                soundEnabled={soundEnabled}
                onToggleSound={toggleSound}
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMobileMenu={() => {
                    sounds.playToggle();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
            />

            <main className="w-full max-w-6xl mx-auto px-4 pt-24 pb-12 md:pb-48 flex-grow flex flex-col items-center justify-center z-10">
                <MainStage 
                    activeCardId={activeCardId} 
                    isLightMode={isLightMode} 
                    onOpenModal={(idx) => setActiveModalProject(PROJECTS_DETAILS[idx])} 
                />
            </main>

            {/* Desktop Card Hand Dock */}
            <div className="hidden md:block">
                <CardHand 
                    cards={CARDS_DATA}
                    activeCardId={activeCardId}
                    animatingCardId={animatingCardId}
                    currentMana={currentMana}
                    isLightMode={isLightMode}
                    onPlayCard={handlePlayCard}
                />
            </div>

            {/* Mobile Card Menu Drawer Overlay */}
            {isMobileMenuOpen && (
                <MobileMenuDrawer 
                    cards={CARDS_DATA}
                    activeCardId={activeCardId}
                    animatingCardId={animatingCardId}
                    currentMana={currentMana}
                    maxMana={MAX_MANA_CAP}
                    isLightMode={isLightMode}
                    soundEnabled={soundEnabled}
                    onPlayCard={handlePlayCard}
                    onReplenish={handleReplenishMana}
                    onToggleTheme={() => {
                        sounds.playToggle();
                        setIsLightMode(!isLightMode);
                    }}
                    onToggleSound={toggleSound}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            )}

            {activeModalProject && (
                <ProjectModal 
                    project={activeModalProject}  
                    onClose={() => setActiveModalProject(null)} 
                />
            )}
        </React.Fragment>
    );
}

// ==========================================
// 4. HEADER COMPONENT
// ==========================================
function Header({ currentMana, maxMana, onReplenish, manaLossNotice, isLightMode, onToggleTheme, soundEnabled, onToggleSound, isMobileMenuOpen, onToggleMobileMenu }) {
    return (
        <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-20 backdrop-blur-md border-b transition-colors duration-400 fixed top-0 left-0" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
            
            {/* Name Section (Top Left) */}
            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shadow-sm">
                    <i className="fa-solid fa-code text-base sm:text-lg"></i>
                </div>
                <div>
                    <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-amber-500 hover:text-amber-400 transition-colors duration-200">Justin Siu</h1>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-700 tracking-wide uppercase">Software Engineer</p>
                </div>
            </div>

            {/* Desktop Top Header Controls */}
            <div className="hidden md:flex flex-col items-center relative">
                <div className="header-mana-badge flex items-center space-x-1 sm:space-x-1.5 bg-slate-900/90 border border-blue-500/40 px-3 py-1.5 rounded-full shadow-inner transition-colors duration-300">
                    <i className="fa-solid fa-gem text-blue-500 text-xs sm:text-sm animate-pulse"></i>
                    <span className="text-xs sm:text-sm font-black tracking-wider text-blue-700">
                        {currentMana} / {maxMana} <span className="text-[10px] font-semibold text-blue-600 uppercase hidden sm:inline ml-1">MANA</span>
                    </span>
                </div>
                {manaLossNotice && (
                    <div className="absolute -bottom-6 text-xs font-black text-rose-500 animate-mana-loss tracking-widest pointer-events-none">
                        {manaLossNotice}
                    </div>
                )}
            </div>

            <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
                <button 
                    onClick={onReplenish}
                    title="Replenish Mana Potion"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/30 transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                    <i className="fa-solid fa-flask text-xs"></i>
                    <span className="hidden sm:inline">Refill</span>
                </button>

                <button 
                    onClick={onToggleSound}
                    title="Toggle Audio Effects"
                    className="header-toggle-btn w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-200 flex items-center justify-center text-xs sm:text-sm active:scale-95 border"
                >
                    <i className={`fa-solid ${soundEnabled ? 'fa-volume-high text-blue-500' : 'fa-volume-xmark text-slate-400'}`}></i>
                </button>

                <button 
                    onClick={onToggleTheme}
                    title="Toggle Light/Dark Realm"
                    className="header-toggle-btn w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-200 flex items-center justify-center text-xs sm:text-sm active:scale-95 border"
                >
                    <i className={`fa-solid ${isLightMode ? 'fa-moon text-indigo-600' : 'fa-sun text-amber-400'}`}></i>
                </button>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={onToggleMobileMenu}
                    className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 active:scale-95 transition-all"
                    aria-label="Toggle Deck Menu"
                >
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark text-lg' : 'fa-bars-staggered text-lg'}`}></i>
                </button>
            </div>
        </header>
    );
}

// ==========================================
// 5. MOBILE MENU DRAWER COMPONENT
// ==========================================
function MobileMenuDrawer({ cards, activeCardId, animatingCardId, currentMana, maxMana, isLightMode, soundEnabled, onPlayCard, onReplenish, onToggleTheme, onToggleSound, onClose }) {
    return (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="w-full h-full p-6 flex flex-col justify-between overflow-y-auto" style={{ backgroundColor: 'var(--modal-bg)', color: 'var(--text-main)' }}>
                
                {/* Header & Controls in Mobile Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
                    <div className="flex items-center space-x-2">
                        <div className="header-mana-badge flex items-center space-x-1.5 bg-slate-900/90 border border-blue-500/40 px-3 py-1.5 rounded-full shadow-inner">
                            <i className="fa-solid fa-gem text-blue-400 text-xs animate-pulse"></i>
                            <span className="text-xs font-black tracking-wider text-blue-300">
                                {currentMana} / {maxMana} <span className="text-[10px] font-semibold text-blue-300/90 uppercase ml-1">MANA</span>
                            </span>
                        </div>
                        <button 
                            onClick={onReplenish}
                            className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1 active:scale-95 transition-transform"
                        >
                            <i className="fa-solid fa-flask text-[10px]"></i>
                            <span>Refill</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={onToggleSound}
                            className="header-toggle-btn w-9 h-9 rounded-xl flex items-center justify-center text-xs border active:scale-95 transition-transform"
                        >
                            <i className={`fa-solid ${soundEnabled ? 'fa-volume-high text-blue-500' : 'fa-volume-xmark text-slate-400'}`}></i>
                        </button>

                        <button 
                            onClick={onToggleTheme}
                            className="header-toggle-btn w-9 h-9 rounded-xl flex items-center justify-center text-xs border active:scale-95 transition-transform"
                        >
                            <i className={`fa-solid ${isLightMode ? 'fa-moon text-indigo-600' : 'fa-sun text-amber-400'}`}></i>
                        </button>

                        <button 
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm border border-rose-500/30 active:scale-95 transition-transform"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <div className="flex-1 my-auto py-6 flex flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center space-x-2">
                        <i className="fa-solid fa-layer-group text-amber-400"></i>
                        <span>Select Deck Card</span>
                    </h3>

                    {/* Fullscreen Grid of Mobile Playable Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {cards.map((card) => {
                            const isActive = card.id === activeCardId;
                            const canAfford = currentMana >= card.cost;
                            const isDisabled = !canAfford || isActive;

                            return (
                                <div
                                    key={card.id}
                                    onClick={() => !isDisabled && onPlayCard(card)}
                                    className={`mobile-card tcg-card relative w-full h-48 rounded-2xl border-2 p-3.5 flex flex-col justify-between select-none bg-gradient-to-b ${isLightMode ? card.bgLight : card.bgDark} ${isLightMode ? card.borderLight : card.borderDark} ${isDisabled ? 'card-disabled' : 'cursor-pointer active:scale-95'} transition-all`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center border border-blue-300 shadow-md">
                                            {card.cost}
                                        </div>
                                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                                            {isActive ? 'ACTIVE' : !canAfford ? 'MANA LOW' : 'PLAY'}
                                        </span>
                                    </div>

                                    <div className="my-auto text-center flex flex-col items-center">
                                        <div className="card-icon text-3xl mb-1.5 text-sky-600 drop-shadow-sm">
                                            <i className={`fa-solid ${card.icon}`}></i>
                                        </div>
                                        <h4 className="text-sm font-extrabold leading-tight">{card.title}</h4>
                                    </div>

                                    <p className="text-[9px] text-center leading-tight line-clamp-2 italic font-medium opacity-80">
                                        "{card.flavorText}"
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Close Drawer Action Button */}
                <button 
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700/60 flex items-center justify-center space-x-2 active:scale-95 transition-transform"
                >
                    <span>Return to Stage</span>
                    <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
            </div>
        </div>
    );
}

// ==========================================
// 6. MAIN STAGE VIEW COMPONENT
// ==========================================
function MainStage({ activeCardId, isLightMode, onOpenModal }) {
    const card = CARDS_DATA.find(c => c.id === activeCardId) || CARDS_DATA[0];

    return (
        <div className="stage-container w-full rounded-2xl p-5 sm:p-8 md:p-10 border shadow-2xl transition-all duration-400 backdrop-blur-md">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-700/60">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                    <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">{card.type}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ color: 'var(--text-main)' }}>{card.title}</h2>
                </div>
            </div>

            {activeCardId === 'about' && <AboutContent/>}

            {activeCardId === 'experience' && <ExperienceContent/>}

            {activeCardId === 'projects' && <ProjectsContent onOpenModal={onOpenModal}/>}

            {activeCardId === 'contact' && (
                <form onSubmit={(e) => { e.preventDefault(); alert("Scroll sent successfully!"); }} className="space-y-4 max-w-lg mx-auto">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Your Name</label>
                        <input required type="text" placeholder="Traveler / Recruiter Name" className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors font-medium" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                        <input required type="email" placeholder="alex@realm.com" className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors font-medium" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Scroll Message</label>
                        <textarea required rows="3" placeholder="Write your message or inquiry here..." className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none font-medium"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm transition-colors shadow-lg shadow-rose-600/30">
                        Send Summon Scroll
                    </button>
                </form>
            )}
        </div>
    );
}

// ==========================================
// 7. CARD HAND DOCK COMPONENT (DESKTOP)
// ==========================================
function CardHand({ cards, activeCardId, animatingCardId, currentMana, isLightMode, onPlayCard }) {
    return (
        <div id="hand-dock" className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-2 pt-8 pointer-events-auto" style={{ background: 'var(--dock-bg)' }}>
            <div id="dock-tooltip" className="px-3 py-1 rounded-full border text-[11px] font-extrabold shadow-md mb-2 flex items-center space-x-1.5 transition-all">
                <i className="fa-solid fa-hand-pointer text-xs"></i>
                <span>Hover deck to expand & play cards</span>
            </div>

            <div className="flex justify-center items-end px-4">
                {cards.map((card) => {
                    const isActive = card.id === activeCardId;
                    const isAnimating = card.id === animatingCardId;
                    const canAfford = currentMana >= card.cost;
                    const isDisabled = !canAfford || isActive;

                    return (
                        <div
                            key={card.id}
                            onMouseEnter={() => !isDisabled && sounds.playHover()}
                            onClick={() => !isDisabled && onPlayCard(card)}
                            className={`hand-card tcg-card relative w-36 sm:w-44 h-52 sm:h-64 rounded-xl border-2 p-3 sm:p-4 flex flex-col justify-between cursor-pointer select-none bg-gradient-to-b ${isLightMode ? card.bgLight : card.bgDark} ${isLightMode ? card.borderLight : card.borderDark} ${isAnimating ? 'animate-play' : ''} ${isDisabled ? 'card-disabled' : ''} ${isActive ? 'active-card' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white font-black text-xs sm:text-sm flex items-center justify-center border border-blue-300 shadow-md">
                                    {card.cost}
                                </div>
                                <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                                    {isActive ? 'ACTIVE' : !canAfford ? 'MANA LOW' : card.type.split(' ')[1] || 'CARD'}
                                </span>
                            </div>

                            <div className="my-auto text-center flex flex-col items-center">
                                <div className="card-icon text-2xl sm:text-3xl mb-2 text-slate-800">
                                    <i className={`fa-solid ${card.icon}`}></i>
                                </div>
                                <h3 className="text-xs sm:text-sm font-extrabold leading-tight">{card.title}</h3>
                            </div>

                            <p className="text-[9px] sm:text-[10px] text-center leading-tight line-clamp-2 italic font-medium">
                                "{card.flavorText}"
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================
// 8. PROJECT MODAL COMPONENT
// ==========================================
function ProjectModal({ project, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
    useEffect(() => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.2
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
                ctx.globalAlpha = p.alpha * (isLightMode ? 0.25 : 0.4);
                ctx.fill();
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, [isLightMode]);

    return null;
}