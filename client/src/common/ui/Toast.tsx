import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-right-4">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
        type === "success" 
          ? "bg-white border-stone-100 text-stone-900" 
          : "bg-red-50 border-red-100 text-red-900"
      }`}>
        {type === "success" && <CheckCircle2 size={18} className="text-green-500" />}
        <span className="text-sm font-medium tracking-tight">{message}</span>
        <button onClick={onClose} className="ml-2 p-1 hover:bg-stone-50 rounded-full transition-colors">
          <X size={14} className="text-stone-400" />
        </button>
      </div>
    </div>
  );
}