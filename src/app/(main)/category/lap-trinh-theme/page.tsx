import Link from "next/link";
import { ArrowLeft, Code } from "lucide-react";
import LiveEditor from "@/components/playground/LiveEditor";

export default function LaptRinhThemePage() {
  return (
    <div className="container mx-auto px-4 max-w-[1400px] py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Về trang chủ
        </Link>
      </div>
      
      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wider inline-block">
              Thực hành Code
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Môi trường giả lập <span className="text-blue-600">Theme</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
              Không cần cài đặt rườm rà. Hãy thử thiết kế và cắt HTML/CSS giao diện ngay trên trình duyệt với công cụ WPLearn Playground mạnh mẽ!
            </p>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-blue-50 rounded-[2rem] flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-500">
              <Code className="w-20 h-20 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Playground */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Khu vực Trải nghiệm</h2>
      <LiveEditor />
    </div>
  );
}
