"use client";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import Controller from "./controller";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  restaurante: z.string(),
});

type SearchResultSubmit = {
  setSearch: (e: string) => void;
  onFieldChanged?: () => void;
};

const SearchRestaurant = ({
  setSearch,
  onFieldChanged,
}: SearchResultSubmit) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSearch(data.restaurante);
  }

  const { restaurante } = form.watch();

  useEffect(() => {
    form.reset({
      restaurante: query ?? "",
    });
  }, [form, query]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-sm items-center gap-1.5"
      >
        <Controller
          control={form.control}
          onFieldChanged={onFieldChanged}
          name="restaurante"
          label="Restaurante"
          placeholder="Buscar Restaurante"
        />
        <Button type="submit" disabled={!restaurante}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SearchRestaurant;
