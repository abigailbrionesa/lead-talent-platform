import DataTableWrapper from "../components/sections/tablewrapper";
import NavbarServer from "@/components/global/navbar-server";
import LandingSection from "@/components/sections/landing";
import AuthInfo from "@/components/shared/auth-info";
export default function Home() {
  const title= "LEAD"
  const words = title.split(" ")
  return (
    <div>
      <NavbarServer />
      <LandingSection />
      <AuthInfo/>

    </div>
  );
}