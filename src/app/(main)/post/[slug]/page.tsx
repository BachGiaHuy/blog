import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise required in Next.js 15+
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Try to fetch from DB first with error handling
  let post = null;
  
  try {
    post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true }
    });
  } catch (error) {
    console.error("Post Detail Data Fetch Error:", error);
    // post remains null, will try mock fallback below
  }

  // If not found in DB, we mock data to keep the UI from breaking for the hardcoded links
  if (!post) {
    if (slug.startsWith("p")) {
      post = {
        id: slug,
        title: "Hướng dẫn cài đặt và thiết lập WordPress từ con số 0",
        slug: slug,
        content: "<p>Đây là nội dung bài viết mẫu. Trong tương lai, nội dung này sẽ được hiển thị từ Database sau khi bạn thêm dữ liệu qua trang Quản trị viên (Admin).</p><br/><h3><strong>Bước 1: Tải mã nguồn</strong></h3><p>Truy cập wordpress.org để tải phiên bản mới nhất...</p><h3><strong>Bước 2: Cài đặt Database</strong></h3><p>Sử dụng phpMyAdmin hoặc thao tác qua command line để tạo một database rỗng...</p>",
        excerpt: "Tóm tắt mẫu: Hướng dẫn dành cho người mới bắt đầu lập trình web và WordPress.",
        coverImage: `/images/images-blog/${slug.replace("p", "")}.jpg`,
        level: "BASIC",
        published: true,
        authorId: "mock",
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          id: "mock",
          name: "WPLearn Team",
          email: "mock",
          password: "",
          image: null,
          role: "USER" as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      };
    } else {
      notFound();
    }
  }

  // Handle image extension mismatch fallback for mock (e.g., 2.webp not 2.jpg)
  const coverImageUrl = post.coverImage?.includes(".jpg") && slug === "p2" ? "/images/images-blog/2.webp" : post.coverImage;

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      {/* Header Image if available */}
      {coverImageUrl && (
        <div className="w-full h-[350px] md:h-[450px] relative bg-slate-900 overflow-hidden">
          <img src={coverImageUrl} alt={post.title} className="w-full h-full object-cover opacity-80" />
        </div>
      )}

      <div className={`container mx-auto px-4 max-w-3xl ${coverImageUrl ? 'mt-[-80px] relative z-10' : 'pt-12'}`}>
        
        {/* Breadcrumb & Navigation */}
        <div className="bg-white p-4 shadow-md rounded-xl flex items-center justify-between mb-8 border border-gray-100/50">
          <Link href="/" className="text-gray-500 hover:text-blue-600 flex items-center gap-1.5 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Trở về trang chủ
          </Link>
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            {post.level === "BASIC" ? "Cơ bản" : "Nâng cao"}
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-serif text-[#051C33] leading-[1.1] mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 border-t border-b border-gray-100 py-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#051C33] flex items-center justify-center text-white font-serif italic mr-3 shrink-0">
              {post.author?.name ? post.author.name.charAt(0).toUpperCase() : 'W'}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{post.author?.name || 'WPLearn Staff'}</div>
              <div className="text-xs mt-0.5">{new Date(post.createdAt).toLocaleDateString("vi-VN", { year: 'numeric', month: 'long', day: 'numeric' })} • Đọc 5 phút</div>
            </div>
          </div>

          {/* Article Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 font-serif italic border-l-4 border-[#3B5998] pl-5 mb-10 leading-relaxed bg-[#F9F9F9] py-3 pr-3 rounded-r">
              {post.excerpt}
            </p>
          )}

          {/* Dynamic Content */}
          <div className="prose prose-lg max-w-none prose-blue text-gray-800 font-serif leading-[1.8] prose-h2:text-[#051C33] prose-h3:text-[#051C33] prose-p:mb-6 prose-a:text-[#3B5998]" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
      </div>
    </div>
  );
}
