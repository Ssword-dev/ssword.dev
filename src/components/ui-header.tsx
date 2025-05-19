"use client";
import { useState } from "react";
import Navbar, { NavLink } from "./navbar";

export default function Header() {
  const [items, _] = useState<NavLink[]>(() => [
    {
      route: true,
      contents: "Home",
      href: "/",
    },
    {
      route: true,
      contents: "Portfolio",
      href: "/portfolio",
    },
    {
      route: true,
      contents: "Published",
      href: "/packages",
    },
    {
      route: true,
      contents: "Projects",
      href: "/projects",
    },
    {
      route: false,
      contents: "Github",
      href: "https://github.com/Ssword-dev",
    },
  ]);
  return (
    <>
      <Navbar items={items} siteName="ssword.dev" />
    </>
  );
}
