"use client";

import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchRestaurantContainer from "./search-restaurant-container";
import { Restaurant } from "@/lib/dataFields";
import RestaurantCard from "./restaurant-card";

const RestaurantsSearchContainer = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [canSearch, setCanSearch] = useState(false);

  const handleGetRestaurants = useCallback(async () => {
    try {
      const restaurants = await axios.get("/api/restaurant", {
        params: { query: initialQuery }, // Passa a consulta como um parâmetro de consulta
      });
      setRestaurants(restaurants.data.restaurants);
      setCanSearch(restaurants.data.canSearch);
    } catch (error) {
      console.log(error);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (!!initialQuery) handleGetRestaurants();
  }, [handleGetRestaurants, initialQuery]);

  return (
    <>
      <SearchRestaurantContainer canSearch={canSearch} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {restaurants &&
          restaurants?.map((res) => (
            <RestaurantCard restaurant={res} key={res.id} />
          ))}
      </div>
    </>
  );
};

export default RestaurantsSearchContainer;
