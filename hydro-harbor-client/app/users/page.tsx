"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/user";
import { User } from "@/types/user/User";

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await fetchUsers();
      if (result.status === 200) {
        setData(result.data);
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {data.length === 0 ? (
        <h3>No Users found.</h3>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="overflow-y-auto max-h-[500px] w-full">
            <table className="min-w-full bg-gray-50 dark:bg-[#282C34]">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600 font-medium text-gray-900 dark:text-white text-center w-1/2">
                    Full Name
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600 font-medium text-gray-900 dark:text-white text-center w-1/2">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="bg-white dark:bg-gray-800">
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-center text-gray-900 dark:text-white">
                      {item.fullName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-center text-gray-900 dark:text-white">
                      {item.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
