import type { JSX } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import Logo from "../components/ui/Logo";

function NavBar(): JSX.Element  {
    return (
        <>
            <nav className="w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <Logo></Logo>
                    </div>
                    <div>
                        <ul className="flex gap-5 items-center">
                            <li>
                                <a href="">
                                    <PrimaryIcon icon={"linkedin-in"}></PrimaryIcon>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <PrimaryIcon icon={"github"}></PrimaryIcon>
                                </a>
                            </li>
                            <li>
                                <PrimaryButton text={"Get in touch"}></PrimaryButton>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="h-[1px] bg-black rounded-full"></div>
            </nav>
        </>
    )
}

export default NavBar;