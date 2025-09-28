const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress",  "GraphQL",  "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "Blazor", "C#", "F#", "Azure", "SQL Server", "IIS", "NuGet", "Python", "C++", "C", "React Native", "Flutter", "Dart"];


export function createTrailingStack(container: HTMLDivElement)
{
    let containerCoordinates = container.getBoundingClientRect();

    window.addEventListener(`resize`, () => {
        containerCoordinates = container.getBoundingClientRect();
    });

    container.querySelectorAll(`:scope > *`).forEach(textStandard => setCoordinates(containerCoordinates, textStandard as HTMLElement, container));
}

function setCoordinates(containerCoordinates: DOMRect, stackParagraph: HTMLElement, container: HTMLDivElement) {
    let currentWord: string;
    let isAnimating = false;
    
    const createNewWord = () => {
        stackParagraph.style.top = `${randomNumberInRange(0, containerCoordinates.height)}px`;
        stackParagraph.style.left = `${randomNumberInRange(0, containerCoordinates.width)}px`;

        const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
        [...word].forEach((letter, index) => {
            const stackLetter = document.createElement(`span`);
            stackLetter.style.opacity = `0`;
            stackLetter.style.display = `inline-block`;
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
        
        if (currentWord) {
            const spans = stackParagraph.querySelectorAll(`span`);
            let completedAnimations = 0;
            
            [...spans].reverse().forEach((span, index) => {
                span.classList.remove('animate-glowUpTypewriter');
                
                setTimeout(() => {
                    span.classList.add('animate-glowDownTypewriter');
                    
                    // Listen for each animation to complete
                    span.addEventListener('animationend', (e) => {
                        if (e.animationName === 'glowDownTypewriter') {
                            completedAnimations++;
                            
                            // When ALL fade-out animations are done
                            if (completedAnimations === spans.length) {
                                stackParagraph.innerHTML = '';
                                createNewWord();
                            }
                        }
                    }, { once: true });
                    
                }, index * 200);
            });
        } else {
            // First run - no previous word to animate out
            setTimeout(createNewWord, randomNumberInRange(200, 1000));
        }
    };
    
    updateText();
    setInterval(updateText, randomNumberInRange(5000, 10000));
}

function animateText(span: HTMLSpanElement, duration: number, animation: string) {
    setTimeout(() => {
        span.classList.add(animation);
        span.style.opacity = `.10`;
        span.style.filter = `drop-shadow(0 0 10px rgba(255,255,255,0.8))`;
    }, duration);
};

function randomNumberInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
};
