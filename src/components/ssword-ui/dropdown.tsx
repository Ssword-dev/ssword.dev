import React, { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextProps<
  T extends object = object,
  D extends keyof T = keyof T,
> {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  selected?: T;
  discriminator?: D;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

export function useDropdown<
  T extends object,
  D extends keyof T,
>(): DropdownContextProps<T, D> {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context as unknown as DropdownContextProps<T, D>;
}

interface DropdownProviderProps {
  children: ReactNode;
}

export const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </DropdownContext.Provider>
  );
};
