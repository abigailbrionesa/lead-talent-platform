import NavbarServer from "@/components/global/navbar-server";
import AuthWrapper from "@/components/shared/auth-info"; 
import LandingSection from "@/components/sections/landing";

export default function AccountPage() {
  return (
    <div>
      <NavbarServer />
      <div className="h-20" />
      <AuthWrapper />
    </div>
  );
}