import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { Ordercolumn } from "./components/columns";
import OrderClient from "./components/client";

import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatOrders: Ordercolumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    isPaid: item.isPaid,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 flex-col ml-[60px] lg:ml-[300px]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
