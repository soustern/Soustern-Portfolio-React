import type { JSX } from "react";

interface TextSectionTitleProps {
    text: string;
}

const TextSectionTitle = ({text}: TextSectionTitleProps): JSX.Element => {
    return (
        <h2 className={`text-gray-300 text-xl font-semibold leading-tight tracking-tight`}>{text}</h2>
    );
}

export default TextSectionTitle