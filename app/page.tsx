import DataTableWrapper from "../components/sections/tablewrapper";
import NavbarServer from "@/components/global/navbar-server";
import AuthWrapper from "@/components/shared/auth-info"; 

export default function Home() {
  return (
    <div>
      <NavbarServer />
      <div className="h-20" />
      <DataTableWrapper />
      <AuthWrapper />
    </div>
  );
}