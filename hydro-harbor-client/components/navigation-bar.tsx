"use client";

import { useAppContext } from "@/context/app-context";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCartIcon from "./icon/shopping-cart-icon";

export default function NavigationBar() {
  const {
    globalState,
    setGlobalState,
    getTotalProductAmountFromCart,
    getTotalPriceFromCart,
  } = useAppContext();
  const cookies = useCookies();

  const logout = () => {
    cookies.remove("token");
    setGlobalState((prevState) => ({
      ...prevState,
      user: null,
      cart: [],
    }));
    redirect("/");
  };

  return (
    <>
      <nav className="bg-[#00ADB5] dark:bg-[#006F6C] text-white p-4">
        <ul className="flex w-full justify-between space-x-4">
          <div className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="hover:text-gray-200 dark:hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            {globalState.user !== null && (
              <>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-gray-200 dark:hover:text-gray-300"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    className="hover:text-gray-200 dark:hover:text-gray-300"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-gray-200 dark:hover:text-gray-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="flex items-center space-x-2">
                    <div className="text-dark dark:text-white">
                      <ShoppingCartIcon />
                    </div>

                    {getTotalProductAmountFromCart() > 0 && (
                      <h3>
                        ({getTotalProductAmountFromCart()} -{" "}
                        {Number(getTotalPriceFromCart()).toFixed(2)} $)
                      </h3>
                    )}
                  </Link>
                </li>
              </>
            )}
          </div>

          <div className="flex space-x-4">
            {globalState.user === null ? (
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-200 dark:hover:text-gray-300"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="hover:text-gray-200 dark:hover:text-gray-300"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}
