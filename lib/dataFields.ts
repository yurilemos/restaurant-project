export type RestaurantType = {
  id: string
  type: string
}

export type Restaurant = {
  id: string
  restaurantId: string
  name: string
  address: string
  imageUrl: string
  website: string
  phoneNumber: string
  bookingLink: string
  placeLink: string
  numberOfLikes: number
  types: RestaurantType[]
}
