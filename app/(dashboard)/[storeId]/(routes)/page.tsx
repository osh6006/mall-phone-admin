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
  return <div>활성화 된 스토어: {store?.name}</div>;
};

export default DashBoardPage;
