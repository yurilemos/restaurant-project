import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Importe o PrismaClient
import getRestaurants from "@/lib/restaurant-api";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import db from "@/lib/db";

const prisma = new PrismaClient(); // Crie uma instância do PrismaClient

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    const query = await req.nextUrl.searchParams.get("query");

    if (!userId) {
      return new NextResponse("Sem permissão", { status: 401 });
    }

    if (!query) {
      return new NextResponse("Conteúdo da busca vazio", { status: 400 });
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
    });

    const existingSearch = await db.restaurantAPISearched.findUnique({
      where: {
        name: query,
      },
    });

    return NextResponse.json({
      message: "Retaurantes carregados com sucesso!",
      restaurants: restaurantes, // Retorna os restaurantes encontrados
      canSearch: !!!existingSearch,
    });
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Sem permissão", { status: 401 });
    }

    const query = await req.json();

    const { search } = query;

    if (!search) {
      return new NextResponse("Conteúdo da busca vazio", { status: 400 });
    }

    // verifica se essa pesquisa de nome já foi feita
    const existingSearch = await db.restaurantAPISearched.findUnique({
      where: {
        name: search,
      },
    });

    // já foi usada essa busca (para limitar as buscas na API externa)
    if (existingSearch) {
      return new NextResponse("Busca não autorizada", { status: 404 });
    }

    const restaurants = await getRestaurants(search);
    return NextResponse.json({
      message: "Retaurantes atualizados com sucesso!",
      restaurants, // Retorna os restaurantes encontrados
    });
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
