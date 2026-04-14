import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <h3 className="text-xl font-bold text-gray-800">Đang tải dữ liệu...</h3>
      <p className="text-gray-500 font-medium">Vui lòng chờ trong giây lát.</p>
    </div>
  );
}
