import Link from "next/link";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const EditProfileButton = ({showWarning: showWarning = false }) => {
  return (
    <Link
      href="/account"
      passHref
      className={cn(
        "cursor-pointer relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:[&_svg:not([class*='text-'])]:text-slate-400",
        showWarning
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 font-semibold"
          : "focus:bg-slate-100 dark:focus:bg-slate-800"
      )}
    >
      <Settings />
      Editar Perfil
      {showWarning && (
        <span className="ml-auto text-xs font-semibold">¡Completa tu perfil!</span>
      )}
    </Link>
  );
};