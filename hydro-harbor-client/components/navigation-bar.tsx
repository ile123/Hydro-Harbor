"use client";

import { useAppContext } from "@/context/app-context";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NavigationBar() {
  const { globalState, setGlobalState } = useAppContext();
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
                href="/profile"
                className="hover:text-gray-200 dark:hover:text-gray-300"
              >
                Profile
              </Link>
            </li>
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
