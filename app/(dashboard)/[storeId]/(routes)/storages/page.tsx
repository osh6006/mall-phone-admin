import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import StoragesClient from "./components/client";
import { StorageColumn } from "./components/columns";

const StoragesPage = async ({ params }: { params: { storeId: string } }) => {
  const storages = await prismadb.storage.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatStorages: StorageColumn[] = storages.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 flex-col ml-[60px] lg:ml-[300px]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StoragesClient data={formatStorages} />
      </div>
    </div>
  );
};

export default StoragesPage;
