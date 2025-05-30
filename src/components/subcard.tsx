import React, { PropsWithChildren, ReactNode } from "react";
interface SubcardProps {
  children: [ReactNode, ReactNode];
}
export default function Subcard({ children }: SubcardProps) {
  const [title, body] = children;
  return (
    <>
      <div className="scrollbar:hidden scroll:disable-x bg-secondary mt-6 flex max-h-screen max-w-1/2 min-w-[280px] flex-col items-center justify-center overflow-x-hidden overflow-y-scroll scroll-auto rounded-xl p-8 shadow-lg duration-200 hover:scale-110 hover:transition-all lg:mt-0 lg:ml-6">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <div className="text-secondary">{body}</div>
      </div>
    </>
  );
}

export type { SubcardProps };
