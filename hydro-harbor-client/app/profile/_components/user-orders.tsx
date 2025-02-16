import Card from "@/components/card";
import { UserOrdersProps } from "@/types/props/UserOrdersProps";
import Link from "next/link";

export default function UserOrders({ orders }: UserOrdersProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Card className="w-96 h-96 overflow-y-auto">
        {!orders || orders.length === 0 ? (
          <h3 className="text-dark dark:text-white text-center">
            No orders found.
          </h3>
        ) : (
          <div>
            {orders.map((item, key) => (
              <Card
                key={key}
                className="shadow-grey-300 dark:shadow-slate-600 mb-4 ring"
              >
                <Link href={`/profile/order/${item.id}`}>
                <h3 className="text-dark dark:text-white">Order - {key}</h3>
                <h3 className="text-dark dark:text-white">
                  Purchase Date - {formatDate(item.purchaseDate)}
                </h3>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
