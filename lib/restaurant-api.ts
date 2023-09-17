import axios from "axios";
import db from "./db";
import { addRestaurant } from "./add-restaurant";

async function getRestaurants(location: string) {
  const config = {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RESTAURANT_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_HOST,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
    },
    params: {
      query: `Restaurantes ${location}`,
      limit: "5",
      language: "pt_BR",
      region: "br",
    },
  };

  try {
    const response = await axios.get(
      "https://local-business-data.p.rapidapi.com/search",
      config
    );

    if (response.status === 200) {
      console.log(response.data);

      const restList = response.data.data;

      for (const res of restList) {
        addRestaurant(res);
      }

      return restList;
    } // Estes são os resultados enviados pela API!
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getRestaurants;
