import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
  params: { storeId: string };
}

const DashBoardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div className="flex-1 ml-[60px] lg:ml-[300px] w-full ">
      활성화 된 스토어: {store?.name}
    </div>
  );
};

export default DashBoardPage;
