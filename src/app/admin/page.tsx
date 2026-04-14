import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PlusCircle, FileText, Settings, Users, LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
  });

  return (
    <>
      {/* Header */}
      <header className="bg-white px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm z-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Bài Viết</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Quản lý và xuất bản nội dung của bạn</p>
        </div>
        <Link 
          href="/admin/new" 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all font-bold text-sm hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5" />
          Tạo bài mới
        </Link>
      </header>

      {/* Content */}
      <div className="p-6 md:p-10 flex-1 overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[700px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-600 text-sm">
                <th className="font-bold p-5">Tiêu đề bài viết</th>
                <th className="font-bold p-5">Cấp độ</th>
                <th className="font-bold p-5">Tác giả</th>
                <th className="font-bold p-5">Ngày xuất bản</th>
                <th className="font-bold p-5 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900">Chưa có bài viết nào</p>
                      <p className="text-sm text-gray-500 mt-1">Bấm "Tạo bài mới" để xuất bản nội dung đầu tiên của bạn.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-5">
                      <Link href={`/post/${post.slug}`} target="_blank" className="font-bold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                        {post.title}
                      </Link>
                      <div className="text-xs text-gray-400 mt-1">/{post.slug}</div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-700">
                      {post.level === "BASIC" 
                        ? <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Cơ bản</span> 
                        : <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">Nâng cao</span>}
                    </td>
                    <td className="p-5 text-sm font-semibold text-gray-700">{post.author.name || post.author.email?.split('@')[0]}</td>
                    <td className="p-5 text-sm font-medium text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("vi-VN", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${post.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {post.published ? 'Đã xuất bản' : 'Bản nháp'}
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
