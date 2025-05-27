"use client";

import { useState } from "react";
import { completeProfileAction } from "@/actions/complete-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignOut from "@/components/ui/sign-out";

export default function CompleteProfilePage() {
  const [role, setRole] = useState<string | null>(null);

  return (
    <div className="max-w-xl mx-auto py-10">
      <SignOut />
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      <form action={completeProfileAction} className="space-y-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <select
            name="role"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select your role</option>
            <option value="MEMBER">Member</option>
            <option value="RECRUITER">Recruiter</option>
          </select>
        </div>

        {role === "MEMBER" && (
          <>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input name="age" type="number" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input name="phone" required />
            </div>
            <div>
              <Label htmlFor="chapter">Chapter</Label>
              <Input name="chapter" required />
            </div>
            <div>
              <Label htmlFor="university_cycle">University Cycle</Label>
              <Input name="university_cycle" required />
            </div>
            <div>
              <Label htmlFor="lead_role">LEAD Role</Label>
              <Input name="lead_role" required />
            </div>
            <div>
              <Label htmlFor="career">Career</Label>
              <Input name="career" required />
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input name="linkedin_url" type="url" required />
            </div>
            <div>
              <Label htmlFor="resume_url">Resume URL</Label>
              <Input name="resume_url" type="url" required />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input name="availability" required />
            </div>
          </>
        )}

        {role === "RECRUITER" && (
          <>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input name="company" required />
            </div>
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
