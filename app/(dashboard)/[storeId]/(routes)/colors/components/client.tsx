"use client";
import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { ColorColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

interface SerisesClientProps {
  data: ColorColumn[];
}

export default function SerisesClient({ data }: SerisesClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.length})`}
          description="스토어의 Color를 관리해 보세요."
        />
        <Button
          variant={"main"}
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="Colors 관리 API Call" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
