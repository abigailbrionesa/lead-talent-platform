"use client";
import { Button } from "./button";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Button onClick={() => signOut()} size="sm" variant="outline">
      Sign out
    </Button>
  );
}
