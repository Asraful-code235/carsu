"use client";

import { useState } from "react";

export function DropdownWidthDebug() {
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const widthMap = {
    sm: 'w-[320px]', // Exactly 320px
    md: 'w-[480px]', // Exactly 480px  
    lg: 'w-[640px]', // Exactly 640px
    xl: 'w-[800px]', // Exactly 800px
    full: 'w-screen container',
  };

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-mono z-50"
      >
        {isVisible ? 'Hide' : 'Show'} Width Debug
      </button>
      
      {isVisible && (
        <div className="fixed top-16 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
          <h3 className="font-bold mb-3">🔧 Dropdown Width Reference</h3>
          <div className="space-y-2">
            {Object.entries(widthMap).map(([key, className]) => (
              <div key={key} className="border border-gray-600 rounded p-2">
                <div className="text-yellow-400 mb-1">{key.toUpperCase()}: {className}</div>
                <div className={`bg-blue-500 h-4 ${className}`}></div>
                <div className="text-gray-400 text-xs mt-1">
                  {key === 'sm' && '320px'}
                  {key === 'md' && '480px'}
                  {key === 'lg' && '640px'}
                  {key === 'xl' && '800px'}
                  {key === 'full' && 'Full width'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400">
            Hover over your dropdown to compare with these reference widths
          </div>
        </div>
      )}
    </>
  );
}
