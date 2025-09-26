import { motion, type Variants } from "motion/react";
import { forwardRef, type JSX } from "react";

interface TextStandardProps {
    text: string;
    importance?: `important` | `supporting` | `metadata` | `blank`;
    className?: string;
    variants?: Variants;
}

const TextStandard = forwardRef<HTMLParagraphElement, TextStandardProps>(({text, importance, className, variants}, ref: React.Ref<HTMLParagraphElement>): JSX.Element => {
    const getImportanceStyle = () => {
        switch(importance) {
            case `important`:
                return `text-base font-medium text-[#f9fafb]`;
            case `supporting`:
                return `text-base font-normal text-gray-400`;
            case `metadata`:
                return `text-base font-normal text-[#6a7282]`;
            case `blank`:
                return `text-base font-normal text-inherit`;
            default:
                return `text-base font-normal text-gray-200`;
        }
    }
    
    return (
        <motion.p variants={variants} className={`${getImportanceStyle()} text-base leading-relaxed max-w-prose ${className}`} ref={ref}>{text}</motion.p>
    )
});

export default TextStandard