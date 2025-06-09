import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/global/navbar";

export default async function NavbarServer() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <Navbar user={null} />;
  }

  const { data: user_profile_data } = await supabase
    .from("profiles")
    .select("role, profile_picture, full_name, email")
    .eq("id", user.id)
    .single();

  console.log(user_profile_data, "user profile data");
   
  return (
    <Navbar user={user_profile_data} />
  );
}
