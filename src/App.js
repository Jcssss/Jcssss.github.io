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
        effect: 'Open the About page. Cannot be played if About page is open.',
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
        effect: 'Open the Experience page. Cannot be played if Experience section is open.',
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
        effect: 'Open the Projects section. Cannot be played if Projects section is open.',
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
        effect: 'Open the Contact section. Cannot be played if Contact section is open.',
        flavorText: "Want to get in touch? I'm ready when you are!"
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
    const [isHandOpen, setHandOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const activeGlowRef = useRef('#3b82f6');

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
            setIsMobileMenuOpen(false);
        }, 300);
    };

    const handleCardClick = (card) => {
        // On mobile, trigger a quick tap/draw animation before opening the menu drawer
        if (!isMobile || isHandOpen) {
            // Desktop behavior
            const canAfford = currentMana >= card.cost;
            const isActive = card.id === activeCardId;
            if (!canAfford || isActive) return;
            handlePlayCard(card);
        }
    };

    return (
        <div className="h-dvh flex flex-col relative overflow-x-hidden overflow-y-auto">

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
                    setIsMobileMenuOpen((curr) => !curr);
                }}
            />

            <main className="w-full max-w-6xl mx-auto px-4 pt-24 pb-48 md:pb-36 flex-1 flex flex-col items-center justify-center z-10">
                <MainStage 
                    activeCardId={activeCardId} 
                    isLightMode={isLightMode} 
                    onOpenModal={(idx) => setActiveModalProject(PROJECTS_DETAILS[idx])}
                    setActiveCardId={setActiveCardId}
                />
            </main>

            {/* Universal Card Hand Dock (Always visible on mobile & desktop) */}
            <CardHand 
                isHandOpen={isHandOpen}
                setHandOpen={setHandOpen}
                isMobile={isMobile}
                cards={CARDS_DATA}
                activeCardId={activeCardId}
                animatingCardId={animatingCardId}
                currentMana={currentMana}
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

            {/* Top Header Controls & Mana Meter */}
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex flex-col items-center relative">
                    <div className="header-mana-badge flex items-center space-x-1 sm:space-x-1.5 bg-slate-900/90 border px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-inner transition-colors duration-300" style={{ borderColor: 'var(--tooltip-border)' }}>
                        <i className="fa-solid fa-gem text-xs sm:text-sm animate-pulse" style={{ color: 'var(--tooltip-text)' }}></i>
                        <span className="text-xs sm:text-sm font-black tracking-wider" style={{ color: 'var(--tooltip-text)' }}>
                            {currentMana} / {maxMana} <span className="text-[10px] font-semibold uppercase hidden sm:inline ml-1">MANA</span>
                        </span>
                    </div>
                    {manaLossNotice && (
                        <div className="absolute -bottom-5 sm:-bottom-6 text-[10px] sm:text-xs font-black text-rose-500 animate-mana-loss tracking-widest pointer-events-none">
                            {manaLossNotice}
                        </div>
                    )}
                </div>

                <button 
                    onClick={onReplenish}
                    title="Replenish Mana Potion"
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/30 transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                    <i className="fa-solid fa-flask text-xs"></i>
                    <span className="hidden sm:inline">Refill</span>
                </button>

                {/* <button 
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
                </button>*/}

                {/* Mobile Hamburger Menu Toggle Button */}
                {/* <button
                    onClick={onToggleMobileMenu}
                    className="md:hidden p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 active:scale-95 transition-all"
                    aria-label="Toggle Deck Menu"
                >
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark text-sm' : 'fa-bars-staggered text-sm'}`}></i>
                </button> */}
            </div>
        </header>
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
// 7. CARD HAND DOCK COMPONENT
// ==========================================
function CardHand({ cards, activeCardId, animatingCardId, currentMana, isLightMode, onCardClick, isHandOpen, setHandOpen, isMobile}) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Refs for continuous dragging behavior
    const dragStartIndex = useRef(0);
    const touchStartX = useRef(0);
    const handRef = useRef(null);

    // Setup click handlers for opening hand in mobile view
    useEffect(() => {
        if (!isMobile) {
            return
        }

        function handleClickOutside(event) {
            // Check if the click happened outside the referenced element
            if (handRef.current && !handRef.current.contains(event.target) && isHandOpen) {
                setHandOpen(false)
            }
        }

        function handleClickInside(event) {
            // Check if the click happened outside the referenced element
            if (handRef.current && handRef.current.contains(event.target) && !isHandOpen) {
                // Set timeout so clicking a hidden card doesn't trigger it
                const timerId = setTimeout(() => setHandOpen(true), 50)
                return () => clearTimeout(timerId)
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickInside);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            // Clean up the event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, [isHandOpen, isMobile]);

    // Clamps active index measure
    useEffect(() => {
        setActiveIndex(curr => Math.min(Math.max(0, curr), cards.length - 1))
    }, [activeIndex, cards.length])

    // Generate the tooltip text for the hand of cards
    const getTooltipText = () => {
        if (isHandOpen) {
            return "Select a card to play it"
        } else if (isMobile) {
            return "Tap hand for options"
        } else {
            return "Hover to expand & play cards"
        }
    }

    // Calculate the rotation of a card
    const calcRotation = (index, isHandOpen, isAnimating) => {
        if (!isHandOpen) {
            return { visibility: 'hidden' }
        }
        
        const cardWidthOffset = 150; 
        const totalCards = cards.length;

        // Anchor the moving layout calculations to dragStartIndex instead of activeIndex
        const displayIndex = isDragging 
            ? dragStartIndex.current - (dragOffset / cardWidthOffset)
            : activeIndex;

        // Use the live, fluid displayIndex to position the layout smoothly
        const midIndex = isHandOpen ? displayIndex : (totalCards - 1) / 2;
        const translateX = (index - midIndex) * cardWidthOffset;
        const distanceFromCenter = index - midIndex;

        // Scale cards based on distance from center
        const distanceToCenterAbs = Math.abs(distanceFromCenter);
        let scale = 1;
        if (distanceToCenterAbs < 1) {
            scale = 1 + (1 - distanceToCenterAbs) * 0.2; 
        }

        const currentClosestIndex = Math.round(displayIndex);
        const isFocused = index === currentClosestIndex;
        const arcDenominator = totalCards > 1 ? totalCards : 1;
        
        // Stable parabola curve for the vertical fan drop
        let translateY = Math.pow(Math.abs(distanceFromCenter), 2) * (12 / arcDenominator);
        translateY -= 260; 

        if (isAnimating && isFocused) {
            translateY -= 40
        }

        // Stable rotational dispersion angle 
        const maxAngle = 7;
        const rotate = totalCards > 1 ? (distanceFromCenter / arcDenominator) * maxAngle : 0;

        return {
            transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
            zIndex: isFocused ? 100 : 50 - Math.abs(index - currentClosestIndex),
            position: 'absolute',
            // Turn off transitions entirely while dragging OR if catching a mid-flight animation frame
            transition: (isDragging || !isTransitioning) 
                ? 'none' 
                : 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease', 
        };
    };


    const handleTouchStart = (e) => {
        // If the user taps while the deck is still animating back from a rubber-band stretch,
        // we kill the transition state instantly to catch the card exactly where it is.
        setIsTransitioning(false); 
        
        touchStartX.current = e.touches[0].clientX;
        dragStartIndex.current = activeIndex; 
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current) return;

        const currentX = e.touches[0].clientX;
        const difference = (touchStartX.current - currentX) * 1.2; // Positive = left drag, Negative = right drag
        let calculatedOffset = -difference;

        // 1. Structural boundaries stay the same
        const maxRightDrag = dragStartIndex.current * 150; // Negative limit (Furthest left the deck can slide)
        const maxLeftDrag = -(cards.length - 1 - dragStartIndex.current) * 150; // Positive limit (Furthest right the deck can slide)

        // Remember: Positive calculatedOffset = dragging right. Negative = dragging left.
        const pushingPastFirstCard = calculatedOffset > maxRightDrag;
        const pushingPastLastCard = calculatedOffset < maxLeftDrag; 

        if (pushingPastFirstCard) {
            const excess = calculatedOffset - maxRightDrag;
            calculatedOffset = maxRightDrag + (excess * 0.3);

        } else if (pushingPastLastCard) {
            const excess = calculatedOffset - maxLeftDrag;
            calculatedOffset = maxLeftDrag + (excess * 0.3);
        }

        // 4. Update the live offset to trigger smooth component renders
        setDragOffset(calculatedOffset);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        touchStartX.current = 0;

        const finalDragDistance = -dragOffset;
        const rawCardPasses = finalDragDistance / 150;
        let indexShift = Math.round(rawCardPasses);

        const swipeThreshold = 40;
        if (indexShift === 0 && Math.abs(finalDragDistance) > swipeThreshold) {
            indexShift = Math.sign(finalDragDistance);
        }

        const targetIndex = dragStartIndex.current + indexShift;
        const nextIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
        
        setActiveIndex(nextIndex);
        
        // Trigger transition lock state so the snap animation runs cleanly 
        // without interruptions from subsequent premature touches.
        setIsTransitioning(true);
        setDragOffset(0);
    };

    return (
        <div 
            ref={handRef}
            id="hand-dock" 
            className="h-400 md:h-[40%] fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto" 
            style={{ background: 'var(--dock-bg)' }}
            onMouseOver={() => setHandOpen(true)}
            onMouseOut={() => setHandOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div 
                id="dock-tooltip" 
                className={`px-3 py-1 rounded-full mb-5 border text-[10px] sm:text-[11px] font-extrabold shadow-md flex items-center space-x-1.5 transition-all bg-transparent sm:mb-7 mb-2 translate-y-12 ${isHandOpen ? 'hidden' : ''}`}
            >
                <i className="fa-solid fa-hand-pointer text-xs"></i>
                <span className="inline">
                    {getTooltipText()}
                </span>
            </div>

            <div 
                onTransitionEnd={() => setIsTransitioning(false)}
                className={`card-container relative flex justify-center items-end px-2 sm:px-4 w-full max-w-xl sm:max-w-none no-scrollbar transition-transform duration-200 h-full`}
            >
                {cards.map((card, i) => {
                    const isActive = card.id === activeCardId;
                    const isAnimating = card.id === animatingCardId;
                    const canAfford = currentMana >= card.cost;
                    const isDisabled = !canAfford || isActive;
                    const isSwipeFocused = i === activeIndex;

                    return (
                        <div
                            key={card.id}
                            onMouseEnter={() => !isDisabled && !isMobile && sounds.playHover()}
                            onClick={() => {
                                if (isSwipeFocused && isHandOpen) {
                                    setTimeout(() => {setHandOpen(false); }, 300)
                                    onCardClick(card);
                                }
                            }}
                            className={`hand-card tcg-card relative transition-transform duration-200 
                                w-36 md:w-44 h-52 md:h-64 rounded-xl border-2 p-2.5 md:p-3 flex flex-col justify-between cursor-pointer select-none bg-gradient-to-b 
                                ${isLightMode ? card.bgLight : card.bgDark} ${isLightMode ? card.borderLight : card.borderDark} 
                                ${isDisabled ? 'card-disabled' : ''}
                            `}
                            style={calcRotation(i, isHandOpen, isAnimating)}
                        >
                            {/* --- NEW HEADER: Houses Cost, Title, Icon, and Badge together at the top --- */}
                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                {/* Top bar for structural anchors */}
                                <div className="flex justify-between items-start w-full">
                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-blue-600 text-white font-black text-xs md:text-sm flex items-center justify-center border border-blue-300 shadow-md shrink-0">
                                        {card.cost}
                                    </div>
                                    <span className={`text-[9px] md:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                                        {isActive ? 'ACTIVE' : !canAfford ? 'LOW' : 'PLAY'}
                                    </span>
                                </div>

                                {/* Shifted Name & Image up directly under the stats bar with zero bottom margins */}
                                <div className="text-center flex flex-col items-center mt-5">
                                    <div className="card-icon text-xl text-slate-800">
                                        <i className={`fa-solid ${card.icon}`}></i>
                                    </div>
                                    <h3 className="text-sm font-extrabold leading-tight">{card.title}</h3>
                                </div>
                            </div>

                            {/* --- EXPANDED EFFECT AREA: Grows to occupy all newly freed vertical layout real estate --- */}
                            <div className="flex-1 flex items-center justify-center pt-1.5 sm:pt-2">
                                <p className="text-[10px] md:text-[11px] text-center leading-tight sm:leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-5 font-medium opacity-90 w-full">
                                    {card.effect}
                                </p>
                            </div>
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