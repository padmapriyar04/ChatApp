"use client";
import { signOutUser } from "@/actions/authactions";
import { signOut } from "@/auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  user: User;
};

function UserMenu({ user }: Props) {
  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            color="secondary"
            className="transition-transform"
            name={user.name || "User"}
            size="sm"
            src={user.image || "/images/user.png"}
          />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="User menu">
          <DropdownSection showDivider>
            <DropdownItem
              key={user.id}
              isReadOnly
              as={"span"}
              className="h-14 flex flex-row text-center"
              aria-label="User name"
            >
              Signed in as <strong>{user?.name}</strong>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem className="text-center" key={user.id} as={Link} href="/members/edit">
            Edit profile
          </DropdownItem>
          <DropdownItem
            as="button"
            color="danger"
            key="sign-out"
            onPress={() => {
              signOutUser();
            }}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default UserMenu;
