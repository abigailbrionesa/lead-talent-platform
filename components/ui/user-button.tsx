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
import SignIn from "./sign-in";
import { EditProfileButton } from "./edit-profile-button";
import {
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import { Button } from "./button";
import { signOut } from "next-auth/react";

import { Tooltip,TooltipTrigger,TooltipContent } from "./tooltip";
import { AlertCircle } from "lucide-react";
import type { User as UserType } from "@prisma/client";

export default function UserButton({ user }: { user: UserType |  undefined }) {
  if (!user) return <SignIn />;
  const fallbackText = "CN";
  const showWarning = !user.isProfileComplete;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant={"ghost"} className="gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "User avatar"}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <AvatarFallback className="rounded-lg">{fallbackText}</AvatarFallback>
          </Avatar>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.role}</span>
          </div>
          {showWarning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="ml-1 size-4 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent>
                <span>Tu perfil está incompleto</span>
              </TooltipContent>
            </Tooltip>
          )}
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
        <DropdownMenuGroup>
          <EditProfileButton showWarning={true} />

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