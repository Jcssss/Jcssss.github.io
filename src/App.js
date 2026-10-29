import React, { useState, useEffect, useRef } from 'react';
import AboutContent from './components/page-contents/AboutContent';
import ExperienceContent from './components/page-contents/ExperienceContent';
import ProjectsContent, {PROJECTS_DETAILS} from './components/page-contents/ProjectsContent';
import ContactContent from './components/page-contents/ContactContents';

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
        type: 'About',
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
        flavorText: 'Learn about the engineer behind the operation.'
    },
    {
        id: 'experience',
        title: 'Experience',
        type: 'Career Logs',
        cost: 3,
        icon: 'fa-briefcase',
        badgeBgDark: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
        badgeBgLight: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        borderDark: 'border-yellow-500/60',
        borderLight: 'border-yellow-600',
        glowDark: '#f6da3b',
        glowLight: '#dbb126',
        bgDark: 'from-yellow-950/90 via-slate-900 to-slate-900',
        bgLight: 'from-yellow-50 via-white to-slate-50',
        flavorText: 'A glimpse into the chronicled logs of my career.'
    },
    {
        id: 'projects',
        title: 'Projects',
        type: 'Inventory',
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
        flavorText: "Inspect the artifacts I've forged"
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
        flavorText: "Want to get in touch? I'm ready when you are!"
    }
];

