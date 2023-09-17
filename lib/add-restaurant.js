import db from "@/lib/db";

export const addRestaurant = async (rest) => {
  let existingRestaurant = await db.restaurant.findUnique({
    where: {
      restaurantId: rest.business_id,
    },
  });

  if (existingRestaurant) return;

  const newRestaurant = await db.restaurant.create({
    data: {
      restaurantId: rest.business_id,
      name: rest.name,
      address: rest.address,
      imageUrl: rest.photos_sample.length
        ? rest.photos_sample[0].photo_url
        : null,
      website: rest.website,
      phoneNumber: rest.phone_number,
      booking_link: rest.booking_link,
      place_link: rest.place_link,
    },
  });

  // Criar ou associar tipos
  for (const subtype of rest.subtypes) {
    let existingType = await db.restaurantType.findUnique({
      where: {
        type: subtype,
      },
    });

    if (!existingType) {
      existingType = await db.restaurantType.create({
        data: {
          type: subtype,
          restaurantId: newRestaurant.id,
        },
      });
    }

    // Adicionar o tipo criado ou existente ao restaurante
    newRestaurant.restaurantTypes.push(existingType);
  }

  // Criar fotos
  for (const photoSample of rest.photos_sample) {
    const newPhoto = await db.photo.create({
      data: {
        restaurantId: newRestaurant.id,
        url: photoSample.photo_url,
      },
    });

    // Adicionar a foto criada ao restaurante
    newRestaurant.photos.push(newPhoto);
  }
};
