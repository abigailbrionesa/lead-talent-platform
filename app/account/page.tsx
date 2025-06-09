import AccountForm from "./account-form";
import { Navbar } from "@/components/global/navbar";
import { createClient } from "@/utils/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {} = await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email, full_name: user.user_metadata.full_name, profile_picture: user.user_metadata.picture }, { onConflict: "id" });

  const {
    data: user_profile_data,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const {
    data: user_member_data, //can be null
  } = await supabase
    .from("member_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  
  const {
    data: user_recruiter_data, //can be null
  } = await supabase
    .from("recruiter_profiles")
    .select("*")
    .eq("id", user.id)
    .single();  

    //user_profile_data is created with all the roles minus "role" when ser registers
    //in this function "ROLE" and "PROFILE_PICTURE" of user_profile_data can be null

    //if role is null, you should just pass user_profile_data
    //if role is not null, you should pass that joined o user profile_data
    //so user_member_data nad user_recruiter_data can be null 

  return (
    <div>
      <Navbar user={user_profile_data} />
      <div className="h-20" />
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <AccountForm user_profile_data={user_profile_data} user_member_data={user_member_data} user_recruiter_data={user_recruiter_data} />
    </div>
  );
}
