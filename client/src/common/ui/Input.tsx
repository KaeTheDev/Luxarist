import React, { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({ label, error, icon, className = "", ...props }, ref) {

        // Internal logic using arrow functions
        const getBorderClass = () => {
            if(error) return "border-red-500 focus:ring-red-100";
            return "border-gray-300 focus:ring-gray-400 focus:border-gray-400";
        };
        return (
            <div className="flex-1 space-y-1.5 text-left w-full">
              <label className="text-xs font-medium text-gray-700 block leading-tight">
                {label}
              </label>
              
              <div className="relative">
                {/* If an icon is provided, absolute-position it */}
                {icon && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                  </div>
                )}
                
                <input
                  ref={ref}
                  className={`
                    w-full h-11 px-3 py-2.5 border rounded-xl outline-none transition-all text-sm
                    placeholder:text-gray-400
                    ${icon ? "pl-10" : "pl-3"} 
                    ${getBorderClass()}
                    ${className}
                  `}
                  {...props}
                />
              </div>
      
              {error && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold uppercase tracking-wider italic">
                  {error}
                </p>
              )}
            </div>
          );
        }
      );

Input.displayName = "Input";