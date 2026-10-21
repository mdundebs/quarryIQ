import React, { useState, useRef, useEffect } from 'react';
import { Info, Plug, Calculator, Briefcase, X } from 'lucide-react';

interface DataProvenanceProps {
  hardwareSource: string;
  calculationLogic: string;
  businessValue: string;
}

export const DataInfoTooltip: React.FC<DataProvenanceProps> = ({ 
  hardwareSource, 
  calculationLogic, 
  businessValue 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY - 10,
          left: rect.left + window.scrollX + rect.width / 2,
        });
      }
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      <button 
        ref={buttonRef}
        className="w-5 h-5 flex items-center justify-center rounded-full bg-stone-700 text-stone-300 hover:bg-[#FFC72C] hover:text-[#0B0B0F] transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View data provenance"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {isOpen && (
        <div 
          className="fixed z-[9999] -translate-x-1/2 -translate-y-full w-80 bg-[#1A1A1F] border border-stone-700 text-stone-200 text-xs rounded-xl shadow-2xl"
          style={{ top: coords.top, left: coords.left }}
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-stone-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="p-4 space-y-4">
            <div className="flex items-start gap-2">
              <Plug className="w-4 h-4 text-[#FFC72C] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-[#FFC72C] uppercase text-[10px] tracking-wider">Hardware Source</h4>
                <p className="text-[11px] text-stone-300 leading-tight mt-0.5">{hardwareSource}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calculator className="w-4 h-4 text-[#FFC72C] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-[#FFC72C] uppercase text-[10px] tracking-wider">Calculation Logic</h4>
                <p className="text-[11px] text-stone-300 leading-tight mt-0.5">{calculationLogic}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 text-[#FFC72C] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-[#FFC72C] uppercase text-[10px] tracking-wider">Business Value</h4>
                <p className="text-[11px] text-stone-300 leading-tight mt-0.5">{businessValue}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1A1A1F]"></div>
        </div>
      )}
    </div>
  );
};
