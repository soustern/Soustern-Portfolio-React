const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress", "REST API", "GraphQL", "React Query", "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "ASP.NET", "Blazor", "C#", "F#", "Entity Framework Core", "Windows Forms", "Xamarin", "Visual Studio", "Visual Studio Code", "Azure", "SQL Server", "IIS", "NuGet", "ML.NET", "Python", "C++", "C", "React Native", "Flutter", "Dart"];


export function createTrailingStack(container: HTMLDivElement)
{
    const containerCoordinates = container.getBoundingClientRect();

    container.querySelectorAll(`:scope > *`).forEach(textStandard => setCoordinates(containerCoordinates, textStandard as HTMLElement, container))
}

function setCoordinates(heroCoordinates: DOMRect, stackParagraph: HTMLElement, container: HTMLDivElement)
{

    let currentWord: string;
    const updateText = () => {
        const staggerTime = 75;
        let fadeOutDuration = 0;

        if (currentWord) {
            const paragraphs = container.querySelectorAll(`.stack-paragraph`);
            for (const paragraph of paragraphs) {
                let wordCheck = ``;
                const spans = paragraph.querySelectorAll(`span`);
                spans.forEach(span => {
                    wordCheck += span.textContent;
                    if (wordCheck === currentWord) {
                        [...spans].reverse().forEach((span, index) => {
                            span.classList.remove('animate-glowUpTypewriter');
                            animateText(span, index * staggerTime, 'animate-glowDownTypewriter');
                        })
                    }
                })
                fadeOutDuration = spans.length * staggerTime + randomNumberInRange(1000, 3000);
            }
        }

        setTimeout(() => {
            stackParagraph.innerHTML = ``;

            stackParagraph.style.top = `${randomNumberInRange(0, heroCoordinates.height)}px`;
            stackParagraph.style.left = `${randomNumberInRange(0, heroCoordinates.width)}px`;

            const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
            [...word].forEach((letter, index) => {
                const stackLetter = document.createElement(`span`);
                stackLetter.style.opacity = `0`;
                stackLetter.style.display = `inline-block`;
                stackLetter.textContent = letter;
                stackParagraph.appendChild(stackLetter);
                animateText(stackLetter, index * staggerTime, 'animate-glowUpTypewriter');
            });

            currentWord = word; 
        }, fadeOutDuration);
    }
    
    updateText();
    setInterval(updateText, randomNumberInRange(4000, 10000));
};

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
