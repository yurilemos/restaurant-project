'use client'

import Image from 'next/image'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Restaurant } from '@/lib/dataFields'
import ImageWithFallback from '../fallback-image'
import { Heart } from 'lucide-react'
import { Button } from '../ui/button'

const ReviewRestaurantContainer = () => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('id') || ''

  const [restaurant, setRestaurant] = useState<Restaurant>()

  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false)

  const handleCliqueCoracao = () => {
    setCoracaoPreenchido(!coracaoPreenchido)
  }

  const handleGetRestaurants = useCallback(async () => {
    try {
      const restaurants = await axios.get('/api/restaurant', {
        params: { id: initialQuery }, // Passa a consulta como um parâmetro de consulta
      })
      setRestaurant(restaurants.data.restaurant)
    } catch (error) {
      console.log(error)
    }
  }, [initialQuery])

  useEffect(() => {
    if (!!initialQuery) handleGetRestaurants()
  }, [handleGetRestaurants, initialQuery])

  return (
    <>
      <div className="mt-10 space-y-6">
        <h2 className="font-bold text-3xl text-slate-900">
          {restaurant?.name}
        </h2>
        <div className="flex gap-6">
          <div>
            <ImageWithFallback
              src={restaurant?.imageUrl ?? ''}
              width={550}
              height={550}
              alt="Imagem do restaurante"
            />
            <p className=" text-sm">{restaurant?.address}</p>
          </div>
          <div>
            <Heart
              size={48}
              className={`cursor-pointer ${
                coracaoPreenchido
                  ? 'fill-current text-red-500'
                  : 'text-gray-500'
              }`}
              onClick={handleCliqueCoracao}
            />
            <Button onClick={() => {}}>Criar uma resenha</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6"></div>
    </>
  )
}

export default ReviewRestaurantContainer
