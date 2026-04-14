import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KinhNghiemPage() {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Về trang chủ
        </Link>
      </div>
      
      <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
            Chuyên mục
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Kinh nghiệm thực tế
          </h1>
          <p className="text-xl text-gray-600 mb-10 font-medium max-w-2xl">
            Tổng hợp các bài học xương máu, kinh nghiệm vận hành dự án thực tế và những chia sẻ chuyên sâu về lập trình Web.
          </p>
        </div>

        <div className="py-12 border-t border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl">☕️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Chưa có bài viết mới</h3>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            Các chuyên gia của chúng tôi đang biên soạn những nội dung chất lượng nhất. Vui lòng quay lại sau nhé.
          </p>
        </div>
      </div>
    </div>
  );
}
