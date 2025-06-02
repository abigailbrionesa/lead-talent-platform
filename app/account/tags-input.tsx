import * as React from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { X } from "lucide-react";

interface TagsInputProps {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
}

export function TagsInput({ options, value, onChange, placeholder }: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(option)
  );

  function addTag(tag: string) {
    onChange([...value, tag]);
    setInputValue("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((v) => v !== tag));
  }

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-1 min-h-[44px] items-center">
      {value.map((tag) => (
        <div
          key={tag}
          className="flex items-center space-x-1 bg-blue-200 text-blue-900 rounded px-2 py-1 text-sm"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="focus:outline-none"
            aria-label={`Remove ${tag}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <Command>
        <CommandInput
          autoFocus
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              e.preventDefault();
              if (!value.includes(inputValue.trim())) {
                addTag(inputValue.trim());
              }
            }
          }}
          className="flex-1 border-none focus:ring-0"
        />
        <CommandList>
          {filteredOptions.length === 0 && (
            <CommandEmpty>No options found.</CommandEmpty>
          )}
          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => addTag(option)}
              >
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
