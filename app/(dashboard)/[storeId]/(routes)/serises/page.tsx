import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import BillboardClient from "./components/client";
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

  const formatBillSerises: SeriseColumn[] = serises.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 flex-col ml-[60px] lg:ml-[300px]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatBillSerises} />
      </div>
    </div>
  );
};

export default SerisesPage;
