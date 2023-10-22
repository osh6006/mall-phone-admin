import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "./store-switcher";

const Navbar = async () => {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-r w-[300px] flex flex-col relative p-4">
      <div className="w-full flex justify-between items-center ">
        <div>
          <h1 className="font-semibold text-xl">Mall Phone</h1>
        </div>
      </div>
      <StoreSwitcher items={stores} className="mt-5" />
      <MainNav className="mt-3 mb-6" />
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl">{`${user?.firstName} ${user?.lastName}`}</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
