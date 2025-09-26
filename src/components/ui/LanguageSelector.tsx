import { AnimatePresence, motion } from "motion/react";
import type { JSX } from "react";
import BorderButton from "./BorderButton";
import { useLanguage } from "../contexts/LanguageContext";

function LanguageSelector(): JSX.Element {
    const {language, changeLanguage} = useLanguage();

    return (
        <AnimatePresence>
            <motion.div className="flex gap-1"  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                <BorderButton onClick={() => changeLanguage(`En`)} active={language === `En`} text="En"></BorderButton>
                <BorderButton onClick={() => changeLanguage(`Pt-Br`)} active={language === `Pt-Br`} text="Pt-Br"></BorderButton>
            </motion.div>
        </AnimatePresence>
    )
}

export default LanguageSelector;
