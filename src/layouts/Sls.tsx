import { LiaTimesSolid } from 'react-icons/lia';
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SlsHero from "../assets/images/sls/slsHero.webp";
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../components/contexts/LanguageContext';
import { useProject } from '../components/contexts/ProjectContext';
import TextStandard from '../components/ui/TextStandard';
import sls from "../services/Sls.json";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface SlsProps {
    fontsReady: boolean;
}

const Sls = ({fontsReady}: SlsProps) => {
    const { language } = useLanguage();
    const {changeProject} = useProject();
    const buttonNavDesktopRef = useRef<HTMLButtonElement>(null);

    const strings = language === "En" ? sls.En : sls["Pt-Br"];

    const scrollerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const SlsHeroRef = useRef<HTMLImageElement>(null);
    const SlsOverview = useRef<HTMLDivElement>(null);
    const SlsContext = useRef<HTMLDivElement>(null);
    const SlsHighlights = useRef<HTMLDivElement>(null);
    const SlsProblem = useRef<HTMLDivElement>(null);
    const SlsArchitecture = useRef<HTMLDivElement>(null);
    const SlsMemory = useRef<HTMLDivElement>(null);
    const SlsStructures= useRef<HTMLDivElement>(null);
    const SlsSnippets = useRef<HTMLDivElement>(null);
    const SlsRetrospective = useRef<HTMLDivElement>(null);

    const firstSnippetString = 
                        `// From: functions.h

typedef struct employee
{
    char name[MAXMAXSIZE];
    char role[MAXMAXSIZE];
    char salary[MAXSIZE];
    char admission[MAXSIZE];
    struct employee *next;
    struct employee *previous;
} employee;`;   

    const secondSnippetString = 
                        `// From: functions_admin.c (load_employee_databases)

// Index variable receives the value returned by the hash func
index = hash_index(node->name);

// Check if table_employee[index] pointer is pointing to NULL
if (table_employee[index] == NULL)
{
    node->next = NULL;
    table_employee[index] = node;
    continue;
}

// If not NULL, insert node at the head of the list
node->next = table_employee[index];
table_employee[index] = node;`;   

    const thirdSnippetString = 
                        `// From: functions_admin.c (unload_employee_databases)

bool unload_employee_databases()
{
    employee *cursor = NULL;

    for (int i = 0; i < MINTABLESIZE; i++)
    {
        // Navigate and free each node in the linked list
        while (table_employee[i] != NULL)
        {
            cursor = table_employee[i]->next;
            free(table_employee[i]);
            table_employee[i] = cursor;
        }
    }
    return true;
}`;  

    const codeArchitecture = 
                        `// From: functions.h

// Structs define the data models, used across all modules.
typedef struct employee
{
    char name[MAXMAXSIZE];
    char role[MAXMAXSIZE];
    char salary[MAXSIZE];
    char admission[MAXSIZE];
    struct employee *next;
    struct employee *previous;
} employee;

// Prototypes for functions in different modules.
// Admin-only function:
void signup_employee();

// Limited-user function:
void menu_limited();

// General utility function:
bool load_employee_databases();`; 

    const dataStructuresFirst = 
                        `// From: functions_general.c
                        
// Simple hashing algorithm to determine the table index for a given string.
int hash_index(char *subject)
{
    int index = 0;

    for (int i = 0; subject[i] != '\0'; i++)
    {
        index += tolower(subject[i]);
    }

    return index % MINTABLESIZE;
}`

    const dataStructuresSecond = 
                        `// From: functions_admin.c (load_employee_databases)

while (fgets(buffer, MAXMAXSIZE, data))
{
    node = malloc(sizeof(employee));

    // ... (data is read from file into the node's fields) ...
    index = hash_index(node->name);

    if (table_employee[index] == NULL) {
        node->next = NULL;
        table_employee[index] = node;
    } else {
        node->next = table_employee[index];
        table_employee[index] = node;
    }
}`  

    const memoryManagementFirst = 
                        `// From: functions_admin.c (signup_employee)

// Allocating memory for each field before populating it.
void signup_employee()
{
    createemployee storage;
    storage.name = (char *)malloc(MAXMAXSIZE);
    if (storage.name == NULL) { /* handle error */ }

    storage.role = (char *)malloc(MAXMAXSIZE);
    if (storage.role == NULL) { /* handle error */ }
    
    // ... code to get user input ...
}` 

    const memoryManagementSecond = 
                        `// From: functions_admin.c (unload_employee_databases)

bool unload_employee_databases()
{
    employee *cursor = NULL;

    for (int i = 0; i < MINTABLESIZE; i++)
    {
        // Set the current head of the list as the starting point.
        employee *current = table_employee[i];
        while (current != NULL)
    {

    // Save the next node before freeing the current one.
    cursor = current->next;
    free(current);
    current = cursor;
    }
        // Mark the table index as empty.
        table_employee[i] = NULL;
    }

    return true;
}`  

    
    useGSAP(() => {
        if (!fontsReady) return;

        const refs = [SlsHighlights, SlsProblem, SlsArchitecture, SlsMemory, SlsStructures, SlsSnippets, SlsRetrospective,];
        
        if (!sectionRef.current || !scrollerRef.current || !SlsHeroRef.current || !SlsOverview.current || !SlsContext.current) return;
        if (refs.some(ref => !ref)) return;

        gsap.from(SlsHeroRef.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(SlsOverview.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(SlsContext.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        const initAnimation = () => {
            refs.forEach(ref => {
                gsap.from(ref.current, {
                    x: -100, 
                    opacity: 0, 
                    duration: 0.3, 
                    ease: "power4.inOut", 
                    scrollTrigger:{
                        trigger: ref.current,
                        scroller: scrollerRef.current,
                        start: "top 85%",
                        once: true,
                    }
                });
            })
        }

        // This is necessary to make the full layout after rendering be taken into consideration when calculating the ScrollTrigger
        const initTimeout = setTimeout(initAnimation, 50);
        
        return () => {
            clearTimeout(initTimeout);
        }

    }, {dependencies: [fontsReady]});

    useEffect(() => {
        const button = buttonNavDesktopRef.current;
        if (!button) return;

        const handleChangeProject = () => {
            changeProject(null);
        }
        button.addEventListener("click", handleChangeProject)

        return () => {
            button.removeEventListener("click", handleChangeProject)
        }
    }, )
    
    // TODO: Add default padding to this sections
    // TODO: Add media queries to texts
    // TODO: Change alt values

    return (
    <AnimatePresence>
        <motion.div key="dnd-monster-codex" id="dnd-monster-codex"  exit={{opacity: 0}} transition={{ duration: 0.2 }} initial={{opacity: 0}} animate={{opacity: 1}} className="px-8 py-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] w-full h-full max-w-[1200px] z-70 rounded-xl border-[1px] border-gray-700 shadow-black/20 shadow-xl flex flex-col gap-4">
            <nav className="flex justify-between items-center text-gray-50 text-3xl ">
                <h3>SLS</h3>
                <motion.button ref={buttonNavDesktopRef} whileTap={{scale: 0.8}} transition={{duration: 0.2, type: "spring"}} aria-controls="Close Project" className="cursor-pointer p-1 rounded-xl border-[1px] border-gray-700 hover:bg-gray-50/5 transition-colors" aria-label="Close Button"><LiaTimesSolid className="text-[30px] text-gray-300"></LiaTimesSolid></motion.button>
            </nav>
            <div className="flex gap-8 overflow-hidden">
                <div ref={scrollerRef} className="overflow-y-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-400/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/60">
                    <div ref={sectionRef} className='flex flex-col gap-12'>
                        <div>
                            <img alt={language === "en" ? "sls Hero Image" : "Imagem de apresentação da sls"} title={language === "en" ? "sls Hero Image" : "Imagem de apresentação da sls"} ref={SlsHeroRef} fetchPriority='high' src={SlsHero} className="rounded-xl border-[1px] border-gray-700" />
                        </div>
                        <section ref={SlsOverview} className=' scroll-mt-50 flex flex-col gap-4' id='Overview'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.title}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.overview}></TextStandard>
                            <div className='flex gap-8'>
                                <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://github.com/soustern/Simple-Logistical-System" target="_blank"  rel="noopener noreferrer">Github Repo</a>
                                <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://www.youtube.com/watch?v=pSxkruwjchE" target="_blank" rel="noopener noreferrer">{language === "En" ? "Live Demo" : "Demonstração"}</a>
                            </div>
                        </section>
                        <section ref={SlsContext} className=' scroll-mt-50 flex flex-col gap-4' id='Context'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.contextTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextProject}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextRole}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextTimeline}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextFocus}></TextStandard></li>
                            </ul>
                        </section>
                        <section ref={SlsHighlights} className=' scroll-mt-50 flex flex-col gap-4' id='Highlights'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlightsTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight1Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight1Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight2Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight2Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight3Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight3Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight4Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight4Desc}></TextStandard>
                            </div>
                        </section>
                        <section ref={SlsProblem} className=' scroll-mt-50 flex flex-col gap-4' id='Problems'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.problemTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.problemDesc}></TextStandard>
                        </section>
                        <section ref={SlsArchitecture} className=' scroll-mt-50 flex flex-col gap-4' id='Architecture'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.architectureTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.architectureDesc}></TextStandard>
                            <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                {codeArchitecture}
                            </SyntaxHighlighter>
                        </section>
                        <section ref={SlsMemory} className=' scroll-mt-50 flex flex-col gap-4' id='Memory'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.memoryTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.memoryDesc}></TextStandard>
                            <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                {memoryManagementFirst}
                            </SyntaxHighlighter>
                            <TextStandard className='text-lg' text={strings.caseStudy.memoryDesc2}></TextStandard>
                            <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                {memoryManagementSecond}
                            </SyntaxHighlighter>
                        </section>
                        <section ref={SlsStructures} className=' scroll-mt-50 flex flex-col gap-4' id='Structures'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.structuresTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.structuresDesc}></TextStandard>
                            <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                {dataStructuresFirst}
                            </SyntaxHighlighter>
                            <TextStandard className='text-lg' text={strings.caseStudy.structuresDesc2}></TextStandard>
                            <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                {dataStructuresSecond}
                            </SyntaxHighlighter>
                        </section>
                        <section ref={SlsSnippets} className=' scroll-mt-50 flex flex-col gap-4' id='Snippets'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.snippetsTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.snippet1Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.snippet1Desc}></TextStandard>
                                <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                    {firstSnippetString}
                                </SyntaxHighlighter>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.snippet2Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.snippet2Desc}></TextStandard>
                                <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                    {secondSnippetString}
                                </SyntaxHighlighter>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.snippet3Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.snippet3Desc}></TextStandard>
                                <SyntaxHighlighter language="c" showLineNumbers={true} style={stackoverflowDark}>
                                    {thirdSnippetString}
                                </SyntaxHighlighter>
                            </div>
                        </section>
                        <section ref={SlsRetrospective} className=' scroll-mt-50 flex flex-col gap-4' id='Retrospective'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.retrospectiveTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc}></TextStandard>
                            <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveLearning}></TextStandard>
                        </section>
                    </div>
                </div>
                <aside className="hidden md:block">
                        <ul className="flex flex-col gap-8">
                            <TextStandard text="CONTENTS"></TextStandard>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Overview");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Overview" : "Visão geral"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Context");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Context" : "Contexto"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Highlights");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Highlights" : "Destaques"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Problems");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "The Problem" : "O Problema"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Architecture");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Architecture" : "Arquitetura"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Memory");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Memory" : "Memória"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Structures");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Structures" : "Struturas"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Snippets");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Snippets" : "Código"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Retrospective");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Retrospective" : "Retrospectiva"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                        </ul>
                </aside>
            </div>
        </motion.div>
    </AnimatePresence>)
}

export default Sls;