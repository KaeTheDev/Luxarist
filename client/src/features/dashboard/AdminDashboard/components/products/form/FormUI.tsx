interface SpecSelectProps {
  label: string;
  value: string | undefined;
  options: string[];
  onChange: (value: string) => void;
}

export const SpecSelect = ({ label, value, options, onChange }: SpecSelectProps) => (
  <div className="space-y-2 group">
    <label className="text-[10px] uppercase tracking-[0.15em] text-stone-400 ml-1 font-bold group-focus-within:text-stone-900 transition-colors">
      {label}
    </label>
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-4 bg-stone-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-stone-100 focus:border-stone-200 appearance-none transition-all cursor-pointer outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Custom Chevron for that luxury feel */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-300">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

interface SpecInputProps {
  placeholder: string;
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
}

export const SpecInput = ({ placeholder, value, onChange, className = "" }: SpecInputProps) => (
  <input
    placeholder={placeholder}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className={`p-3 bg-white border border-stone-100 rounded-xl text-xs outline-none focus:border-stone-300 focus:ring-2 focus:ring-stone-50 transition-all placeholder:text-stone-300 ${className}`}
  />
);