import { Metadata } from "next";
import Link from "next/link";
import { FileText, Users, Settings, LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "WPLearn - Admin",
  description: "Trang quản trị hệ thống WPLearn",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans flex flex-col md:flex-row">
      {/* Sidebar Responsive */}
      <aside className="w-full md:w-64 bg-[#0A2540] text-white flex flex-col shadow-xl z-10 sticky top-0 md:h-screen">
        <div className="p-5 md:p-6 border-b border-white/10 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-serif tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-lg italic">W</span>
            Admin
          </Link>
          <Link href="/" className="md:hidden text-sm text-blue-300 hover:text-white">Xem Website</Link>
        </div>
        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap">
            <FileText className="w-5 h-5" />
            Quản lý Bài viết
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap">
            <Users className="w-5 h-5" />
            Người dùng
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap">
            <Settings className="w-5 h-5" />
            Hệ thống
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 hidden md:block">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 font-medium rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
