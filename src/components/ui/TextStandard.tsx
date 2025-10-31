import { motion, type Variants } from "motion/react";
import { forwardRef, type JSX, type ReactNode } from "react";

interface TextStandardProps {
    text?: string;
    importance?: `important` | `supporting` | `metadata` | `blank`;
    className?: string;
    variants?: Variants;
    children?: ReactNode;
    color?: string  
}

const TextStandard = forwardRef<HTMLParagraphElement, TextStandardProps>(({color,text, importance, className, variants, children}, ref: React.Ref<HTMLParagraphElement>): JSX.Element => {
    const getImportanceStyle = () => {
        switch(importance) {
            case `important`:
                return `text-base font-medium text-[#f9fafb]`;
            case `supporting`:
                return `text-base font-normal text-gray-500`;
            case `metadata`:
                return `text-base font-normal text-[#6a7282]`;
            case `blank`:
                return `text-base font-normal text-inherit`;
            default:
                return `text-base font-normal text-gray-400`;
        }
    }
    
    return (
        <motion.p variants={variants} className={`${getImportanceStyle()} text-base leading-relaxed ${className} ${color}`} ref={ref}>{text}{children}</motion.p>
    )
});

export default TextStandard