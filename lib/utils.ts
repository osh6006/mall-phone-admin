import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});

export const customFailNextResponse = (msg: string, code: number) => {
  return new NextResponse(msg, { status: code });
};

export const customSuccessNextResponse = (data: any) => {
  return NextResponse.json(data);
};
