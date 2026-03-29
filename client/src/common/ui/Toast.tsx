/**
 * Purpose: Renders a transient feedback notification anchored to the bottom-right
 * of the viewport.
 *
 * Responsibilities:
 * - Display a success or error message with the appropriate icon.
 * - Provide a close button that calls onClose to let the parent clear the state.
 * - Handle its own positioning and entrance animation.
 *
 * Usage:
 *   {toast && (
 *     <Toast
 *       message={toast.message}
 *       type={toast.type}
 *       onClose={() => setToast(null)}
 *     />
 *   )}
 */

import { CheckCircle2, XCircle, X } from "lucide-react";
 
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
        {type === "success"
          ? <CheckCircle2 size={18} className="text-green-500 shrink-0" />
          : <XCircle size={18} className="text-red-500 shrink-0" />
        }
        <span className="text-sm font-medium tracking-tight">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-stone-50 rounded-full transition-colors"
        >
          <X size={14} className="text-stone-400" />
        </button>
      </div>
    </div>
  );
}