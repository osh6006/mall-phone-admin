import prismadb from "@/lib/prismadb";
import { customFailNextResponse, customSuccessNextResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email) {
      return customFailNextResponse("이메일이 필요합니다.", 400);
    }

    if (!password) {
      return customFailNextResponse("비밀번호가 필요합니다.", 400);
    }

    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return customFailNextResponse("유저가 존재하지 않습니다.", 403);
    }

    return customSuccessNextResponse(user);
  } catch (error) {
    console.log("[LOGIN_POST]", error);
    return customFailNextResponse("서버에서 오류가 발생했습니다.", 500);
  }
}
