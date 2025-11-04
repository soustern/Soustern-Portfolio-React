import { useState, type JSX, type ReactNode, useRef, useEffect } from "react";
import Logo from "../components/ui/Logo";
import {  AnimatePresence,  motion } from "motion/react";
import TextStandard from "../components/ui/TextStandard";
import { useLanguage } from '../components/contexts/LanguageContext'
import languageStrings from "../services/localisation.json"
import LanguageSelector from "../components/ui/LanguageSelector";
import { useWindowSize } from "../hooks/useWindowSize";
import { useScroll } from "../components/contexts/ScrollContext";
import gsap from "gsap";
import { FaGithub } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa6';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import PrimaryButton from "../components/ui/PrimaryButton";
import { FaBars } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';

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

    const navOptions = [["Home", "hero-section"], ["A Prance", "about-section"], ["Serviços", "services-section"], ["Clientes", "brands-section"], ["Contatos", "footer-section"]];


    const languageMenu = (): ReactNode => {
        if (isOpen && ref.current)
        {
            ref.current.style.color = "";
            return (
                <div className="flex items-center gap-1">
                    <TextStandard text={`${strings.languageButton()}`} importance={`important`} ref={ref}></TextStandard>
                    <FaXmark className="text-xl text-gray-300" ></FaXmark>
                </div> 
            )
        }
        else 
        {
            return(
                <>
                    <motion.div variants={hoverColor} transition={{duration: 0.1}} className="flex items-center gap-1 text-[#6a7282]">
                        <TextStandard text={`${strings.languageButton()}`} importance={`blank`} ref={ref}></TextStandard>
                        <FaPlus className="text-lg text-inherit"></FaPlus>
                    </motion.div>
                </>
            )
        };
    }

    const hoverColor = {
        idle: { color: "#6a7282" },
        hover: { color: "#f9fafb" }
    };

    useEffect(() => {
        if (!progressRef.current) return;

        progressRef.current.style.width = `${scrollProgress}%`;

    }, [scrollProgress])

    const navigate = (percent: string) => {
        gsap.to(progressRef.current, {width: percent, duration: 0.2, ease: "none",
            onUpdate: () => {
                setScrollProgress(Number(progressRef.current!.style.width.replace("%", "")));
            }
        })
    } 


    // TODO: Make mobile version of navbar
    // TODO: Implement other navigation links
    // TODO: Refactor icons here to react Icons

    if (screenWidth.width <= 1200)
    {
        return (
            
            <nav className="bg-[var(--color-bg-primary)]/60 backdrop-blur-3xl px-2 pointer-events-auto">
                <div className="flex items-center justify-between">
                    <div id="logo">
                        <img src={""} className="max-w-[120px]" alt="" />
                    </div>
                    <div id="hamburger">
                        <motion.button aria-expanded={isOpen} aria-label="Abrir o menu" aria-controls="menu" whileTap={{scale: 0.8}} transition={{duration: 0.05, type: "spring", stiffness: 500, damping: 30}} className="cursor-pointer py-3" onClick={() => setIsOpen(!isOpen)}>
                        {
                            isOpen ? <FaXmark className="fa-solid fa-xmark text-slate-200 text-4xl"></FaXmark> : <FaBars className="fa-solid fa-bars text-slate-200 text-4xl"></FaBars>
                        }
                        </motion.button>
                    </div>
                </div>
                <AnimatePresence mode="wait">{isOpen && <motion.div id="menu" initial={{height: 0}} animate={{height: "auto"}} transition={{duration: 0.2, ease: "easeOut"}} className=" w-full overflow-hidden will-change-transform" exit={{height: 0}} style={{contain: 'layout style paint'}}>
                    <div className={`px-8 pt-8 pb-30 h-screen overflow-y-auto  ${isOpen ? `pointer-events-auto` : `pointer-events-none`}`}>
                        <ul className="w-full flex flex-col items-start gap-8">
                            {
                                navOptions.map((option, index) => {
                                    return (
                                        <motion.li whileTap={{backgroundColor: "rgba(255, 255, 255, 0.3)"}} key={option[0]} className="py-4 w-full relative" onClick={() => setIsOpen(false)}>
                                            <motion.a href={`#${option[1]}`} className="flex items-center justify-between [will-change: transform, opacity]" initial={{translateY: 10, opacity: 0}} animate={{translateY: 0, opacity: 1}} transition={{duration: 0.2, delay: index * 0.08}}>
                                                <p className="text-slate-200 text-2xl font-medium">{option[0]}</p>
                                                <FaArrowRight className="fa-solid fa-arrow-right text-slate-300 text-xl"></FaArrowRight>
                                            </motion.a>
                                            <motion.div initial={{width: 0}} animate={{width: "100%"}} transition={{duration: 0.2, delay: index * 0.08}}  className="h-[1px] bg-slate-300 left-0 top-full absolute"></motion.div>
                                        </motion.li>
                                    )
                                })
                            }
                            <motion.li className="w-full [will-change: transform, opacity]" initial={{translateY: 10, opacity: 0}} animate={{translateY: 0, opacity: 1}} transition={{duration: 0.2, delay: 0.4}}>
                                <PrimaryButton ariaLabel="Abrir o WhatsApp da empresa" text="Vamos conversar"></PrimaryButton>
                            </motion.li>
                            <li className="flex items-center gap-2 w-full justify-center">
                                <motion.div className="pointer-events-none w-full" initial={{translateY: 10, opacity: 0}} animate={{translateY: 0, opacity: 1}} transition={{duration: 0.2, delay: 0.5}}>
                                   
                                </motion.div>
                                <motion.div className="pointer-events-none w-full" initial={{translateY: 10, opacity: 0}} animate={{translateY: 0, opacity: 1}} transition={{duration: 0.2, delay: 0.6}}>
                                    
                                </motion.div>
                                
                                <motion.div className="pointer-events-none w-full" initial={{translateY: 10, opacity: 0}} animate={{translateY: 0, opacity: 1}} transition={{duration: 0.2, delay: 0.7}}>
                                    
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </motion.div>}</AnimatePresence>
            </nav>
        ) 
    }
    else
    {
        return (
            <nav className="z-40 flex flex-col gap-2 m-auto max-w-[1200px] text-base leading-normal transition-all">
                <div className="flex justify-between items-center">
                    <div>
                        <Logo></Logo>
                    </div>
                    <div>
                        <ul className="flex items-center gap-2">
                            <motion.li className="flex items-center justify-center" whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} transition={{duration: 0.2, type: "spring", bounce: 0.6}}>
                                <a href="https://www.linkedin.com/in/rafael-antoniassi-vicechio-812a40149/" target="_blank" aria-label="Linkedin">
                                    <FaLinkedin className="text-2xl text-gray-300" ></FaLinkedin>
                                </a>
                            </motion.li>
                            <motion.li className="flex items-center justify-center" whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} transition={{duration: 0.2, type: "spring", bounce: 0.6}}>
                                <a  href="https://github.com/soustern" target="_blank" aria-label="Github">
                                    <FaGithub className="text-2xl text-gray-300"></FaGithub>
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
                                <li>
                                    <motion.button whileHover={"hover"} onClick={() => navigate(`0%`)} className="cursor-pointer">
                                        <TextStandard importance={scrollProgress <= 15 ? "important" : "metadata"} text={`${strings.sections.Hero()}`}></TextStandard>
                                    </motion.button>
                                </li>
                                <li>
                                    <button onClick={() => navigate(`20%`)} className="cursor-pointer">
                                        <TextStandard importance={scrollProgress >= 20 ? "important" : "metadata"} text={`${strings.sections.Projects()}`}></TextStandard>
                                    </button>
                                </li>
                                <li><TextStandard importance="metadata" text={`${strings.sections.About()}`}></TextStandard></li>
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