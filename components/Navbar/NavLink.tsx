"use client";

import { NavbarItem } from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import React from "react";
import { Link } from "@nextui-org/link";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
}
