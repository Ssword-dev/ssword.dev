import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ThemeSelect } from "./theme-select";

interface NavLink {
  route?: boolean;
  href: string;
  contents: string;
}

const NavItem: React.FC<NavLink> = ({ href, contents, route = true }) => {
  const className =
    "w-fit px-3 py-2 rounded transition-colors duration-200 " +
    "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800";
  if (route) {
    return (
      <a href={href} className={className}>
        {contents}
      </a>
    );
  }

  return (
    <Link prefetch href={href} className={className}>
      {contents}
    </Link>
  );
};

interface NavbarProps {
  items: NavLink[];
  siteName: string;
  siteIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Navitems: React.FC<NavbarProps> = (props) => {
  const router = useRouter();
  const currentRoute = usePathname();
  const routes = props.items.filter((link) => link.route);
  const links = props.items.filter((link) => !link.route);
  const defaultOption = useMemo(() => {
    return routes.filter((link) => link.href === currentRoute)[0]?.contents;
  }, [currentRoute, routes]);
  if (props.items.length > 3) {
    return (
      <>
        {" "}
        <select
          name="nav-link-selection"
          defaultValue={defaultOption}
          className="bg-primary text-primary rounded px-3 py-2"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const selectedItem = props.items.find(
              (item) => item.contents === e.target.value && item.route,
            );
            if (selectedItem) {
              if (selectedItem.route) {
                router.push(selectedItem.href);
              } else {
                window.location.href = selectedItem.href;
              }
            }
          }}
        >
          <optgroup label="Routes">
            {routes.map((val, idx) => (
              <option value={val.contents} key={idx}>
                {val.contents}
              </option>
            ))}
          </optgroup>
          <optgroup label="Links">
            {links.map((val, idx) => (
              <option value={val.contents} key={idx}>
                {val.contents}
              </option>
            ))}
          </optgroup>
        </select>
      </>
    );
  }
  return (
    <ul className="flex space-x-6">
      {props.items.map((val, idx) => (
        <li key={idx}>
          <NavItem {...val} />
        </li>
      ))}
    </ul>
  );
};
const Navbar: React.FC<NavbarProps> = (props) => {
  const Icon = props.siteIcon;
  return (
    <nav className="thematic glass sticky top-0 z-[1000] flex w-full items-center justify-between px-6 py-4">
      <div className="text-invert text-tertiary flex items-center gap-2 text-xl font-bold">
        <Icon className="text-secondary" />
        {props.siteName}
      </div>
      <Navitems {...props} />
      {/** Tertiary are less likely to conflict with the ui */}
    </nav>
  );
};

export default Navbar;
export type { NavbarProps, NavLink };
