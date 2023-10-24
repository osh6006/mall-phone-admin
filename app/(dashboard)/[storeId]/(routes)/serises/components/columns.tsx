"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SeriseColumn = {
  id: string;
  name: string;
  modelNum: string;
  createdAt: string;
};

export const columns: ColumnDef<SeriseColumn>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "modelNum",
    header: "모델 번호",
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
