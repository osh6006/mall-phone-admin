"use client";

import { Ordercolumn, columns } from "./columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: Ordercolumn[];
}

export default function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`주문 (${data?.length})`}
        description="스토어 주문을 관리해 보세요."
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
