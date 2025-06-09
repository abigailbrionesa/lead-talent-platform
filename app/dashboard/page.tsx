import { Navbar } from "@/components/global/navbar";
import { createClient } from "@/utils/supabase/server";
import { DataTable } from "./table";
import { flattenProfiles } from "./utils";
import { columns } from "./columns";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return (
      <div>
        <p>
          Only registered and approved recruiters are allowed to see the content
          of this page.
        </p>
      </div>
    );
  }

  const userId = authData.user.id;

  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select(
      `
    *,
    recruiter_profiles(id, company, petition_status)
  `
    )
    .eq("id", userId)
    .single();

  if (profileError || !userProfile) {
    return (
      <div>
        <p>Error fetching profile.</p>
        <pre>{JSON.stringify(profileError, null, 2)}</pre>
      </div>
    );
  }

  const recruiterData = userProfile.recruiter_profiles;

  if (
    userProfile.role !== "recruiter" ||
    !recruiterData ||
    recruiterData.petition_status !== "APPROVED"
  ) {
    return (
      <div>
        <p>
          Only registered and approved recruiters are allowed to see the content
          of this page.
        </p>
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>
      </div>
    );
  }

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "member_profiles",
      },
      (payload) => console.log(payload)
    )
    .subscribe();

const { data, error } = await supabase
  .from("member_profiles")
  .select(`
    *,
    profiles (
      id,
      full_name,
      email,
      profile_picture
    )
  `);

  console.log(error)
console.log(JSON.stringify(data, null, 2));

  return (
    <div>
      <Navbar user={userProfile} />
      <div className="h-20" />

<pre>{JSON.stringify(flattenProfiles(data), null, 2)}</pre>

      <DataTable data={flattenProfiles(data)} columns={columns} />
    </div>
  );
}
