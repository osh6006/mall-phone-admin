import prismadb from "@/lib/prismadb";
import { SeriseForm } from "./components/serise-form";

const SerisePage = async ({ params }: { params: { seriseId: string } }) => {
  const serise = await prismadb.serise.findUnique({
    where: {
      id: params.seriseId,
    },
  });

  return (
    <div className="flex-1 flex-col ml-[60px] lg:ml-[300px]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SeriseForm initialData={serise} />
      </div>
    </div>
  );
};

export default SerisePage;
