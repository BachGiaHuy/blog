import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Mock Data using images from /images/images-blog/
const MOCK_GRID_POSTS = [
  {
    id: "p1",
    title: "Nhật ký cập nhật: Bot Telegram mới và Đăng ký nhận bản tin miễn phí",
    date: "12 Th4, 2026",
    readTime: "3 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/1.jpg"
  },
  {
    id: "p2",
    title: "Top 10 Theme WordPress Sáng Tập và Mang Đậm Dấu Ấn Cá Nhân",
    date: "10 Th4, 2026",
    readTime: "9 phút đọc",
    author: "Amanda Coopersmith",
    image: "/images/images-blog/2.webp"
  },
  {
    id: "p3",
    title: "Chia Sẻ Quyền Truy Cập Miễn Phí Cho Bạn Bè Cùng Đăng Ký Bản Tin",
    date: "09 Th4, 2026",
    readTime: "3 phút đọc",
    author: "Rob Pugh",
    image: "/images/images-blog/3.jpg"
  },
  {
    id: "p4",
    title: "Cách WordPress 7.0 Xây Dựng Nền Tảng Cho Website Tích Hợp AI",
    date: "08 Th4, 2026",
    readTime: "4 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/4.png"
  },
  {
    id: "p5",
    title: "Mới trong thư viện: Studio CLI trên npm và Cổng truy cập phpMyAdmin",
    date: "07 Th4, 2026",
    readTime: "3 phút đọc",
    author: "Alexa Poduzzi",
    image: "/images/images-blog/5.jpg"
  },
  {
    id: "p6",
    title: "Plugin, Global Styles và nhiều hơn nữa: Hiện có trên mọi Gói Trả Phí",
    date: "02 Th4, 2026",
    readTime: "3 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/6.webp"
  },
  {
    id: "p7",
    title: "Cách công ty tư vấn trở thành Đối tác hàng đầu nhờ đầu tư nền tảng số",
    date: "31 Th3, 2026",
    readTime: "3 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/7.jpg"
  },
  {
    id: "p8",
    title: "Xu hướng Thiết kế Diễn đàn 2026: Tương tác, AI và Quyền sở hữu",
    date: "30 Th3, 2026",
    readTime: "7 phút đọc",
    author: "Maddy Osman",
    image: "/images/images-blog/8.jpg"
  },
  {
    id: "p9",
    title: "Nhật ký cập nhật: Cho phép đặc vụ AI hoạt động trên Website của bạn",
    date: "27 Th3, 2026",
    readTime: "4 phút đọc",
    author: "WPLearn Team",
    image: "/images/images-blog/9.webp"
  }
];

const NAV_CATEGORIES = [
  "Tin tức & Tính năng",
  "Dành cho lập trình viên",
  "Hướng dẫn WordPress Cơ Bản",
  "Theme & Plugin Nâng Cao",
  "Câu chuyện khách hàng",
  "Hệ sinh thái WPLearn"
];

export default async function Home() {
  // Fetch real posts from DB
  const dbPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
    take: 10
  });

  // Map real posts into the grid format
  const mappedDbPosts = dbPosts.map(post => ({
    id: post.slug,
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString("vi-VN", { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: "5 phút đọc", // Fixed estimation for now
    author: post.author.name || "WPLearn Author",
    image: post.coverImage || "/images/images-blog/11.webp" // default fallback
  }));

  // Create combined grid: DB posts first, then backfill with mock posts to always look full
  const combinedGridPosts = [...mappedDbPosts, ...MOCK_GRID_POSTS].slice(0, Math.max(9, mappedDbPosts.length));

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-24">
        
        {/* FEATURED POST (Banner) */}
        <div className="flex flex-col md:flex-row mb-12 bg-[#F9F9F9] min-h-[400px] rounded-xl overflow-hidden border border-gray-100">
          {/* Left: Image Banner */}
          <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[400px] bg-[#3B5998]">
            <img 
              src="/images/banner_main.png" 
              alt="Featured Banner" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Right: Content */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-4">
              NỔI BẬT NHẤT
            </span>
            <Link href={`/post/${combinedGridPosts[0].id}`} className="group">
              <h2 className="text-3xl md:text-4xl font-serif text-black leading-tight mb-4 group-hover:text-blue-700 transition-colors">
                Cách Tối Ưu Hóa Giao Diện WordPress Cho Người Mới Bắt Đầu
              </h2>
            </Link>
            <p className="text-gray-800 font-medium text-sm md:text-base leading-relaxed mb-8">
              Khám phá các bí quyết thiết kế website WordPress chuyên nghiệp, chuẩn SEO và thân thiện với bài học kinh nghiệm từ các chuyên gia.
            </p>
            
            <div className="mt-auto flex items-center text-xs font-medium text-gray-700">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-serif italic mr-2 shrink-0">
                W
              </div>
              <span className="font-bold mr-1 text-gray-900">WordPress.com Staff</span>
              <span className="mx-1.5 hidden sm:inline"></span>
              <span className="hidden sm:inline">13 Th4, 2026 • 3 phút đọc</span>
            </div>
            {/* Mobile wrap line for meta */}
            <div className="sm:hidden text-xs font-medium text-gray-700 mt-1 pl-8">
              13 Th4, 2026 • 3 phút đọc
            </div>
          </div>
        </div>

        {/* NAVIGATION BAR SECTION */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {[
              { name: "Dành cho bạn", href: "/" },
              { name: "Tuyển dụng", href: "/tuyen-dung" },
              { name: "WordPress Cơ Bản", href: "/category/wordpress-co-ban" },
              { name: "Lập trình Theme", href: "/category/lap-trinh-theme" },
              { name: "Lập trình Plugin", href: "/category/lap-trinh-plugin" },
              { name: "Kinh nghiệm thực tế", href: "/category/kinh-nghiem" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`px-6 py-3 text-[14px] font-bold border rounded-2xl transition-all duration-300 shadow-sm flex items-center justify-center whitespace-nowrap tracking-tight
                  ${cat.href === "/" 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200 scale-105" 
                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16 px-2">
          {combinedGridPosts.map((post) => (
            <div key={post.id} className="flex flex-col group cursor-pointer">
              <Link href={`/post/${post.id}`} className="relative aspect-[16/10] w-full overflow-hidden mb-4 rounded-xl shadow-sm block ring-1 ring-black/5">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              
              <Link href={`/post/${post.id}`}>
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

        {/* SHOW MORE BUTTON */}
        <div className="flex justify-center border-t border-gray-200 pt-16 mt-6">
          <button className="px-8 py-3 bg-white border border-gray-400 rounded-lg text-gray-900 text-sm font-bold hover:bg-gray-100 hover:border-gray-500 transition-all cursor-pointer shadow-sm active:scale-95">
            Tải thêm bài viết
          </button>
        </div>

      </div>
    </div>
  );
}
