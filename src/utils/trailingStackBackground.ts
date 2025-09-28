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
    
    // Set up each text element
    container.querySelectorAll(':scope > *').forEach(textStandard => {
        const intervalId = setCoordinates(containerCoordinates, textStandard as HTMLElement, container);
        if (intervalId) intervals.push(intervalId);
    });
    
    // Create cleanup function
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
        intervals.forEach(intervalId => clearInterval(intervalId));
        
        // Clear any ongoing animations and event listeners
        container.querySelectorAll(':scope > *').forEach(element => {
            const htmlElement = element as HTMLElement;
            htmlElement.innerHTML = '';
            // Remove any remaining event listeners by cloning the node
            const newElement = htmlElement.cloneNode(false);
            htmlElement.parentNode?.replaceChild(newElement, htmlElement);
        });
        
        cleanupMap.delete(container);
    };
    
    // Store cleanup function
    cleanupMap.set(container, cleanup);
    
    return cleanup;
}

function setCoordinates(containerCoordinates: DOMRect, stackParagraph: HTMLElement, container: HTMLDivElement): number {
    let currentWord: string;
    let isAnimating = false;
    let currentTimeout: number | undefined;
    
    const createNewWord = () => {
        stackParagraph.style.top = `${randomNumberInRange(0, containerCoordinates.height)}px`;
        stackParagraph.style.left = `${randomNumberInRange(0, containerCoordinates.width)}px`;

        const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
        
        // Clear any existing content first
        stackParagraph.innerHTML = '';
        
        [...word].forEach((letter, index) => {
            const stackLetter = document.createElement('span');
            stackLetter.style.opacity = '0';
            stackLetter.style.display = 'inline-block';
            stackLetter.textContent = letter;
            stackParagraph.appendChild(stackLetter);
            animateText(stackLetter, index * 200, 'animate-glowUpTypewriter');
        });

        currentWord = word;
        isAnimating = false; 
    };
    
    const updateText = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        // Clear any pending timeout
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }
        
        if (currentWord) {
            const spans = stackParagraph.querySelectorAll('span');
            let completedAnimations = 0;
            
            [...spans].reverse().forEach((span, index) => {
                span.classList.remove('animate-glowUpTypewriter');
                
                setTimeout(() => {
                    span.classList.add('animate-glowDownTypewriter');
                    
                    // Create a new handler for each span to avoid stacking
                    const handleAnimationEnd = (e: AnimationEvent) => {
                        if (e.animationName === 'glowDownTypewriter') {
                            completedAnimations++;
                            span.removeEventListener('animationend', handleAnimationEnd);
                            
                            // When ALL fade-out animations are done
                            if (completedAnimations === spans.length) {
                                stackParagraph.innerHTML = '';
                                createNewWord();
                            }
                        }
                    };
                    
                    span.addEventListener('animationend', handleAnimationEnd);
                }, index * 200);
            });
        } else {
            // First run - no previous word to animate out
            currentTimeout = setTimeout(createNewWord, randomNumberInRange(200, 1000));
        }
    };
    
    updateText();
    const intervalId = setInterval(updateText, randomNumberInRange(5000, 10000));
    
    return intervalId;
}

function animateText(span: HTMLSpanElement, duration: number, animation: string) {
    setTimeout(() => {
        span.classList.add(animation);
        span.style.opacity = '.10';
        span.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,0.8))';
    }, duration);
}

function randomNumberInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}