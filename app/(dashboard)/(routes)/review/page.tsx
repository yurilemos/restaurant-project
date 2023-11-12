'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ReviewRestaurantContainer from '@/components/review/reviewContainer'

function ReviewPage() {
  const router = useRouter()

  const goBack = () => {
    router.back() // Isso redirecionará para a página anterior
  }

  return (
    <div>
      <button onClick={goBack}>
        <ArrowLeft className="h-8 w-8" />
      </button>

      <ReviewRestaurantContainer />
    </div>
  )
}

export default ReviewPage
