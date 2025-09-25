import type { JSX } from "react";

interface TextCardTitleProps {
    text: string;
}

const TextCardTitle = ({text}: TextCardTitleProps): JSX.Element => {
    return (
        <h3 className={` text-gray-400 text-2xl sm:text-3xl font-medium leading-tight tracking-tight`}>{text}</h3>
    )
}

export default TextCardTitle;