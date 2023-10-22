"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";

export default function BillboardClient() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Billboard (0)"
        description="Manage billboards for your store"
      />
      <Button
        variant={"main"}
        onClick={() => router.push(`/${params.storeId}/billboards/new`)}
      >
        <Plus className="mr-2 w-4 h-4" />
        New
      </Button>
    </div>
  );
}
