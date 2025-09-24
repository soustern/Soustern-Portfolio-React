import type { JSX } from "react";

interface PrimaryIconProps {
    icon: string;
}

function PrimaryIcon({ icon }: PrimaryIconProps): JSX.Element {
    return (
        <>
            <i className={`fa-brands fa-${icon} text-xl`}></i>
        </>
    );
}

export default PrimaryIcon