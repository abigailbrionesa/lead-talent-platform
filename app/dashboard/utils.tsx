type MemberProfile = {
  [key: string]: any;
  profiles?: {
    [key: string]: any;
  };
};

export function flattenProfiles(data: MemberProfile[] | null = []): FormResponse[] {
  if (!data) return [];

  return data
    .map((row) => {
      const { profiles, ...rest } = row;
      const merged = {
        ...rest,
        ...(profiles || {}),
      };
      return isFormResponse(merged) ? merged : null;
    })
    .filter((item): item is FormResponse => item !== null);
}

function isFormResponse(obj: any): obj is FormResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.full_name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.birthday === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.chapter === 'string' &&
    typeof obj.lead_role === 'string' &&
    typeof obj.university_cycle === 'string' &&
    typeof obj.career === 'string' &&
    typeof obj.availability === 'string' &&
    typeof obj.linkedin_url === 'string' &&
    typeof obj.resume_url === 'string' &&
    Array.isArray(obj.skills) &&
    Array.isArray(obj.languages) &&
    obj.skills.every((s: any) => typeof s === 'string') &&
    obj.languages.every((l: any) => typeof l === 'string')
  );
}

export interface FormResponse {
  id:string;
  full_name: string;
  email: string;
  birthday: string;
  phone: string;
  chapter: string;
  lead_role: string;
  university_cycle: string;
  career: string;
  availability: string;
  linkedin_url: string;
  resume_url: string;
  skills: string[];
  languages: string[];
}