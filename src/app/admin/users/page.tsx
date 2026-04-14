import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Users as UsersIcon } from "lucide-react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <header className="bg-white px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm z-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Người Dùng</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Quản lý tài khoản đăng nhập trên hệ thống</p>
        </div>
      </header>

      <div className="p-6 md:p-10 flex-1 overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[700px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-600 text-sm">
                <th className="font-bold p-5">Tên hiển thị</th>
                <th className="font-bold p-5">Email</th>
                <th className="font-bold p-5">Ngày đăng ký</th>
                <th className="font-bold p-5 text-center">Vai trò</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <UsersIcon className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900">Không có dữ liệu</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 font-bold text-gray-900">
                      {user.name || "Chưa cập nhật"}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5 text-center">
                      <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                        Admin
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
