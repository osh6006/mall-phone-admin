"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  storage: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "isArchived",
    header: "비 활성화",
  },
  {
    accessorKey: "isFeatured",
    header: "게시",
  },
  {
    accessorKey: "price",
    header: "가격",
  },
  {
    accessorKey: "category",
    header: "카테고리",
  },
  {
    accessorKey: "storage",
    header: "스토리지",
  },
  {
    accessorKey: "color",
    header: "컬러",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          {row.original.color}
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: row.original.color }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "생성 일",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
