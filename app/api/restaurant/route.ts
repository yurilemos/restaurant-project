import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client' // Importe o PrismaClient
import getRestaurants from '@/lib/restaurant-api'
import { INTERNALS } from 'next/dist/server/web/spec-extension/request'
import db from '@/lib/db'

const prisma = new PrismaClient() // Crie uma instância do PrismaClient

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    const query = await req.nextUrl.searchParams.get('query')

    const restId = await req.nextUrl.searchParams.get('id')

    if (!userId) {
      return new NextResponse('Sem permissão', { status: 401 })
    }

    // procurar primeiro por id do restaurante
    if (restId) {
      const uniqueRest = await db.restaurant.findUnique({
        where: {
          id: restId,
        },
      })

      if (!uniqueRest) {
        return new NextResponse('Restaurante inválido', { status: 400 })
      }

      return NextResponse.json({
        message: 'Retaurante carregado com sucesso!',
        restaurant: uniqueRest, // Retorna os restaurantes encontrados
      })
    }

    if (!query) {
      return new NextResponse('Conteúdo da busca vazio', { status: 400 })
    }

    // Pesquisar restaurantes com base no parâmetro 'query'
    const restaurantes = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query, // Procurar pelo nome
            },
          },
          {
            address: {
              contains: query, // Procurar pelo endereço
            },
          },
          {
            types: {
              some: {
                restaurantType: {
                  type: {
                    contains: query, // Procurar pelo tipo
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        types: {
          include: {
            restaurantType: true, // Inclua os tipos associados
          },
        },
      },
    })

    const existingSearch = await db.restaurantAPISearched.findUnique({
      where: {
        name: query,
      },
    })

    const mappedRestaurantes = restaurantes.map((restaurante) => ({
      id: restaurante.id,
      restaurantId: restaurante.restaurantId,
      name: restaurante.name,
      address: restaurante.address,
      imageUrl: restaurante.imageUrl,
      website: restaurante.website,
      phoneNumber: restaurante.phoneNumber,
      bookingLink: restaurante.bookingLink,
      placeLink: restaurante.placeLink,
      numberOfLikes: restaurante.numberOfLikes,
      profileId: restaurante.profileId,
      types: restaurante.types.map((type) => ({
        id: type.restaurantType.id,
        type: type.restaurantType.type,
      })),
    }))

    return NextResponse.json({
      message: 'Retaurantes carregados com sucesso!',
      restaurants: mappedRestaurantes, // Retorna os restaurantes encontrados
      canSearch: !!!existingSearch,
    })
  } catch (error) {
    console.error('[CODE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Sem permissão', { status: 401 })
    }

    const query = await req.json()

    const { search } = query

    if (!search) {
      return new NextResponse('Conteúdo da busca vazio', { status: 400 })
    }

    // verifica se essa pesquisa de nome já foi feita
    const existingSearch = await db.restaurantAPISearched.findUnique({
      where: {
        name: search,
      },
    })

    // já foi usada essa busca (para limitar as buscas na API externa)
    if (existingSearch) {
      return new NextResponse('Busca não autorizada', { status: 404 })
    }

    const restaurants = await getRestaurants(search)
    return NextResponse.json({
      message: 'Retaurantes atualizados com sucesso!',
      restaurants, // Retorna os restaurantes encontrados
    })
  } catch (error) {
    console.error('[CODE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
