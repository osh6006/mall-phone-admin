import * as bcrypt from "bcrypt"; // 바뀐 부분

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { customFailNextResponse } from "@/lib/utils";

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
        { ok: false, msg: "이메일이 필요합니다." },
        {
          headers: corsHeaders,
        }
      );
    }

    if (!password) {
      return NextResponse.json(
        { ok: false, msg: "비밀번호가 필요합니다." },
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

    if (user) {
      return NextResponse.json(
        { ok: false, msg: "이미 존재하는 이메일 입니다." },
        {
          headers: corsHeaders,
        }
      );
    } else {
      await prismadb.user.create({
        data: {
          email: body.email,
          password: await bcrypt.hash(body.password, 10), // 바뀐 부분
        },
      });
    }

    return NextResponse.json(
      { ok: true, msg: "회원가입에 성공하였습니다." },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return customFailNextResponse("서버에서 오류가 발생했습니다.", 500);
  }
}
