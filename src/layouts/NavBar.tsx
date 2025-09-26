import { useState, type JSX, type ReactNode, useRef } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import Logo from "../components/ui/Logo";
import {  motion } from "motion/react";
import TextStandard from "../components/ui/TextStandard";
import { useLanguage } from '../components/contexts/LanguageContext'
import languageStrings from "../services/localisation.json"
import LanguageSelector from "../components/ui/LanguageSelector";
import { useWindowSize } from "../hooks/useWindowSize";



function NavBar(): JSX.Element  {    
    const [isOpen, setIsOpen] = useState(false);
    const {language, } = useLanguage();
    const screenWidth = useWindowSize();

    const ref = useRef<HTMLParagraphElement>(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const strings = {
        languageButton: () => {
            if (language === `En`)
            {
                return languageStrings.en.navBar.languageButton;
            }
            if (language === `Pt-Br`)
            {
                return languageStrings["Pt-Br"].navBar.languageButton;
            }
        },
        cta: () => {
            if (language === `En`)
            {
                return languageStrings.en.navBar.cta;
            }
            if (language === `Pt-Br`)
            {
                return languageStrings["Pt-Br"].navBar.cta;
            }
        }
    }

    const languageMenu = (): ReactNode => {
        if (isOpen && ref.current)
        {
            ref.current.style.color = "";
            return (
                <>
                    <TextStandard text={`${strings.languageButton()}`} importance={`important`} ref={ref}></TextStandard>
                    <PrimaryIcon iconType="solid" className="text-sm" icon={"xmark"}></PrimaryIcon>
                </> 
            )
        }
        else 
        {
            return(
                <>
                    <motion.div variants={hoverColor} transition={{duration: 0.1}} className="flex items-baseline gap-1 text-[#6a7282]">
                        <TextStandard text={`${strings.languageButton()}`} importance={`blank`} ref={ref}></TextStandard>
                        <PrimaryIcon iconType="solid" className="text-sm" color="text-inherit" icon={"plus"}></PrimaryIcon>
                    </motion.div>
                </>
            )
        };
    }

    const hoverColor = {
        idle: { color: "#6a7282" },
        hover: { color: "#f9fafb" }
    };

    if (screenWidth.width <= 680)
    {
        return (<></>);   
    }
    else
    {
        return (
            <nav className="flex flex-col gap-3 m-auto max-w-5xl text-base font-medium leading-normal transition-all">
                <div className="flex justify-between items-center">
                    <div>
                        <Logo></Logo>
                    </div>
                    <div>
                        <ul className="flex items-center">
                            <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{duration: 0.05, type: "spring", bounce: 0.5}}>
                                <a className="mr-1" href="">
                                    <PrimaryIcon iconType="brands" className="text-xl" icon={"linkedin-in"}></PrimaryIcon>
                                </a>
                            </motion.li>
                            <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{duration: 0.05, type: "spring", bounce: 0.5}}>
                                <a className="mr-2" href="">
                                    <PrimaryIcon iconType="brands" className="text-xl" icon={"github"}></PrimaryIcon>
                                </a>
                            </motion.li>
                            <li>
                                <PrimaryButton text={`${strings.cta()}`}></PrimaryButton>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="h-[1px] rounded-full bg-[var(--color-bg-tertiary)]"></div>
                <div className="flex gap-2">
                    <motion.button whileTap={{scale: 0.95}} onClick={handleClick} whileHover="hover" className="w-fit flex gap-1 items-baseline rounded-lg cursor-pointer">
                        {languageMenu()} 
                    </motion.button>
                    {isOpen && <LanguageSelector></LanguageSelector>}
                </div>
            </nav>
        )
    }
}

export default NavBar;