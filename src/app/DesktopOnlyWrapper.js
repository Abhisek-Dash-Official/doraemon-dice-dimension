'use client';

import { useState, useEffect } from 'react';

export default function DesktopOnlyWrapper({ children }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      // Consider desktop as width >= 1024px
      setIsDesktop(window.innerWidth >= 1024);
      setIsLoading(false);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-linear-to-br from-blue-400 via-cyan-300 to-blue-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background clouds */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-40 h-20 bg-white rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-18 bg-white rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Doraemon character (simplified) */}
        <div className="mb-8 relative inline-block">
          <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto relative shadow-2xl border-4 border-blue-600 animate-pulse">
            {/* Face */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-20 bg-white rounded-full"></div>
            {/* Eyes */}
            <div className="absolute top-8 left-8 w-8 h-10 bg-white rounded-full border-2 border-black">
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-8 right-8 w-8 h-10 bg-white rounded-full border-2 border-black">
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
            </div>
            {/* Nose */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
            {/* Whiskers */}
            <div className="absolute top-20 left-2 w-8 h-0.5 bg-black"></div>
            <div className="absolute top-22 left-2 w-8 h-0.5 bg-black"></div>
            <div className="absolute top-20 right-2 w-8 h-0.5 bg-black"></div>
            <div className="absolute top-22 right-2 w-8 h-0.5 bg-black"></div>
            {/* Bell */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600"></div>
          </div>

          {/* Anywhere Door animation */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-24 bg-pink-400 rounded-lg border-4 border-pink-600 shadow-lg animate-pulse" style={{ animationDuration: '2s' }}>
            <div className="absolute top-1/2 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
          Journey to Doraemon!
        </h1>

        <p className="text-xl text-blue-900 mb-6 font-semibold">
          Loading your adventure...
        </p>

        {/* Loading bar */}
        <div className="max-w-md mx-auto bg-white/30 rounded-full h-4 overflow-hidden backdrop-blur-sm border-2 border-white/50">
          <div className="h-full bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse rounded-full" style={{ width: '80%' }}></div>
        </div>

        <p className="text-sm text-blue-800 mt-6 font-medium">
          Reach square 100 where Doraemon is waiting! ✨
        </p>
      </div>
    </div>;
  }

  // Show desktop-only message if not desktop
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Desktop Only
            </h1>
            <p className="text-purple-200 mb-6">
              This application is optimized for desktop screens. Please visit on a desktop or laptop computer for the best experience.
            </p>
            <div className="text-sm text-purple-300">
              Minimum width required: 1024px
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render children if desktop
  return <>{children}</>;
}