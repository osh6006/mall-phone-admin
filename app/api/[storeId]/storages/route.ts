import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // 로그인은 했지만, 권한이 없음
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const storage = await prismadb.storage.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(storage, { status: 200 });
  } catch (error) {
    console.log("[STORAGE_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const storages = await prismadb.storage.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(storages, { status: 200 });
  } catch (error) {
    console.log("[STORAGES_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
