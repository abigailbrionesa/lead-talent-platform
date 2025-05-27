"use client";
import { Github, Menu, User } from "lucide-react";
import React, { useState } from "react";
import UserButton from "../ui/user-button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import type { Session } from "next-auth";
import { NavUser } from "../ui/nav-user";
interface RouteProps {
  href: string;
  label: string;
}

export const Navbar = ({ session }: { session: Session | null }) => {
  const routeList: RouteProps[] = [
    { href: "https://forms.gle/BfxhPoF24UtPqnJH9", label: "Formulario" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="shadow-inner 
    mx-auto border border-secondary fixed w-full
    z-40 flex justify-between items-center p-2 px-5"
    >
      <Link href="/" className="font-bold text-lg flex items-center mr-5">
        <Image
          src="/images/logo.jpeg"
          alt="logo"
          width={100}
          height={100}
          className="h-auto mr-4 w-auto max-w-10"
        />
        LEAD
      </Link>

      <NavigationMenu className="hidden lg:block mr-auto ">
        <NavigationMenuList className="flex">
          <NavigationMenuItem className="flex">
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} target="_blank" className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/images/logo.jpeg"
                      alt="logo"
                      width={100}
                      height={100}
                      className="h-auto mr-4 w-auto max-w-10"
                    />
                    LEAD
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start gap-4">
              <Separator className="mb-2" />
              <div className="flex flex-col w-full gap-2">
                <ToggleTheme />

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  aria-label="View on GitHub"
                  className="w-full justify-start"
                >
                  <Link
                    href="https://github.com/abigailbrionesa"
                    target="_blank"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="size-5 mr-2" />
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex space-x-3">
        <ToggleTheme />

        <Button asChild size="sm" variant="outline" aria-label="View on GitHub">
          <Link href="https://github.com/abigailbrionesa" target="_blank">
            <Github className="size-5" />
          </Link>
        </Button>

        <UserButton user={session?.user} />
        
      </div>
    </header>
  );
};
