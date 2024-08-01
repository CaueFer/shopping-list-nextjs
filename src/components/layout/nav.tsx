import { ReactNode } from "react";

interface NavProps{
  title: string,
  children?: ReactNode,
}

export function Nav({title}: NavProps) {
  return (
    <header className="px-6 py-4 bg-white w-full h-16 text-black flex items-center justify-between">
      <div className="flex flex-col items-center justify-center">
        <span className="text-md">{title}</span>
      </div>

    </header>
  );
}
