"use client";

import { useAppContext } from "@/context/app-context";
import { fetchUserOrdersAndFavorites } from "@/lib/user";
import { useEffect, useState } from "react";
import UserOrders from "./_components/user-orders";
import UserFavorites from "./_components/user-favorites";

export default function Profile() {
  const { globalState } = useAppContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await fetchUserOrdersAndFavorites(
          globalState.user?.email ?? ""
        );
        if (status === 200) {
          setOrderHistory(data.purchases);
          setFavorites(data.favorites);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [globalState.user?.email]);

  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <div className="flex space-x-4 w-full">
          <div className="flex-1">
            <h3 className="text-2xl text-center mb-4">Orders</h3>
            <UserOrders orders={orderHistory} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl text-center mb-4">Favorites</h3>
            <UserFavorites favorites={favorites} />
          </div>
        </div>
      </div>
    </>
  );
}
