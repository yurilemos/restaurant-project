"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchRestaurantContainer from "./search-restaurant-container";

const RestaurantsSearchContainer = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [restaurants, setRestaurants] = useState([]);
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

  return <SearchRestaurantContainer canSearch={canSearch} />;
};

export default RestaurantsSearchContainer;
