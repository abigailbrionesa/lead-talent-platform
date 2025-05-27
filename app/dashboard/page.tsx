import NavbarServer from "@/components/global/navbar-server";
import AuthWrapper from "@/components/shared/auth-info"; 
import DataTableWrapper from "@/components/sections/tablewrapper";
export default function DashboardPage() {
  return (
    <div>
      <NavbarServer />
      <div className="h-20" />
      <DataTableWrapper />
      <AuthWrapper />
    </div>
  );
}