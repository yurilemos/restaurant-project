import axios from "axios";
import { addRestaurant } from "./add-restaurant";
import { mockData, mockData2 } from "./mockDatas";

import db from "./db";

//const response = { status: 200, data: { data: mockData2 } };

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
      limit: "50",
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
      const restList = response.data.data;

      const resAddList = [];

      for (const res of restList) {
        let resRes = addRestaurant(res);
        resAddList.push(resRes);
      }

      await db.restaurantAPISearched.create({
        data: {
          name: location,
        },
      });

      return resAddList;
    } // Estes são os resultados enviados pela API!
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getRestaurants;
