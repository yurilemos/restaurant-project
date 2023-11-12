import RestaurantsSearchContainer from '@/components/restaurant/restaurants-container'

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-2 mb-10">
        <h2 className="font-bold text-5xl text-slate-900">Restaurantes</h2>
        <p className=" text-slate-600">
          Aqui você pode pesquisar por restaurantes, ver e criar resenhas.
        </p>
        <p className=" text-slate-600">
          Para começar, pesquise pelo restaurante, caso ele não apareça, faça
          uma busca avançada.
        </p>
      </div>
      <RestaurantsSearchContainer />
    </>
  )
}
