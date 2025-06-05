"use server";
import { createClient } from "@/utils/supabase/server";

export async function upload_profile_picture(file: File): Promise<string | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    console.error("User not authenticated:", sessionError);
    return null;
  }

  const userId = user.id;
  const path = `${userId}/profile.jpg`;

  const { data, error } = await supabase.storage
    .from("profile-picture")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading profile image:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("profile-picture")
    .getPublicUrl(data.path);

  console.log(data.path, "is data path")
  return publicUrlData.publicUrl;
}
