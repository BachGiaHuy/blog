"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-7 w-7 text-blue-600" />
              <span className="font-extrabold text-2xl tracking-tighter text-gray-900">WPLearn</span>
            </Link>
            <p className="text-gray-700 text-base font-medium mb-6 leading-relaxed">
              WPLearn là không gian chia sẻ kiến thức, kinh nghiệm thực chiến về phát triển UI/UX, lập trình WordPress và web development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="font-extrabold text-gray-500 hover:text-blue-600 transition">FB</a>
              <a href="#" className="font-extrabold text-gray-500 hover:text-blue-400 transition">TW</a>
              <a href="#" className="font-extrabold text-gray-500 hover:text-pink-600 transition">IG</a>
              <a href="#" className="font-extrabold text-gray-500 hover:text-red-600 transition">YT</a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-base">Chuyên mục</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">WordPress Cơ bản</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Lập trình Theme</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Lập trình Plugin</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Thương mại điện tử</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-base">Về WPLearn</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Giới thiệu</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Tuyển dụng</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Liên hệ</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 text-base font-bold transition">Góp ý</Link></li>
            </ul>
          </div>

          {/* Subscribe Col */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-base">Đăng ký nhận tin</h3>
            <p className="text-gray-700 text-base font-medium mb-4">Nhận những bài viết và hướng dẫn mới nhất từ chuyên gia.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full px-4 py-3 border border-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium text-gray-900 placeholder-gray-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg text-base font-bold transition">
                Gửi
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-base font-semibold text-gray-700">
          <p>&copy; {new Date().getFullYear()} WPLearn. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-blue-600 transition">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-blue-600 transition">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
