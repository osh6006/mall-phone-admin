import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { billBoardId: string } }
) {
  try {
    if (!params.billBoardId) {
      return new NextResponse("BillBoardId id is required", { status: 400 });
    }

    const billBoard = await prismadb.billBoard.findUnique({
      where: {
        id: params.billBoardId,
      },
    });

    return NextResponse.json(billBoard, { status: 200 });
  } catch (error) {
    console.log(`[BILLBOARD_GET]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageURL } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageURL) {
      return new NextResponse("ImageUrl is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("BillboardId id is required", { status: 400 });
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

    const billBoard = await prismadb.billBoard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageURL,
      },
    });

    return NextResponse.json(billBoard, { status: 200 });
  } catch (error) {
    console.log(`[STORES_PATCH]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("BillBoardId id is required", { status: 400 });
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

    const billBoard = await prismadb.billBoard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billBoard, { status: 200 });
  } catch (error) {
    console.log(`[BILLBOARD_DELETE]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
