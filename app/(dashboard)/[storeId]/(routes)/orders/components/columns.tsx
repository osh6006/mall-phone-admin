"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Ordercolumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<Ordercolumn>[] = [
  {
    accessorKey: "products",
    header: "상품",
  },
  {
    accessorKey: "phone",
    header: "휴대폰",
  },
  {
    accessorKey: "address",
    header: "주소",
  },
  {
    accessorKey: "totalPrice",
    header: "총 가격",
  },
  {
    accessorKey: "isPaid",
    header: "지불 여부",
  },
  {
    accessorKey: "createdAt",
    header: "날짜",
  },
];
