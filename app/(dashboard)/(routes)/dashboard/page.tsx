"use client";
import SearchRestaurant from "@/components/search-restaurant";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [canSearchMore, setCanSearchMore] = useState(false);

  const handleOnAddMoreRestaurants = async () => {
    const restaurantsData = await axios.post("/api/restaurant", {
      search: query,
    });
    setCanSearchMore(false);
  };

  const handleSearch = async (e: string) => {
    setQuery(e);
    try {
      const restaurants = await axios.get("/api/restaurant", {
        params: { query: e }, // Passa a consulta como um parâmetro de consulta
      });
      setRestaurants(restaurants.data.restaurants);
      setCanSearchMore(restaurants.data.canSearch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchRestaurant
        setSearch={handleSearch}
        onFieldChanged={() => {
          setCanSearchMore(false);
        }}
      />
      {canSearchMore && (
        <Button
          onClick={() => {
            handleOnAddMoreRestaurants();
          }}
        >
          Carregar mais...
        </Button>
      )}
    </div>
  );
}
