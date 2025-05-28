import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface LoginFormProps extends React.ComponentProps<"form"> {
  error?: string | null;
}

export function LoginForm({ className, error, ...props }: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>

      {/* 
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
            {error === "CredentialsSignin"
              ? "Invalid email or password"
              : "Login failed"}
          </div>
        )}

        <p className="text-slate-500 text-sm text-balance mb-4 dark:text-slate-400">
          Enter your email below to login to your account
        </p>

        <form
          className="space-y-6 w-full"
          {...props}
          action={async (formData) => {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirect: true,
              redirectTo: "/",
            });
          }}
        >
          <div className="grid gap-3 ">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input name="password" id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>*/}

      <div className="grid gap-6">
        {/* <div className="after:border-slate-200 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t dark:after:border-slate-800">
          <span className=" text-slate-500 relative z-10 px-2 ">
            Or continue with
          </span>
        </div>*/}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await signIn("google", { redirect: true, callbackUrl: "/" });
            } catch (error) {
              console.error("Google sign-in failed:", error);
            }
          }}
        >
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
      </div>
      
      {/* 
      <div className="text-center text-sm">
        Don&apos;t have an account? {""}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </div>*/}
    </div>
  );
}
