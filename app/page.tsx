import DataTableWrapper from "../components/sections/tablewrapper";
import { Navbar } from "@/components/global/navbar";
export default async function Home() {
  return (
    <div>
      <Navbar />
      <div className="h-20"> </div>

        <DataTableWrapper />

    </div>
  );
}
