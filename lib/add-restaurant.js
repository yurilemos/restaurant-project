import db from '@/lib/db'

export const addRestaurant = async (rest) => {
  try {
    const existingRestaurant = await db.restaurant.findUnique({
      where: {
        restaurantId: rest.business_id,
      },
    })

    if (existingRestaurant) return

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
        bookingLink: rest.booking_link,
        placeLink: rest.place_link,
      },
    })

    newRestaurant.reviews = []
    newRestaurant.photos = []

    // Criar ou associar tipos
    for (const subtype of rest.subtypes) {
      let existingType = await db.restaurantType.findFirst({
        where: {
          type: {
            equals: subtype.toLowerCase(), // Converta o tipo para minúsculas
          },
        },
      })

      if (!existingType) {
        existingType = await db.restaurantType.create({
          data: {
            type: subtype.toLowerCase(),
          },
        })
      }

      if (existingType) {
        await db.restaurantTypeToRestaurant.create({
          data: {
            restaurant: {
              connect: {
                id: newRestaurant.id,
              },
            },
            restaurantType: {
              connect: {
                id: existingType.id,
              },
            },
          },
        })
      }
    }

    // Criar fotos
    for (const photoSample of rest.photos_sample) {
      const newPhoto = await db.photo.create({
        data: {
          restaurantId: newRestaurant.id,
          url: photoSample.photo_url,
        },
      })

      // Adicionar a foto criada ao restaurante
      if (newPhoto) newRestaurant.photos.push(newPhoto)
    }

    return newRestaurant
  } catch (error) {
    console.log(error)
  }
}
