import type { JSX } from "react";

interface TextHeadlineProps {
    text: string;
}

const TextHeadline = ({ text }: TextHeadlineProps): JSX.Element => {
    return (
        <h1 className={`text-gray-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-prose`}>{text}</h1>
    );
}

export default TextHeadline