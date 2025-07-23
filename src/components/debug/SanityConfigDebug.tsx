"use client";

import { studioConfig } from "@/sanity/config/environment";

export function SanityConfigDebug() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-md">
      <h3 className="font-bold mb-2">🔧 Sanity Config Debug</h3>
      <div className="space-y-1">
        <div>Preview Origin: <span className="text-green-400">{studioConfig.previewOrigin}</span></div>
        <div>Environment: <span className="text-blue-400">{process.env.NODE_ENV}</span></div>
        <div>Is Development: <span className="text-yellow-400">{studioConfig.isDevelopment ? 'Yes' : 'No'}</span></div>
        <div>Is Production: <span className="text-red-400">{studioConfig.isProduction ? 'Yes' : 'No'}</span></div>
        <div>Window Origin: <span className="text-purple-400">{typeof window !== 'undefined' ? window.location.origin : 'N/A'}</span></div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="text-xs text-gray-400">Test Links:</div>
        <div className="mt-1">
          <a
            href="/api/draft-mode/enable"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
          >
            Test Draft Enable
          </a>
        </div>
      </div>
    </div>
  );
}
