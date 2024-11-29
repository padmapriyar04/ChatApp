"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { IoMdChatbubbles } from "react-icons/io";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import NavLink from "./NavLink";

export default function TopNavbar() {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand>
        <IoMdChatbubbles size={40} className="text-white" />
        <div>
          <h1 className="text-3xl font-bold text-white">ChitChat</h1>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/matches" label="Matches" />
        <NavLink label="Lists" href="/lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          variant="bordered"
          className="text-white"
          as={Link}
          href="/auth/login"
        >
          Login
        </Button>
        <Button
          variant="bordered"
          className="text-white"
          as={Link}
          href="/auth/register"
        >
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
