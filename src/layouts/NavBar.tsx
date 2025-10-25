import { useState, type JSX, type ReactNode, useRef, useEffect } from "react";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import Logo from "../components/ui/Logo";
import {  AnimatePresence, motion } from "motion/react";
import TextStandard from "../components/ui/TextStandard";
import { useLanguage } from '../components/contexts/LanguageContext'
import languageStrings from "../services/localisation.json"
import LanguageSelector from "../components/ui/LanguageSelector";
import { useWindowSize } from "../hooks/useWindowSize";
import { useScroll } from "../components/contexts/ScrollContext";
import gsap from "gsap";


function NavBar(): JSX.Element  {    
    const [isOpen, setIsOpen] = useState(false);
    const {language, } = useLanguage();
    const screenWidth = useWindowSize();
    const progressRef = useRef<HTMLDivElement>(null);
    const {scrollProgress, setScrollProgress} = useScroll();
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
        },
        sections: {
            Hero: () => {
                if (language === `En`)
                {
                    return languageStrings.en.sections.Hero;
                }
                if (language === `Pt-Br`)
                {
                    return languageStrings["Pt-Br"].sections.Hero;
                }
            },
            Projects: () => {
                if (language === `En`)
                {
                    return languageStrings.en.sections.Projects;
                }
                if (language === `Pt-Br`)
                {
                    return languageStrings["Pt-Br"].sections.Projects;
                }
            },
            About: () => {
                if (language === `En`)
                {
                    return languageStrings.en.sections.About;
                }
                if (language === `Pt-Br`)
                {
                    return languageStrings["Pt-Br"].sections.About;
                }
            },
            Education: () => {
                if (language === `En`)
                {
                    return languageStrings.en.sections.Education;
                }
                if (language === `Pt-Br`)
                {
                    return languageStrings["Pt-Br"].sections.Education;
                }
            },
            workWithMe: () => {
                if (language === `En`)
                {
                    return languageStrings.en.sections.workWithMe;
                }
                if (language === `Pt-Br`)
                {
                    return languageStrings["Pt-Br"].sections.workWithMe;
                }
            },
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

    // TODO: Nav bar sections progress
    useEffect(() => {
        if (!progressRef.current) return;

        progressRef.current.style.width = `${scrollProgress}%`;

    }, [scrollProgress])

    const navigate = (percent: string) => {
        gsap.to(progressRef.current, {width: percent, duration: 1, ease: "power4.out",
            onUpdate: () => {
                setScrollProgress(Number(progressRef.current!.style.width.replace("%", "")));
            }
        })
    } 


    // TODO: Make mobile version of navbar

    if (screenWidth.width <= 1200)
    {
        return (<></>);   
    }
    else
    {
        return (
            <nav className="z-100 flex flex-col gap-2 m-auto max-w-5xl text-base leading-normal transition-all">
                <div className="flex justify-between items-center">
                    <div>
                        <Logo></Logo>
                    </div>
                    <div>
                        <ul className="flex items-center">
                            <motion.li whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} transition={{duration: 0.1, type: "spring", bounce: 0.5}}>
                                <a className="mr-1" href="" aria-label="Linkedin">
                                    <PrimaryIcon iconType="brands" className="text-xl" icon={"linkedin-in"}></PrimaryIcon>
                                </a>
                            </motion.li>
                            <motion.li whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} transition={{duration: 0.1, type: "spring", bounce: 0.5}}>
                                <a className="mr-2" href="" aria-label="Github">
                                    <PrimaryIcon iconType="brands" className="text-xl" icon={"github"}></PrimaryIcon>
                                </a>
                            </motion.li>
                        </ul>
                    </div>
                </div>
                <div className="h-[1px] rounded-full bg-[var(--color-bg-tertiary)]"></div>
                <div className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                        <motion.button whileTap={{scale: 0.95}} onClick={handleClick} whileHover="hover" className="w-fit flex gap-1 items-baseline rounded-lg cursor-pointer">
                            {languageMenu()}
                        </motion.button>
                        <AnimatePresence>{isOpen && <LanguageSelector></LanguageSelector>}</AnimatePresence>
                    </div>
                    <div className="">
                        <div className="flex flex-col w-fit relative">
                            <div ref={progressRef} className="h-[1px] w-0 rounded-full bg-[var(--color-accent-primary)] transform -translate-y-2"></div>
                            <ul className="flex gap-4">
                                <li><button onClick={() => navigate(`0%`)} className="cursor-pointer"><TextStandard importance="metadata" text={`${strings.sections.Hero()}`}></TextStandard></button></li>
                                <li><TextStandard importance="metadata" text={`${strings.sections.Projects()}`}></TextStandard></li>
                                <li><TextStandard importance="metadata" text={`${strings.sections.About()}`}></TextStandard></li>
                                <li><TextStandard importance="metadata" text={`${strings.sections.Education()}`}></TextStandard></li>
                                <li><TextStandard importance="metadata" text={`${strings.sections.workWithMe()}`}></TextStandard></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;