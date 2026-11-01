import {useEffect, useState, useRef} from 'react'

const CardHand = ({ cards, activeCardId, animatingCardId, currentMana, isLightMode, onCardClick, isHandOpen, setHandOpen, isMobile, sounds}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [clickedCard, setClickedCard] = useState(0)

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

        // Bind the event listeners
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
        if (isMobile) {
            return "Tap hand for options"
        } else {
            return "Hover to expand & play cards"
        }
    }

    // Calculate the rotation of a card
    const calculateCardTransform = (index, isHandOpen, isAnimating) => {
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
        const isSelected = index === clickedCard
        const arcDenominator = totalCards > 1 ? totalCards : 1;
        
        // Stable parabola curve for the vertical fan drop
        let translateY = Math.pow(Math.abs(distanceFromCenter), 2) * (12 / arcDenominator);

        if (isAnimating && isSelected) {
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
        
        touchStartX.current = e.clientX;
        dragStartIndex.current = activeIndex; 
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current) return;

        const currentX = e.clientX;
        const difference = (touchStartX.current - currentX) * 1.2; // Positive = left drag, Negative = right drag
        let calculatedOffset = -difference;

        // Limits for how far to drag
        const maxRightDrag = dragStartIndex.current * 150; // Negative limit (Furthest right the deck can slide)
        const maxLeftDrag = -(cards.length - 1 - dragStartIndex.current) * 150; // Positive limit (Furthest left the deck can slide)

        // Checks if we've gone past our edges
        const pushingPastFirstCard = calculatedOffset > maxRightDrag;
        const pushingPastLastCard = calculatedOffset < maxLeftDrag; 

        // Creates a rubber banding effect
        if (pushingPastFirstCard) {
            const excess = calculatedOffset - maxRightDrag;
            calculatedOffset = maxRightDrag + (excess * 0.3);

        } else if (pushingPastLastCard) {
            const excess = calculatedOffset - maxLeftDrag;
            calculatedOffset = maxLeftDrag + (excess * 0.3);
        }

        // Update the live offset to trigger smooth component renders
        setDragOffset(calculatedOffset);
    };

    const handleTouchEnd = (e) => {
        setIsDragging(false);
        touchStartX.current = 0;

        const finalDragDistance = -dragOffset;
        const rawCardPasses = finalDragDistance / 150;
        let indexShift = Math.round(rawCardPasses);

        const swipeThreshold = 40;
        if (indexShift === 0 && Math.abs(finalDragDistance) > swipeThreshold) {
            indexShift = Math.sign(finalDragDistance);
        }
        
        // Prevent click event from triggering after release on drag
        if (Math.abs(finalDragDistance) > swipeThreshold && !isMobile){
            e.stopPropagation();
            e.preventDefault();
        }

        const targetIndex = dragStartIndex.current + indexShift;
        const nextIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
        
        setActiveIndex(nextIndex);
        
        // Trigger transition lock state so the snap animation runs cleanly 
        // without interruptions from subsequent premature touches.
        setIsTransitioning(true);
        setDragOffset(0);
    };

    return <div 
        ref={handRef}
        id="hand-dock" 
        className="h-200 fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto" 
        style={{ background: 'var(--dock-bg)' }}
        onMouseOver={() => setHandOpen(true)}
        onMouseOut={() => setHandOpen(false)}

        onPointerDown={handleTouchStart}
        onPointerMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClickCapture={handleTouchEnd}
    >
        <div 
            id="dock-tooltip" 
            className={`px-3 py-1 rounded-full mb-5 border text-[10px] sm:text-[11px] font-extrabold shadow-md flex items-center space-x-1.5 transition-all bg-transparent m-7
            ${isHandOpen ? 'opacity-0' : ''}`}
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

                return (
                    <div
                        key={card.id}
                        onMouseEnter={() => !isDisabled && !isMobile && sounds.playHover()}
                        onClick={() => {
                            setClickedCard(i)
                            setTimeout(() => {setHandOpen(false); }, 300)
                            onCardClick(card);
                        }}
                        className={`hand-card tcg-card relative transition-transform duration-200 
                            w-44 h-64 rounded-xl border-2 p-2.5 md:p-3 flex flex-col justify-between cursor-pointer select-none bg-gradient-to-b 
                            ${isLightMode ? card.bgLight : card.bgDark} ${isLightMode ? card.borderLight : card.borderDark} 
                            ${isDisabled ? 'card-disabled' : ''} ${isHandOpen ? '' : 'hidden'}
                        `}
                        style={calculateCardTransform(i, isHandOpen, isAnimating)}
                    >
                        {/* --- HEADER: Card Cost, Title, Icon, and Badge --- */}
                        <div className="flex flex-col gap-1 sm:gap-1.5">
                            <div className="flex justify-between items-start w-full">
                                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-blue-600 text-white font-black text-xs md:text-sm flex items-center justify-center border border-blue-300 shadow-md shrink-0">
                                    {card.cost}
                                </div>
                                <span className={`text-[9px] md:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${isLightMode ? card.badgeBgLight : card.badgeBgDark}`}>
                                    {isActive ? 'ACTIVE' : !canAfford ? 'LOW' : 'PLAY'}
                                </span>
                            </div>

                            <div className="text-center flex flex-col items-center mt-5">
                                <div className="card-icon text-xl text-slate-800">
                                    <i className={`fa-solid ${card.icon}`}></i>
                                </div>
                                <h3 className="text-sm font-extrabold leading-tight">{card.title}</h3>
                            </div>
                        </div>

                        {/* --- EFFECT AREA: contains the card effect --- */}
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
}

export default CardHand