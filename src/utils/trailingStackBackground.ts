const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress", "GraphQL", "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "Blazor", "C#", "F#", "Azure", "SQL Server", "IIS", "NuGet", "Python", "C++", "C", "React Native", "Flutter", "Dart"];

// Store cleanup functions for each container
const cleanupMap = new WeakMap<HTMLDivElement, () => void>();

export function createTrailingStack(container: HTMLDivElement) {
    // Clean up any existing instance for this container
    const existingCleanup = cleanupMap.get(container);
    if (existingCleanup) {
        existingCleanup();
    }

    let containerCoordinates = container.getBoundingClientRect();
    const intervals: number[] = [];
    
    // Create resize handler
    const handleResize = () => {
        containerCoordinates = container.getBoundingClientRect();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set up each text element with staggered delays for wave effect
    const elements = Array.from(container.querySelectorAll(':scope > *'));
    elements.forEach((textStandard, index) => {
        // Stagger initial appearance
        setTimeout(() => {
            const intervalId = setCoordinates(containerCoordinates, textStandard as HTMLElement, index);
            if (intervalId) intervals.push(intervalId);
        }, index * 800); // Staggered start
    });
    
    // Create cleanup function
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
        intervals.forEach(intervalId => clearInterval(intervalId));
        
        container.querySelectorAll(':scope > *').forEach(element => {
            const htmlElement = element as HTMLElement;
            htmlElement.innerHTML = '';
            const newElement = htmlElement.cloneNode(false);
            htmlElement.parentNode?.replaceChild(newElement, htmlElement);
        });
        
        cleanupMap.delete(container);
    };
    
    cleanupMap.set(container, cleanup);
    return cleanup;
}

function setCoordinates(
    containerCoordinates: DOMRect, 
    stackParagraph: HTMLElement, 
    elementIndex: number
): number {
    let currentWord: string;
    let isAnimating = false;
    let currentTimeout: number | undefined;
    
    // Create zones to avoid clustering
    const zones = 6;
    const preferredZone = elementIndex % zones;
    
    const getZonedPosition = () => {
        const zoneWidth = containerCoordinates.width / 3;
        const zoneHeight = containerCoordinates.height / 2;
        
        const col = preferredZone % 3;
        const row = Math.floor(preferredZone / 3);
        
        return {
            x: col * zoneWidth + randomNumberInRange(0, zoneWidth * 0.8),
            y: row * zoneHeight + randomNumberInRange(0, zoneHeight * 0.8)
        };
    };
    
    const createNewWord = () => {
        const pos = getZonedPosition();
        stackParagraph.style.top = `${pos.y}px`;
        stackParagraph.style.left = `${pos.x}px`;

        const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
        stackParagraph.innerHTML = '';
        
        // Variable speed per element for organic feel
        const baseDelay = 60 + (elementIndex * 20); // Faster typing
        
        [...word].forEach((letter, index) => {
            const stackLetter = document.createElement('span');
            stackLetter.style.opacity = '0';
            stackLetter.style.display = 'inline-block';
            stackLetter.textContent = letter;
            stackParagraph.appendChild(stackLetter);
            
            // Smooth cascade effect
            animateText(stackLetter, index * baseDelay, 'animate-glowUpTypewriter');
        });

        currentWord = word;
        isAnimating = false; 
    };
    
    const updateText = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }
        
        if (currentWord) {
            const spans = stackParagraph.querySelectorAll('span');
            let completedAnimations = 0;
            
            // Fade out with delay for smoother transition
            [...spans].reverse().forEach((span, index) => {
                span.classList.remove('animate-glowUpTypewriter');
                
                setTimeout(() => {
                    span.classList.add('animate-glowDownTypewriter');
                    
                    const handleAnimationEnd = (e: AnimationEvent) => {
                        if (e.animationName === 'glowDownTypewriter') {
                            completedAnimations++;
                            span.removeEventListener('animationend', handleAnimationEnd);
                            
                            if (completedAnimations === spans.length) {
                                // Brief pause before new word
                                setTimeout(() => {
                                    stackParagraph.innerHTML = '';
                                    createNewWord();
                                }, 150);
                            }
                        }
                    };
                    
                    span.addEventListener('animationend', handleAnimationEnd);
                }, index * 50); // Even faster fade out
            });
        } else {
            currentTimeout = setTimeout(createNewWord, randomNumberInRange(200, 1000));
        }
    };
    
    updateText();
    // Quicker cycle time for more dynamic feel
    const intervalId = setInterval(updateText, randomNumberInRange(5000, 9000));
    
    return intervalId;
}

function animateText(span: HTMLSpanElement, duration: number, animation: string) {
    setTimeout(() => {
        span.classList.add(animation);
        // Even more subtle
        span.style.opacity = '.06';
        span.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.4))';
    }, duration);
}

function randomNumberInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}