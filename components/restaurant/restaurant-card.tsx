import { Restaurant } from '@/lib/dataFields'
import ImageWithFallback from '../fallback-image'
import { ExternalLink, Image as ImageIcon } from 'lucide-react'

type RestaurantCardProps = {
  restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 flex flex-col">
      <div className="space-y-2 flex-1">
        <ImageWithFallback
          src={restaurant.imageUrl}
          width={500}
          height={500}
          alt="Imagem do restaurante"
          className="w-full h-40 object-cover rounded-md mb-2"
        />
        <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">
          {restaurant.address}
        </p>
      </div>
      <div className="flex gap-1 items-center mt-4">
        <a
          href={`/review?id=${restaurant.id}`}
          className="bg-slate-800 text-white py-1 px-2 rounded-md inline-block hover:bg-slate-900"
        >
          Resenhas
        </a>
        <div className="flex gap-1 ml-auto">
          <a
            href={restaurant.website}
            target="_blank"
            className="flex  items-center w-fit h-fit transform transition-transform hover:scale-110 hover:text-slate-900"
          >
            <ImageIcon className="w-5 h-5 mr-1 text-slate-800" />
          </a>

          <a
            href={restaurant.website}
            target="_blank"
            className="flex  items-center w-fit h-fit transform transition-transform hover:scale-110 hover:text-slate-900"
          >
            <ExternalLink className="w-5 h-5 mr-1 text-slate-800" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
