import type { JSX } from "react";
import { motion, type Variants } from "motion/react"

interface PrimaryIconProps {
    icon: string;
    iconType: string;
    className?: string;
    variants?: Variants;
    color?: string;
}

function PrimaryIcon({ iconType, icon, className, variants, color }: PrimaryIconProps): JSX.Element {
    return (
        <>
            <motion.i variants={variants} className={`fa-${iconType} fa-${icon} ${color ? color : 'text-[#f9fafb]' } ${className}`}></motion.i>
        </>
    );
}

export default PrimaryIcon