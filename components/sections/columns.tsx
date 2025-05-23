  import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import type { FormResponse } from "./tablewrapper";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
  
 export const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "chapter", header: "Chapter" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "university_cycle", header: "University Cycle" },
  { accessorKey: "career", header: "Career" },
  { accessorKey: "availability", header: "Availability" },
  {
    accessorKey: "linkedin",
    header: "LinkedIn",
    cell: ({ row }: { row: Row<FormResponse> }) => (
      <a
        href={row.original.linkedin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        LinkedIn
      </a>
    ),
  },
  {
    accessorKey: "resume_url",
    header: "Resume",
    cell: ({ row }: { row: Row<FormResponse> }) => (
      <a
        href={row.original.resume_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Download
      </a>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<FormResponse> }) => {
      const response = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(response.id.toString())}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];