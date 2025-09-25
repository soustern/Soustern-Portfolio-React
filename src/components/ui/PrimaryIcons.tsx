import type { JSX } from "react";

interface PrimaryIconProps {
    icon: string;
}

function PrimaryIcon({ icon }: PrimaryIconProps): JSX.Element {
    return (
        <>
            <i className={`fa-brands fa-${icon} text-xl text-gray-50`}></i>
        </>
    );
}

export default PrimaryIcon