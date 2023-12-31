import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ToasterProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mall Phone Admin",
  description: "OHS의 E-cormerce 관리자 페이지 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className={inter.className}>
          <ToasterProvider />
          {/* MODAL을 GLOBAL 하게 보여줌 */}
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
