import * as bcrypt from "bcrypt";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { signJwtAccessToken } from "@/lib/jwt";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { ok: false, msg: "이메일을 입력해 주세요" },
        {
          headers: corsHeaders,
        }
      );
    }

    if (!password) {
      return NextResponse.json(
        { ok: false, msg: "비밀번호를 입력해 주세요" },
        {
          headers: corsHeaders,
        }
      );
    }

    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, msg: "비밀번호 혹은 이메일이 일치하지 않습니다." },
        {
          headers: corsHeaders,
        }
      );
    }

    const isCorrect = await bcrypt.compare(body.password, user.password);

    if (!isCorrect) {
      return NextResponse.json(
        { ok: false, msg: "비밀번호 혹은 이메일이 일치하지 않습니다." },
        {
          headers: corsHeaders,
        }
      );
    }

    const { password: tempPassword, ...userWithoutPass } = user;

    // 추가된 부분
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return NextResponse.json(
      { ok: true, msg: "로그인에 성공하셨습니다.", result },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("[LOGIN_POST]", error);
    return NextResponse.json(
      { ok: false, msg: "서버에서 오류가 발생하였습니다." },
      {
        headers: corsHeaders,
      }
    );
  }
}
