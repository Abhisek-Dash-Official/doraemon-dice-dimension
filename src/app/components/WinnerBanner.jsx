import React from "react";
import { Trophy, Crown, Zap, Users, Play } from "lucide-react";

export default function WinnerBanner({ winners, restartGame }) {
  // Find first Rank player(s)
  const firstPlayers = Object.entries(winners)
    .filter(([_, data]) => data.rank === 1)
    .map(([name]) => name);

  // Find max points
  const maxPoints = Math.max(...Object.values(winners).map((w) => w.points));
  const maxPointsPlayers = Object.entries(winners)
    .filter(([_, data]) => data.points === maxPoints)
    .map(([name]) => name);

  // Categorize all players
  const playersList = Object.entries(winners).map(([name, data]) => ({
    name,
    isFirst: firstPlayers.includes(name),
    isMaxPoints: maxPointsPlayers.includes(name),
    points: data.points,
    rank: data.rank,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Banner Container */}
      <div className="relative w-[700px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/won.png)" }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-4">
          {/* Title */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-yellow-400/90  rounded-full px-6 py-2 shadow-xl border-2 border-yellow-500">
              <Trophy className="w-8 h-8 text-blue-900" />
              <h1 className="text-3xl font-black text-blue-900">
                MISSION ACCOMPLISHED!
              </h1>
              <Trophy className="w-8 h-8 text-blue-900" />
            </div>
          </div>

          {/* Content Box */}
          <div className="max-h-80 overflow-y-auto w-full space-y-3">
            <p className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3">
              Doraemon's 4D Pocket Recovered!
            </p>

            {/* First Place */}
            <div className=" rounded-lg p-3 border-2 border-yellow-400 shadow-lg">
              <h2 className="text-base font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center justify-center gap-2">
                <Crown className="w-7 h-7 text-yellow-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />{" "}
                First to Complete{" "}
                <Crown className="w-7 h-7 text-yellow-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {firstPlayers.map((name) => {
                  const player = playersList.find((p) => p.name === name);
                  return (
                    <span
                      key={name}
                      className="text-lg font-black text-yellow-400 bg-black/60  px-4 py-2 rounded-full border-2 border-yellow-400 shadow-lg"
                    >
                      {name} ({player.points} pts)
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Max Points */}
            <div className=" rounded-lg p-3 border-2 border-green-400 shadow-lg">
              <h2 className="text-base font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center justify-center gap-2">
                <Zap className="w-7 h-7 text-green-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />{" "}
                Top Collector ({maxPoints} pts){" "}
                <Zap className="w-7 h-7 text-green-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {maxPointsPlayers.map((name) => (
                  <span
                    key={name}
                    className="text-lg font-black text-green-400 bg-black/60  px-4 py-2 rounded-full border-2 border-green-400 shadow-lg"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Other Players */}
            {playersList.filter((p) => !p.isFirst && !p.isMaxPoints).length >
              0 && (
              <div className=" rounded-lg p-3 border-2 border-blue-400 shadow-lg">
                <h2 className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center justify-center gap-2">
                  <Users className="w-7 h-7 text-blue-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />{" "}
                  Team Victory{" "}
                  <Users className="w-7 h-7 text-blue-400 backdrop-blur-sm bg-black/50 rounded p-0.5" />
                </h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {playersList
                    .filter((p) => !p.isFirst && !p.isMaxPoints)
                    .map((player) => (
                      <span
                        key={player.name}
                        className="text-sm font-semibold text-blue-300 bg-black/50  px-3 py-1 rounded-full border border-blue-400"
                      >
                        {player.name} ({player.points})
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <button
            onClick={restartGame}
            className="mt-4 inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg px-8 py-2 rounded-full shadow-lg border-2 border-blue-300 transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5" />
            NEW MISSION
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
