import React from "react";
import {
  AlertTriangle,
  XCircle,
  HeartCrack,
  RefreshCw,
  Users,
} from "lucide-react";

export default function FailureBanner({ failed, restartGame }) {
  const failedPlayers = failed || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Banner Container */}
      <div className="relative w-[700px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/failure.png)" }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-4">
          {/* Title */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-red-600/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-xl border-2 border-red-700">
              <AlertTriangle className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-black text-white">MISSION FAILED</h1>
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[380px] overflow-y-auto w-full space-y-3">
            <div className="mb-3">
              <p className="text-2xl font-bold text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1 flex items-center justify-center gap-2">
                <XCircle className="w-7 h-7" />
                The Alien Techno-Thief Escaped!
              </p>
              <p className="text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Not all team members could reach Doraemon in time...
              </p>
            </div>

            {/* Failed Players */}
            <div className="backdrop-blur-sm rounded-lg p-3 border-2 border-red-500 shadow-lg">
              <h2 className="text-base font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center justify-center gap-2">
                <HeartCrack className="w-6 h-6 text-red-400" /> Team Lost:
                Players did not reach 100 in time{" "}
                <HeartCrack className="w-6 h-6 text-red-400" />
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {failedPlayers.map((name) => (
                  <span
                    key={name}
                    className="text-lg font-black text-red-300 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-red-400 shadow-lg"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Message */}
            <div className="backdrop-blur-sm rounded-lg p-3 border-2 border-blue-400 shadow-lg">
              <p className="text-base font-bold text-blue-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Team Succeeds Together or Fails Together
              </p>
              <p className="text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Friends never leave anyone behind. Every member must reach the
                goal!
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={restartGame}
            className="mt-4 inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg px-8 py-2 rounded-full shadow-lg border-2 border-purple-400 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            RETRY MISSION
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
