import { Check } from "lucide-react";

interface StatusStepProps {
    title: string;
    date: string;
    completed: boolean;
    isLast?: boolean; 
  }

export default function StatusStep({ title, date, completed, isLast = false }: StatusStepProps) {
    return (
      <div className="flex gap-6 relative z-10">
        {/* The Dot & The Line */}
        <div className="relative flex flex-col items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 z-20 transition-all duration-700 ${
            completed ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-200'
          }`}>
            {completed ? <Check size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-stone-100" />}
          </div>
          
          {!isLast && (
            <div className="absolute top-6 w-px h-8 bg-stone-100 z-10" />
          )}
        </div>
  
        <div className="space-y-0.5 pb-8"> 
          <p className={`text-sm font-semibold tracking-tight ${completed ? 'text-stone-900' : 'text-stone-300'}`}>
              {title}
          </p>
          <p className="text-[11px] text-stone-400 font-medium tracking-tight italic">
              {date}
          </p>
        </div>
      </div>
    );
  }