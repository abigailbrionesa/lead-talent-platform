"use client";
import { Button } from "./button";
import { createClient } from "@/utils/supabase/client";

export default function SignIn() {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <Button onClick={handleSignIn} size="sm" variant="outline">
      Sign in
    </Button>
  );
}
