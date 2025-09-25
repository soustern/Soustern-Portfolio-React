import type { JSX, ReactNode } from "react";

interface BackgroundProps {
  BackgroundColor: string;
  children: ReactNode;
};

const Background = ({BackgroundColor, children}: BackgroundProps): JSX.Element => {
  return (
    <>
    <div className={`${BackgroundColor} w-screen h-screen`}>
        {children}
    </div>
    </>
  );
};

export default Background;
