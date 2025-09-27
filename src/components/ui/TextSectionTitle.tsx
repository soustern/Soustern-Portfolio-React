import type { JSX } from "react";

interface TextSectionTitleProps {
    text: string;
}

const TextSectionTitle = ({text}: TextSectionTitleProps): JSX.Element => {
    return (
        <h2 className={`text-gray-200 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight`}>{text}</h2>
    );
}

export default TextSectionTitle