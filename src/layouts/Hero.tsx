import { useEffect, useRef, type JSX } from "react";
import TextHeadline from "../components/ui/TextHeadline";

const Hero = (): JSX.Element => {
    
    const headingStringFirst = "Rafael";
    const headingStringSecond = "Antoniassi";
    const firstRef = useRef<HTMLHeadingElement>(null);
    const secondRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (firstRef.current) {
            firstRef.current.textContent = '';
            const radius = 220; 
            const letters = [...headingStringFirst];
            const arcAngle = 180 / 2 - 50; // degrees (upper half-circle)
            const angleStep = arcAngle / (letters.length - 1);

            // container setup
            firstRef.current.style.position = 'relative';
            firstRef.current.style.width = `${radius * 2}px`;
            firstRef.current.style.height = `${radius}px`;
            firstRef.current.style.display = 'block';

            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.position = 'absolute';
                span.style.top = '50%';
                span.style.left = '50%';

                // distribute angles from -180° (left) to 0° (right) for top half
                const angle = -180 + index * angleStep;

                span.style.transform = `
                    rotate(${angle}deg)
                    translate(${radius}px)
                    rotate(90deg) /* keep tangent to arc */
                `;

                firstRef.current?.appendChild(span);
            });
        }
        if (secondRef.current) {
            secondRef.current.textContent = '';
            const radius = -220; 
            const letters = [...headingStringSecond].reverse();
            const arcAngle = 180 / 2 - 20; // degrees (upper half-circle)
            const angleStep = arcAngle / (letters.length - 1);

            // container setup
            secondRef.current.style.position = 'relative';
            secondRef.current.style.width = `${radius * 2}px`;
            secondRef.current.style.height = `${radius}px`;
            secondRef.current.style.display = 'block';

            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.position = 'absolute';
                span.style.top = '50%';
                span.style.left = '50%';

                // distribute angles from -180° (left) to 0° (right) for top half
                const angle = -180 + index * angleStep;

                span.style.transform = `
                    rotate(${angle}deg)
                    translate(${radius}px)
                    rotate(90deg)
                `;

                secondRef.current?.appendChild(span);
            });
        }
    }, []);
    
    return (
        <section id='hero' className='pointer-events-none relative w-full flex flex-col h-screen flex items-center justify-center py-12 md:py-16 lg:py-24'>
            <div className='absolute font-mono items-center justify-center transform rotate-72 -translate-y-8 translate-x-5'>
                <TextHeadline className="text-center" ref={firstRef}>
                </TextHeadline>
            </div>
            <div className='rounded-full overflow-hidden w-100 h-100 flex pointer-events-auto'>
                <video autoPlay muted playsInline loop className='object-fill' src="src\assets\videos\hero.mp4"></video>
            </div>
            <div className='absolute font-mono items-center justify-center transform rotate-55 -translate-y-4 translate-x-5'>
                <TextHeadline className="text-center transform " ref={secondRef}>
                </TextHeadline>
            </div>
        </section>
    )
}

export default Hero;