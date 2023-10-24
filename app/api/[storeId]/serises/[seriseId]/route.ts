import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { seriseId: string } }
) {
  try {
    if (!params.seriseId) {
      return new NextResponse("SeriseId id is required", { status: 400 });
    }

    const serise = await prismadb.serise.findUnique({
      where: {
        id: params.seriseId,
      },
    });

    return NextResponse.json(serise, { status: 200 });
  } catch (error) {
    console.log(`[SERISE_GET]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; seriseId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

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

    if (!params.seriseId) {
      return new NextResponse("SeriseId id is required", { status: 400 });
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

    const serise = await prismadb.serise.updateMany({
      where: {
        id: params.seriseId,
      },
      data: {
        name,
        modelNum,
      },
    });

    return NextResponse.json(serise, { status: 200 });
  } catch (error) {
    console.log(`[SERISE_PATCH]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; seriseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.seriseId) {
      return new NextResponse("Serise id is required", { status: 400 });
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

    const serise = await prismadb.serise.deleteMany({
      where: {
        id: params.seriseId,
      },
    });

    return NextResponse.json(serise, { status: 200 });
  } catch (error) {
    console.log(`[SERISE_DELETE]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
