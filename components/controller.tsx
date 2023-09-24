"use client";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type ControllerProps = {
  control: any;
  name: string;
  type?: "text" | "email" | "password" | "number" | "checkbox" | "radio";
  label?: string;
  placeholder?: string;
  description?: string;
  onFieldChanged?: () => void;
};

const Controller = ({
  control,
  name,
  type = "text",
  label,
  placeholder,
  description,
  onFieldChanged,
}: ControllerProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onFieldChanged && onFieldChanged();
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Controller;
