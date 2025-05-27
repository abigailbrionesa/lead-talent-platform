import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./dropdown-menu";
import Link from "next/link";
import SignIn from "./sign-in";
import type { User } from "next-auth";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "./button";
import SignOut from "./sign-out";
import { signOut } from "next-auth/react";

export default function UserButton({ user }: { user: User | undefined }) {
  if (!user) return <SignIn />;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant={"ghost"} className="">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image ?? "/placeholder.svg"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.role}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg bg-background"
        side={"bottom"}
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.image ?? "/placeholder.svg"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            href="/account"
            passHref
            className="cursor-pointer
          
          focus:bg-slate-100 focus:text-slate-900 
          
          
        relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none  [&_svg]:pointer-events-none [&_svg]:shrink-0
         [&_svg:not([class*='size-'])]:size-4 dark:focus:bg-slate-800 dark:focus:text-slate-50
         [&_svg:not([class*='text-'])]:text-slate-500 
       dark:[&_svg:not([class*='text-'])]:text-slate-400"
          >
            <Settings /> Editar Perfil
          </Link>

          <DropdownMenuItem>
            <Bell />
            Notificaciones
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
