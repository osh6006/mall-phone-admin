"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StorageColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<StorageColumn>[] = [
  {
    accessorKey: "name",
    header: "용량",
  },
  {
    accessorKey: "createdAt",
    header: "날짜",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
