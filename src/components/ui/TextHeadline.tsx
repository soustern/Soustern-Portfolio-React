import { forwardRef, type JSX, type ReactNode } from "react";

interface TextHeadlineProps {
    text?: string;
    children?: ReactNode;
    className?: string;
}

const TextHeadline = forwardRef<HTMLParagraphElement, TextHeadlineProps>(({ text, children, className }, ref: React.Ref<HTMLParagraphElement>): JSX.Element => {
    return (
        <h1 ref={ref} className={`text-gray-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-prose ${className}`}>{text}{children}</h1>
    );
});

export default TextHeadline