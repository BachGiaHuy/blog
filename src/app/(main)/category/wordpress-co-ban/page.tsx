import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, BookOpen } from "lucide-react";

// Mock Data using images from /images/images-blog/ completely for fallback
const MOCK_BASIC_POSTS = [
  {
    id: "basic-1",
    title: "Hướng dẫn cài đặt WordPress Localhost cho người mới bắt đầu",
    date: "12 Th4, 2026",
    readTime: "5 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/1.jpg"
  },
  {
    id: "basic-2",
    title: "Phân biệt Bài viết (Post) và Trang (Page) trong WordPress",
    date: "10 Th4, 2026",
    readTime: "4 phút đọc",
    author: "Hoang Nguyen",
    image: "/images/images-blog/2.webp"
  },
  {
    id: "basic-3",
    title: "Cách cài đặt Theme và Plugin an toàn không bị dính mã độc",
    date: "09 Th4, 2026",
    readTime: "7 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/3.jpg"
  },
  {
    id: "basic-4",
    title: "Cấu hình Cài đặt Tổng quan (General Settings) chuẩn SEO 2026",
    date: "08 Th4, 2026",
    readTime: "6 phút đọc",
    author: "Amanda",
    image: "/images/images-blog/4.png"
  },
  {
    id: "basic-5",
    title: "Tạo Menu và Widget điều hướng chuyên nghiệp",
    date: "05 Th4, 2026",
    readTime: "5 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/5.jpg"
  },
  {
    id: "basic-6",
    title: "Quản lý Người dùng (Users) và Phân quyền cơ bản",
    date: "02 Th4, 2026",
    readTime: "4 phút đọc",
    author: "Admin",
    image: "/images/images-blog/6.webp"
  }
];

export default async function WordPressCoBanPage() {
  // Fetch only posts categorized as "BASIC" (Cơ bản)
  const dbPosts = await prisma.post.findMany({
    where: { 
      published: true,
      level: "BASIC" 
    },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  // Map real posts into the grid format
  const mappedDbPosts = dbPosts.map((post: any) => ({
    id: post.slug,
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString("vi-VN", { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: "5 phút đọc",
    author: post.author.name || "WPLearn Author",
    image: post.coverImage || "/images/images-blog/11.webp"
  }));

  // Create combined grid: DB posts first, then backfill
  const combinedGridPosts = [...mappedDbPosts, ...MOCK_BASIC_POSTS].slice(0, 9);

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về trang chủ
          </Link>
        </div>

        {/* HEADER SECTION */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-blue-50/50 to-white">
          <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">WordPress Cơ Bản</h1>
            <p className="text-lg text-gray-600 font-medium max-w-2xl">
              Nơi lưu trữ và tổng hợp toàn bộ các bài viết hướng dẫn WordPress từ con số 0. Giúp bạn nắm vững kiến thức nền tảng một cách bài bản nhất.
            </p>
          </div>
        </div>

        {/* POSTS GRID */}
        {combinedGridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16 px-2">
            {combinedGridPosts.map((post) => (
              <div key={post.id} className="flex flex-col group cursor-pointer">
                <Link href={post.id.startsWith('basic-') ? '#' : `/post/${post.id}`} className="relative aspect-[16/10] w-full overflow-hidden mb-4 rounded-xl shadow-sm block ring-1 ring-black/5">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                
                <Link href={post.id.startsWith('basic-') ? '#' : `/post/${post.id}`}>
                  <h3 className="text-[17px] font-bold text-black leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="mt-auto flex items-center text-xs font-semibold text-gray-700 flex-wrap gap-1">
                  <span className="text-gray-900 font-bold">{post.author}</span>
                  <span className="mx-1 hidden sm:inline">•</span>
                  <span>{post.date}</span>
                  <span className="mx-1 hidden sm:inline">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-xl text-gray-500 font-medium">Chưa có bài viết nào trong chuyên mục này.</p>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center border-t border-gray-200 pt-16 mt-6">
          <div className="flex space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
          </div>
        </div>

      </div>
    </div>
  );
}
