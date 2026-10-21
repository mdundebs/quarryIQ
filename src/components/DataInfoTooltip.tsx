import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface DataInfoTooltipProps {
  text: string;
}

export const DataInfoTooltip: React.FC<DataInfoTooltipProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative inline-block ml-1.5" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="text-stone-400 hover:text-[#B38300] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Data source information"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-stone-900 text-white text-[11px] p-3 rounded-lg shadow-xl pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900"></div>
        </div>
      )}
    </div>
  );
};
