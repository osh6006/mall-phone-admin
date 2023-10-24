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

    const { name, modelNum } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!modelNum) {
      return new NextResponse("ModelNum is required", { status: 400 });
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

    const serise = await prismadb.serise.create({
      data: {
        name,
        modelNum,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(serise, { status: 200 });
  } catch (error) {
    console.log("[SERISE_POST]", error);
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

    const serises = await prismadb.serise.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(serises, { status: 200 });
  } catch (error) {
    console.log("[SERISES_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
