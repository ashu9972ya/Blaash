"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { LogIn, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";


const Header = ( ) => {
  const { data: session } = useSession();
  return (
    <div className="p-4 bg-[#27272F] flex flex-wrap items-center justify-between">
      {/* Brand Title */}
      <div className="text-white font-rubik font-bold text-lg sm:text-xl">
        Design Studio
      </div>

      {/* Right Side */}
      <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
        {/* Support Request Button */}
        <Button
          variant="default"
          className="flex items-center gap-2 rounded-lg border border-[#017EFA] px-4 py-2 text-sm"
        >
          <Image
            src="/contact_support.svg"
            alt="Support"
            width={20}
            height={20}
          />
          <span className="hidden sm:block">Support Request</span>
        </Button>

        {/* Product Tour Button */}
        <Button
          variant="default"
          className="flex items-center gap-2 rounded-lg border border-[#017EFA] px-4 py-2 text-sm"
        >
          <Image
            src="/image 19 (Traced).svg"
            alt="Tour"
            width={20}
            height={20}
          />
          <span className="hidden sm:block">Product Tour</span>
        </Button>

        {/* Search Input */}
        <div className="flex-1 max-w-[200px] sm:max-w-[300px]">
          <Input
            placeholder="Search Project ..."
            className="text-sm"
            defaultValue={"hello"}
          />
        </div>

        {/* Icon Section */}
        <div className="flex items-center justify-center border border-[#484851] rounded-lg p-2">
          <Image src="/Group 14.svg" alt="Icon" width={24} height={24} />
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-2">
          <Avatar className="flex-shrink-0">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="text-sm font-semibold">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-rubik font-semibold text-white hidden sm:block">
            {session?.user.name}
          </div>
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src="/Frame 36.svg"
                  alt="Dropdown"
                  width={18}
                  height={12}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>{session?.user?.name}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {session ? (
                    <div
                      onClick={() => signOut()}
                      className="flex items-center gap-2"
                    >
                      <LogOut />
                      <span>Log out</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2"
                      onClick={() => signIn("google")}
                    >
                      <LogIn />
                      <span>Google</span>{" "}
                    </div>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
