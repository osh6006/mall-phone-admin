import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storageId: string } }
) {
  try {
    if (!params.storageId) {
      return new NextResponse("StorageId id is required", { status: 400 });
    }

    const storage = await prismadb.storage.findUnique({
      where: {
        id: params.storageId,
      },
    });

    return NextResponse.json(storage, { status: 200 });
  } catch (error) {
    console.log(`[STORAGE_GET]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; storageId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storageId) {
      return new NextResponse("StorageId id is required", { status: 400 });
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

    const storage = await prismadb.storage.updateMany({
      where: {
        id: params.storageId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(storage, { status: 200 });
  } catch (error) {
    console.log(`[STORAGE_PATCH]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; storageId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storageId) {
      return new NextResponse("Storage id is required", { status: 400 });
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

    const storage = await prismadb.storage.deleteMany({
      where: {
        id: params.storageId,
      },
    });

    return NextResponse.json(storage, { status: 200 });
  } catch (error) {
    console.log(`[STORAGE_DELETE]`, error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
