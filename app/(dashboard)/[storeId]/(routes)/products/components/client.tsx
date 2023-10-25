"use client";
import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { ProductColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

interface ProductClientProps {
  data: ProductColumn[];
}

export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`상품 (${data?.length})`}
          description="상품을 관리해 보세요"
        />
        <Button
          variant={"main"}
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="상품 관리 API Call" />
      <Separator />
      <ApiList entityName="products" entityIdName="productsId" />
    </>
  );
}
