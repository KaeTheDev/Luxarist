import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    isLoading,
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles = "h-12 w-full rounded-xl font-medium text-sm transition-all shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-black text-white hover:bg-gray-800 active:scale-[0.98]",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${className}`} 
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            {/* Simple CSS Spinner */}
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          children
        )}
      </button>
    );
  };  