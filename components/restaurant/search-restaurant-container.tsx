'use client'
import SearchRestaurant from '@/components/restaurant/search-restaurant'
import { Button } from '@/components/ui/button'

import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type SearchRestaurantContainerProps = {
  canSearch: boolean
}

export default function SearchRestaurantContainer({
  canSearch,
}: SearchRestaurantContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [canSearchMore, setCanSearchMore] = useState(canSearch)

  const query = searchParams.get('search')

  const handleOnAddMoreRestaurants = async () => {
    try {
      await axios.post('/api/restaurant', {
        search: query,
      })
    } catch (e) {
      console.log(e)
    }
    setCanSearchMore(false)
  }

  const handleSearch = async (e: string) => {
    router.push(`?search=${e}`, { scroll: false })
  }

  return (
    <div>
      <SearchRestaurant
        setSearch={handleSearch}
        onFieldChanged={() => {
          setCanSearchMore(false)
        }}
      />
      {canSearchMore && (
        <Button
          onClick={() => {
            handleOnAddMoreRestaurants()
          }}
        >
          Carregar mais...
        </Button>
      )}
    </div>
  )
}
