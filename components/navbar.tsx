import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "./store-switcher";
import Image from "next/image";

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
    <nav
      className="fixed w-[60px] h-full flex flex-col p-2 border-r
      lg:w-[300px] lg:p-4 z-50 bg-white
    "
    >
      <div className="w-full flex  items-center mx-auto lg:gap-x-4 ">
        <Image
          className="mx-auto"
          src="/Logo.png"
          width={40}
          height={40}
          alt="Logo"
        />
        <div>
          <h1 className="hidden font-semibold text-xl lg:block">
            Mall Phone Admin
          </h1>
        </div>
      </div>
      <div className="flex-1 w-full">
        <StoreSwitcher items={stores} className="mt-5 w-full" />
        <MainNav className="mt-3" />
      </div>
      <div className="flex mx-auto justify-between items-center lg:m-0">
        <h1 className="hidden font-semibold text-xl lg:block">{`${user?.firstName} ${user?.lastName}`}</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
