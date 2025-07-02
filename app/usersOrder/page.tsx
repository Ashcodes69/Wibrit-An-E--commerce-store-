"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function UsersOrder() {
      const router = useRouter();
      useEffect(() => {
        if (!localStorage.getItem("token")) {
          router.push("/");
        }
      }, [router]);
  return (
    <div className="container bg-slate-400 m-auto">
      <h1 className="font-bold text-xl">My Orders</h1>
      <div className="item">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Job
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Employed
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    John Michael
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Manager
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    23/04/18
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <a
                    href="#"
                    className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                  >
                    Edit
                  </a>
                </td>
              </tr>          
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersOrder;
