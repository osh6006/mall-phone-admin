import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import SerisesClient from "./components/client";

import { SeriseColumn } from "./components/columns";

const SerisesPage = async ({ params }: { params: { storeId: string } }) => {
  const serises = await prismadb.serise.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatSerises: SeriseColumn[] = serises.map((item) => ({
    id: item.id,
    name: item.name,
    modelNum: item.modelNum,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 flex-col ml-[60px] lg:ml-[300px]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SerisesClient data={formatSerises} />
      </div>
    </div>
  );
};

export default SerisesPage;