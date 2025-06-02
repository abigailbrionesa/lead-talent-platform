"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeProfileAction } from "@/actions/complete-profile";
import { Label } from "@/components/ui/label";
import { ChevronUpIcon } from "lucide-react";
import { TagsInput } from "./tags-input";
import type { UserInForm } from "@/types/next-auth";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SignOut from "@/components/ui/sign-out";
import { formSchema } from "@/lib/schemas";
import { splitBirthday } from "@/utils/utils";
import { LeadChapter } from "@prisma/client";
const allSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Figma", "Leadership", "Python"];
const allLanguages = ["English", "Spanish", "French", "German", "Chinese"];
import { LeadRole } from "@prisma/client";


const careers = [
  "Biología",
  "Biotecnología",
  "Bioquímica",
  "Ciencias Ambientales",
  "Ciencias de la Computación",
  "Ciencias Físicas",
  "Ciencias Matemáticas",
  "Estadística",
  "Genética",
  "Microbiología",
  "Química",
  "Geología",
  "Geofísica",
  "Ingeniería de Sistemas",
  "Ingeniería de Software",
  "Ingeniería Informática",
  "Ciencia de Datos",
  "Ciberseguridad",
  "Inteligencia Artificial",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería Mecánica",
  "Ingeniería Electrónica",
  "Ingeniería Eléctrica",
  "Ingeniería Química",
  "Ingeniería de Telecomunicaciones",
  "Ingeniería de Minas",
  "Ingeniería Ambiental",
  "Ingeniería Biomédica",
  "Matemáticas",
  "Física",
  "Bioinformática",
  "Nanotecnología",
  "Arquitectura",
  "Tecnología Médica",
  "Otro",
];

export default function AccountForm({ user }: { user: UserInForm }) {

  let birthday_data = { day: "", month: "", year: "" };

  if (user?.member?.birthday) {
    birthday_data = splitBirthday(user.member.birthday);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: user?.role as "MEMBER" | "RECRUITER" | "ADMIN",
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      birthday_day: birthday_data.day || "",
      birthday_month: birthday_data.month || "",
      birthday_year: birthday_data.year || "",
      phone: user?.member?.phone || "",
      chapter: user?.member?.chapter || "",
      university_cycle: user?.member?.university_cycle || "",
      lead_role: user?.member?.lead_role || "",
      career: user?.member?.career || "",
      linkedin_url: user?.member?.linkedin_url || "",
      resume_url: user?.member?.resume_url || "",
      availability: user?.member?.availability || "",
      company: user?.recruiter?.company || "",
      skills: user?.member?.skills || [],
      languages: user?.member?.languages || [],
    },
  });

  const role = form.watch("role");

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    await completeProfileAction(formData);
  } catch (error) {
    console.error("Submission error:", error);
  }
}

  return (
    <div className="max-w-xl mx-auto py-10">
      <SignOut />
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="RECRUITER">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {role === "MEMBER" && (
            <>  

            <FormField
  control={form.control}
  name="skills"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Skills</FormLabel>
      <FormControl>
        <TagsInput
          placeholder="Search or type to add skills"
          options={allSkills}
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="languages"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Languages</FormLabel>
      <FormControl>
        <TagsInput
          placeholder="Search or type to add languages"
          options={allLanguages}
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              <Label>Birth date</Label>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="birthday_day"
                  render={({ field }) => (
                    <FormItem className="w-16">
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={2}
                          placeholder="DD"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday_month"
                  render={({ field }) => (
                    <FormItem className="w-16">
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={2}
                          placeholder="MM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday_year"
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={4}
                          placeholder="YYYY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
  control={form.control}
  name="chapter"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Chapter</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select chapter" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(LeadChapter).map((chapter) => (
              <SelectItem key={chapter} value={chapter}>
                {chapter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <FormField
  control={form.control}
  name="university_cycle"
  render={({ field }) => (
    <FormItem>
      <FormLabel>University Cycle</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select your cycle" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((cycle) => (
              <SelectItem key={cycle} value={cycle.toString()}>
                {cycle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <FormField
  control={form.control}
  name="lead_role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>LEAD Role</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
             {Object.values(LeadRole).map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <FormField
                control={form.control}
                name="career"
                render={({ field }) => {
                  const [open, setOpen] = useState(false);
                  const [inputValue, setInputValue] = useState(
                    field.value || ""
                  );
                  const [customCareer, setCustomCareer] = useState("");

                  const isOtherSelected = inputValue === "Otro";

                  const handleSelect = (value: string) => {
                    setInputValue(value);
                    if (value !== "Other") {
                      field.onChange(value);
                    } else {
                      field.onChange("");
                    }
                    setOpen(false);
                  };

                  const handleCustomChange = (value: string) => {
                    setCustomCareer(value);
                    field.onChange(value);
                  };

                  return (
                    <FormItem>
                      <FormLabel>Career</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {inputValue || "Select or type a career"}
                            <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className="h-60">
                            <CommandInput
                              placeholder="Search careers..."
                              value={inputValue}
                              onValueChange={setInputValue}
                            />
                            <CommandEmpty>
                              <div className="px-2 py-1 text-sm text-muted-foreground">
                                No matches found. <br />
                                <span className="font-medium">
                                  Select "Other" to enter manually.
                                </span>
                              </div>
                            </CommandEmpty>
                            <CommandGroup>
                              {careers.map((career) => (
                                <CommandItem
                                  key={career}
                                  value={career}
                                  onSelect={handleSelect}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      inputValue === career
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {career}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {isOtherSelected && (
                        <div className="mt-2">
                          <Input
                            placeholder="Write your career..."
                            value={customCareer}
                            onChange={(e) => handleCustomChange(e.target.value)}
                          />
                        </div>
                      )}

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/yourprofile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/your-resume.pdf"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
  control={form.control}
  name="availability"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Availability</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Internships">Internships</SelectItem>
            <SelectItem value="Not available">Not available</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            </>
          )}

          {role === "RECRUITER" && (
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            Submit Profile
          </Button>
        </form>
      </Form>

      <pre className="mt-8 p-4 rounded-md">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
