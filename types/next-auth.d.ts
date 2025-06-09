export type platform_role = 'member' | 'recruiter' | 'admin' | null;

export type nav_user_type = {
  role: platform_role;
  profile_picture: string;
  full_name: string;
  email: string;
}
