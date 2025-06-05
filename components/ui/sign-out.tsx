"use client";

import { Button } from "./button";
import { createClient } from "@/utils/supabase/client"; 
export default function SignOut() {
  const supabase = createClient();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  };
  return (
    <Button onClick={handleSignOut} size="sm" variant="ghost">
      Cerrar Sesión
    </Button>
  );
}
