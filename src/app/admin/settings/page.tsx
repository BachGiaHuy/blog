import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Settings as SettingsIcon } from "lucide-react";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <header className="bg-white px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm z-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Hệ Thống</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Cài đặt và cấu hình website</p>
        </div>
      </header>

      <div className="p-6 md:p-10 flex-1 overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center justify-center p-16">
          <SettingsIcon className="w-16 h-16 text-gray-300 mb-6" />
          <h2 className="text-xl font-bold text-gray-900">Tính năng đang phát triển</h2>
          <p className="text-gray-500 mt-2 text-center max-w-sm">Phần cài đặt hệ thống sẽ sớm được ra mắt trong các bản cập nhật tiếp theo của WPLearn.</p>
        </div>
      </div>
    </>
  );
}
