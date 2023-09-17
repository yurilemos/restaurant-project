"use client";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import Controller from "./controller";
import getRestaurants from "@/lib/restaurant-api";

const FormSchema = z.object({
  restaurante: z.string(),
});

const SearchRestaurant = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const restaurantsData = await getRestaurants(data.restaurante);
  }

  const { restaurante } = form.watch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-sm items-center gap-1.5"
      >
        <Controller
          control={form.control}
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
