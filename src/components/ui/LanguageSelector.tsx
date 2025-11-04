import {  motion } from "motion/react";
import type { JSX } from "react";
import BorderButton from "./BorderButton";
import { useLanguage } from "../contexts/LanguageContext";

interface languageSelectorProps {
    className?: string;
}

function LanguageSelector({className}: languageSelectorProps): JSX.Element {
    const {language, changeLanguage} = useLanguage();

    return (
        <motion.div className="flex gap-2"  initial={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <BorderButton className={className} onClick={() => changeLanguage(`En`)} active={language === `En`} text="En"></BorderButton>
            <BorderButton className={className} onClick={() => changeLanguage(`Pt-Br`)} active={language === `Pt-Br`} text="Pt-Br"></BorderButton>
        </motion.div>
    )
}

export default LanguageSelector;