// 1. Add this diagnostic helper component anywhere in App.js
function MobileDebugHUD() {
    const [dims, setDims] = React.useState({ vw: 0, vh: 0, mainH: 0 });

    React.useEffect(() => {
        const update = () => {
            const mainEl = document.querySelector('main');
            setDims({
                vw: window.innerWidth,
                vh: window.innerHeight,
                mainH: mainEl ? mainEl.offsetHeight : 0
            });
        };
        update();
        window.addEventListener('resize', update);
        const interval = setInterval(update, 200); // Polls live changes when menu toggles
        return () => {
            window.removeEventListener('resize', update);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed top-20 right-4 z-[9999] bg-slate-950/90 border border-amber-500 text-amber-400 text-xs p-2.5 rounded-xl shadow-2xl pointer-events-none font-mono">
            <div className="font-bold text-[10px] uppercase text-slate-400 mb-1">Layout Inspector</div>
            <div>Viewport H: {dims.vh}px</div>
            <div>Main Container H: {dims.mainH}px</div>
        </div>
    );
}

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
        <div className="min-h-dvh flex flex-col relative overflow-x-hidden">

            <MobileDebugHUD/>

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

            <main className="w-full max-w-6xl mx-auto px-4 pt-24 pb-12 flex-1 flex flex-col items-center justify-center z-10">
                <MainStage 
                    activeCardId={activeCardId} 
                    isLightMode={isLightMode} 
                    onOpenModal={(idx) => setActiveModalProject(PROJECTS_DETAILS[idx])}
                    setActiveCardId={setActiveCardId}
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
        </div>
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
                    <p className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-main)' }}>Software Engineer</p>
                </div>
            </div>

            {/* Desktop Top Header Controls */}
            <div className="hidden md:flex flex-col items-center relative">
                <div className="header-mana-badge flex items-center space-x-1 sm:space-x-1.5 bg-slate-900/90 border px-3 py-1.5 rounded-full shadow-inner transition-colors duration-300" style={{ borderColor: 'var(--tooltip-border)' }}>
                    <i className="fa-solid fa-gem text-xs sm:text-sm animate-pulse" style={{ color: 'var(--tooltip-text)' }}></i>
                    <span className="text-xs sm:text-sm font-black tracking-wider" style={{ color: 'var(--tooltip-text)' }}>
                        {currentMana} / {maxMana} <span className="text-[10px] font-semibold uppercase hidden sm:inline ml-1">MANA</span>
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
                    <i className={`fa-solid ${isLightMode ? 'fa-moon text-purple-600' : 'fa-sun text-amber-400'}`}></i>
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
function MobileMenuDrawer({ cards, activeCardId, currentMana, maxMana, isLightMode, soundEnabled, onPlayCard, onReplenish, onToggleTheme, onToggleSound, onClose }) {
    return (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-slate-950/95 backdrop-blur-xl isolate animate-in fade-in duration-200">
            <div className="w-full h-full p-6 flex flex-col justify-between overflow-y-auto" style={{ backgroundColor: 'var(--modal-bg)', color: 'var(--text-main)' }}>
                
                {/* Header & Controls in Mobile Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
                    <div className="flex items-center space-x-2">
                        <div className="header-mana-badge flex items-center space-x-1 sm:space-x-1.5 bg-slate-900/90 border px-3 py-1.5 rounded-full shadow-inner" style={{ borderColor: 'var(--tooltip-border)' }}>
                            <i className="fa-solid fa-gem text-xs sm:text-sm animate-pulse" style={{ color: 'var(--tooltip-text)' }}></i>
                            <span className="text-xs sm:text-sm font-black tracking-wider" style={{ color: 'var(--tooltip-text)' }}>
                                {currentMana} / {maxMana} <span className="text-[10px] font-semibold uppercase hidden sm:inline ml-1">MANA</span>
                            </span>
                        </div>
                        <button 
                            onClick={onReplenish}
                            className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1 active:scale-95 transition-transform" style={{color: 'var(--variety-text-4)'}}
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
                        <span>Select Option</span>
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
                                            {isActive ? 'ACTIVE' : !canAfford ? 'MANA LOW' : 'ACTION'}
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
                    className="w-full py-3 rounded-xl hover:bg-slate-700 text-xs font-bold border flex items-center justify-center space-x-2 active:scale-95 transition-transform" style={{backgroundColor: 'var(--tooltip-bg)', color: 'var(--tooltip-text)', borderColor: 'var(--tooltip-border)'}}
                >
                    <span>Return to Main Page</span>
                    <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
            </div>
        </div>
    );
}

// ==========================================
// 6. MAIN STAGE VIEW COMPONENT
// ==========================================
function MainStage({ activeCardId, isLightMode, onOpenModal, setActiveCardId}) {
    const card = CARDS_DATA.find(c => c.id === activeCardId) || CARDS_DATA[0];

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
// 7. CARD HAND DOCK COMPONENT (DESKTOP)
// ==========================================
function CardHand({ cards, activeCardId, animatingCardId, currentMana, isLightMode, onPlayCard }) {
    return (
        <div id="hand-dock" className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-2 pt-8 pointer-events-auto" style={{ background: 'var(--dock-bg)' }}>
            <div id="dock-tooltip" className="px-3 py-1 rounded-full border text-[11px] font-extrabold shadow-md mb-5 flex items-center space-x-1.5 transition-all">
                <i className="fa-solid fa-hand-pointer text-xs"></i>
                <span>Hover to expand & play cards</span>
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
                            className={`hand-card tcg-card relative w-36 sm:w-44 h-52 sm:h-64 rounded-xl border-2 p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer select-none bg-gradient-to-b ${isLightMode ? card.bgLight : card.bgDark} ${isLightMode ? card.borderLight : card.borderDark} ${isAnimating ? 'animate-play' : ''} ${isDisabled ? 'card-disabled' : ''} ${isActive ? 'active-card' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white font-black text-xs sm:text-sm flex items-center justify-center border border-blue-300 shadow-md">
                                    {card.cost}
                                </div>
                                <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                                    {isActive ? 'ACTIVE' : !canAfford ? 'MANA LOW' : 'ACTION'}
                                </span>
                            </div>

                            {/* Center icon & title take up compact space */}
                            <div className="my-1 text-center flex flex-col items-center">
                                <div className="card-icon text-xl sm:text-2xl mb-1 text-slate-800">
                                    <i className={`fa-solid ${card.icon}`}></i>
                                </div>
                                <h3 className="text-xs sm:text-sm font-extrabold leading-tight">{card.title}</h3>
                            </div>

                            {/* Flavor text expanded to allow up to 3 lines and more room */}
                            <p className="text-[9px] sm:text-[10px] text-center leading-relaxed line-clamp-3 italic font-medium opacity-90 pb-1">
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
    
    // Keep a ref of isLightMode so the render loop always knows the latest theme
    // without needing to restart the effect and resize the canvas.
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
                // Read from the ref instead of triggering effect re-runs
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
    }, []); // Empty array ensures it only mounts once on page load and never truncates unexpectedly!

    return null;
}