import { useWindowSize } from "../hooks/useWindowSize"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react";
import TextStandard from "../components/ui/TextStandard";
import { useLanguage } from "../components/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import LanguageSelector from "../components/ui/LanguageSelector";
import BorderButton from "../components/ui/BorderButton";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface greetingsModalProps {
    fontsReady: boolean;
}

// LOCAL STORAGE IS NOT BEING USED HERE BY DESIGN. I WANT THIS TO HAPPEN EVERY TIME A USER ENTERS THE PAGE
// TODO: Maybe implement local storage here
const GreetingsModal = ({fontsReady}: greetingsModalProps) => {
    const pageSize = useWindowSize();
    const {language, changeLanguage} = useLanguage();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [closed, setClosed] = useState<boolean>(false);
    const explanationParagraphRef = useRef<HTMLParagraphElement>(null);

    // This is for you lurkers, string wont go undefined on resize ;)
    useEffect(() => {
        if (pageSize.width > 900) changeLanguage("En");
    }, [pageSize.width])

    useGSAP(() => {
        if (!fontsReady) return;
        if (!explanationParagraphRef.current) return;

        const split = new SplitText(explanationParagraphRef.current, {type: "lines"});
        gsap.from(split.lines, {
            y: 100,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power4.inOut",
        })

    }, {dependencies: [fontsReady, pageNumber]});

    if (pageSize.width <= 900 && !closed)
    {
        return (
            <article className="z-50 fixed inset-0 h-[100vh] w-[100vw] bg-gradient-to-t from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] flex justify-between defaultPadding flex-col items-center py-6">
                <div className="flex items-center w-full gap-2 ">
                    <motion.div initial={{scaleX: 0, transformOrigin: "left", opacity: 0 }} transition={{duration: 0.3}} animate={{scaleX: "100%", opacity: 1}} className="flex-1 h-[1px] bg-gray-600 overflow-hidden relative rounded-full">
                        <div className="absolute transform -translate-y-1/2 w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                    </motion.div>
                    <motion.div initial={{scale: 0, opacity: 0 }} transition={{duration: 0.3}} animate={{scale: "100%", opacity: 1}}>
                        <TextStandard text={`${pageNumber}/2`}></TextStandard>
                    </motion.div>
                    <motion.div initial={{scaleX: 0, transformOrigin: "right", opacity: 0 }} transition={{duration: 0.3}} animate={{scaleX: "100%", opacity: 1}} className="flex-1 h-[1px] bg-gray-600 overflow-hidden relative rounded-full">
                        <div className="absolute transform -translate-y-1/2 w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                    </motion.div>
                </div>
                {pageNumber === 1 && <div className="flex flex-col gap-4 w-full">
                    <motion.div initial={{x: -100, opacity: 0 }} transition={{duration: 0.3}} animate={{x: 0, opacity: 1}}>
                        <TextStandard importance="important" text="Choose your Language to Start:"></TextStandard>
                        <TextStandard importance="metadata" text="(Can be changed Later)"></TextStandard>
                    </motion.div>
                    <motion.div initial={{x: 100, opacity: 0 }} transition={{duration: 0.3}} animate={{x: 0, opacity: 1}}>
                        <TextStandard importance="important" text="Escolha seu idioma para começar:"></TextStandard>
                        <TextStandard importance="metadata" text="(Pode ser mudado depois)"></TextStandard>
                    </motion.div>
                    <LanguageSelector className="text-xl p-2 w-full"></LanguageSelector>
                </div>}
                {pageNumber === 2 && <div className="flex flex-col gap-4 w-full">
                    <div>
                        {language === 'En' && <TextStandard ref={explanationParagraphRef}  text="This website is designed for larger screens and lacks conventional navigation. Mobile users can navigate by opening the menu and selecting the desired section."></TextStandard>}
                        {language === 'Pt-Br' && <TextStandard ref={explanationParagraphRef} text="Este site foi projetado para telas maiores e não possui uma navegação convencional. Em dispositivos móveis, navegue abrindo o menu e selecionando a seção desejada."></TextStandard>}
                    </div>
                </div>}    
                <div className="flex justify-end w-full">
                    {pageNumber === 1 && <BorderButton onClick={() => {setPageNumber(pageNumber + 1)}} text={language === "En" ? "Next" : "Próximo"} className={`transition-opacity duration-300 text-xl p-2 flex items-center justify-center gap-2 ${language === null ? "opacity-0 pointer-events-none" : ""}`} active={false}>  
                    </BorderButton>}
                    {pageNumber === 2 && <BorderButton onClick={() => {setClosed(true)}} text={language === "En" ? "Finish" : "Finalizar"} className={`transition-opacity duration-300 text-xl p-2 flex items-center justify-center gap-2`} active={false}>  
                    </BorderButton>}
                </div>      
            </article>
        )
    }
    else
    {
        return null;
    }
}

export default GreetingsModal