"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPost() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    content: "",
    level: "BASIC",
  });

  if (status === "loading") return <div className="p-10 text-center">Đang tải...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Thêm bài viết thành công!");
        router.push("/admin"); // Quay lại trang danh sách admin (sẽ tạo sau)
      } else {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="container mx-auto px-4 max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="border-b border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3 w-full sm:w-auto mb-4 sm:mb-0">
            <Link href="/" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Soạn Bài Viết Mới</h1>
              <p className="text-xs text-gray-500">Người đăng: {session.user?.name || session.user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 transition font-medium active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? "Đang lưu..." : "Đăng bài viết"}
          </button>
        </div>

        {/* Editor Form */}
        <div className="p-6 md:p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tiêu đề bài viết <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Ví dụ: Hướng dẫn cài đặt WordPress chuyên nghiệp..."
                className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-lg font-medium text-slate-800"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cấp độ bài viết</label>
                <select
                  className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none bg-white text-gray-700"
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: e.target.value })}
                >
                  <option value="BASIC">Cơ bản (Cho người mới)</option>
                  <option value="ADVANCED">Nâng cao (Coder/Developer)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ảnh bìa (URL gốc)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-700"
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                />
              </div>
            </div>

            {formData.coverImage && (
              <div className="mt-2 w-full h-40 bg-gray-100 rounded border border-gray-200 overflow-hidden relative">
                <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn (Excerpt)</label>
              <textarea
                placeholder="Tóm tắt ngắn gọn nội dung bài viết để hiển thị ngoài trang chủ..."
                rows={2}
                className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none text-gray-700"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex justify-between items-end">
                <span>Nội dung bài viết <span className="text-red-500">*</span></span>
                <span className="text-xs text-gray-400 font-normal">Hỗ trợ định dạng HTML/Markdown cơ bản</span>
              </label>
              <textarea
                placeholder="Viết nội dung của bạn vào đây..."
                rows={15}
                className="w-full p-4 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-slate-800 font-serif leading-relaxed text-base resize-y"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
