import NavbarServer from "@/components/global/navbar-server";
import AuthWrapper from "@/components/shared/auth-info"; 
import DataTableWrapper from "@/components/sections/tablewrapper";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  if (session.user.role !== "RECRUITER") {
    return <div>You do not have access to this database</div>;
  }

  return (
    <div>
      <NavbarServer />
      <div className="h-20" />
      <DataTableWrapper />
    </div>
  );
}
