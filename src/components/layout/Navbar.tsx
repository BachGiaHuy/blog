"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LogIn, UserPlus, LogOut, User as UserIcon, Search, Edit3 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <a href="/" className="flex items-center space-x-2 shrink-0">
          <BookOpen className="h-7 w-7 text-blue-600" />
          <span className="font-extrabold text-2xl tracking-tighter text-gray-900">WPLearn</span>
        </a>
        
        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết, khóa học..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm text-gray-900 placeholder-gray-500 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3 shrink-0">
          <button className="hidden sm:flex md:hidden items-center text-gray-700 hover:text-blue-600 transition">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/write">
            <button className="hidden sm:flex items-center text-gray-800 hover:text-blue-600 font-bold text-base transition space-x-1 pr-4 border-r border-gray-200">
              <Edit3 className="w-4 h-4" />
              <span>Viết bài</span>
            </button>
          </Link>

          {session ? (
            <div className="flex items-center space-x-4 pl-2">
              <button className="flex items-center space-x-2 hover:opacity-80 transition group">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-extrabold border border-blue-200 group-hover:ring-2 ring-blue-500 ring-offset-1">
                  {session.user?.name?.charAt(0) || <UserIcon className="w-4 h-4" />}
                </div>
              </button>
              <button 
                onClick={() => signOut()}
                className="text-base font-bold text-gray-600 hover:text-red-600 transition"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 pl-2">
              <Link href="/login">
                <button className="text-gray-800 hover:text-blue-600 font-bold text-base px-3 py-2 transition-colors">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-base font-bold transition-colors flex items-center shadow-sm hover:shadow">
                  Đăng ký
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Category Navigation (Secondary Nav) */}
      <div className="hidden md:block w-full border-t border-gray-50 bg-white shadow-sm pb-1">
        <div className="container mx-auto px-4 max-w-7xl flex items-center space-x-8 lg:space-x-10 h-14 overflow-x-auto hide-scrollbar">
          {[
            { name: "Dành cho bạn", href: "/" },
            { name: "Tuyển dụng", href: "/tuyen-dung" },
            { name: "Wordpress Cơ Bản", href: "/category/wordpress-co-ban" },
            { name: "Lập trình Theme", href: "/category/lap-trinh-theme" },
            { name: "Lập trình Plugin", href: "/category/lap-trinh-plugin" },
            { name: "Kinh nghiệm thực tế", href: "/category/kinh-nghiem" },
          ].map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <Link key={cat.name} href={cat.href} className={`text-base whitespace-nowrap py-3 font-bold relative transition-colors ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-gray-900'}`}>
                {cat.name}
                {isActive && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-lg"></div>}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  );
}
