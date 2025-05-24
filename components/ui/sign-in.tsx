"use client";
import { Button } from "./button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Button onClick={() => signIn()} size="sm" variant="outline">
      Sign in
    </Button>
  );
}
