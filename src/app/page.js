"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Timer, Rocket, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CharectorInfo from "./components/CharectorInfo.jsx";

export default function Home() {
  const [time, setTime] = useState(3600);
  const [gameStarted, setGameStarted] = useState(false);
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  const [posDice, setPosDice] = useState(0);
  const [negDice, setNegDice] = useState(0);
  const [movement, setMovement] = useState(0);

  const charactersColorCodes = {
    Nobita: "bg-yellow-400",
    Shizuka: "bg-pink-500",
    Gian: "bg-red-600",
    Suneo: "bg-blue-500",
    Dekisugi: "bg-green-500",
  };

  const rollDice = () => {
    const p = Math.ceil(Math.random() * 6);
    const n = Math.ceil(Math.random() * 6);
    setPosDice(p);
    setNegDice(n);
    setMovement(p - n);
  };

  const getDiceIcon = (num) => {
    switch (num) {
      case 1: return <Dice1 size={100} />;
      case 2: return <Dice2 size={100} />;
      case 3: return <Dice3 size={100} />;
      case 4: return <Dice4 size={100} />;
      case 5: return <Dice5 size={100} />;
      case 6: return <Dice6 size={100} />;
      default: return <Dice6 size={100} />;
    }
  }

  useEffect(() => {
    let timer = null;
    if (!gameStarted) {
      if (time != 3600) {
        setTime(3600);
      }
    } else {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [gameStarted]);
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-black text-white flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Doraemon Dice Dimension"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold flex gap-2"><span>Doraemon Dice Dimension</span><span className="text-3xl font-bold text-blue-300 mb-3 underline">The Great Gadget Heist</span></h1>
        </div>
        <Link href="/help" className="flex items-center gap-1 hover:text-purple-400">
          <HelpCircle /> Help
        </Link>
      </div>
      {/* Character Select */}
      <div className="w-full px-6 py-3 bg-black/20 border-b border-purple-500/20 max-w-6xl  rounded-2xl">
        <div className="mx-auto">
          <h2 className="text-sm font-bold mb-2 text-purple-300">SELECT OPERATIVES</h2>
          <div className="flex gap-3">
            {Object.keys(charactersColorCodes).map((c, i) => (
              <div
                key={c}
                className={`flex-1 ${charactersColorCodes[c]} bg-opacity-10 p-3 rounded-lg 
              border border-blue-500/30 flex flex-col items-center relative`}
              >
                {/* Character Image */}
                <div className="mb-2 w-14 h-14 relative group">
                  <Image
                    src={`/characters/${c.toLowerCase()}.png`}
                    alt={c}
                    fill
                    className="rounded-full border border-blue-500 object-cover"
                  />

                  {/* Hover Info Box */}
                  <div
                    className={`absolute ${i < 3 ? "left-0" : "right-0"
                      } top-full mt-2 hidden group-hover:block z-50 w-96`}
                  >
                    <CharectorInfo charectorName={c} />
                  </div>
                </div>

                {/* Name */}
                <span className="font-semibold text-sm block mb-2">{c}</span>

                {/* Player / AI */}
                <div className="flex gap-3 text-xs">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="accent-blue-500" /> Player
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="accent-purple-500" /> AI
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        <div className="max-w-8xl mx-auto h-full flex gap-6">
          {/* Left Side - Game Board */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-black/40 p-4 rounded-2xl border border-purple-600/50 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-10 gap-1 space-x-2">
                {Array.from({ length: 100 }).map((_, i) => {
                  const num = 100 - i;
                  const isSpecial = num === 100 || num === 1;
                  return (<div key={i}>
                    <div
                      className={`w-12 h-12 flex items-center justify-center text-xs font-bold rounded border transition-all ${isSpecial
                        ? 'bg-linear-to-br from-yellow-500/30 to-orange-500/30 border-yellow-500/60 text-yellow-300 shadow-lg shadow-yellow-500/20'
                        : 'bg-linear-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 text-gray-300 hover:border-purple-500/50'
                        }`}
                    >
                      {num}
                    </div>
                    {i === 0 && <div className="absolute -top-2 -left-2 h-12 aspect-square rounded-full border border-blue-500">
                      <img
                        src="/characters/doraemon.png"
                        alt={"Doraemon"}
                        className="object-cover"
                      /></div>}
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Right Side - Controls */}
          <div className="flex flex-col justify-center items-center">
            {/* Player Turn Indicator */}
            <div className="bg-linear-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/40 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">CURRENT TURN</div>
                  <div className="text-xl font-bold text-blue-400">Unknown</div>
                </div>
                {!gameStarted ? (
                  <button
                    onClick={() => setGameStarted(true)}
                    className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/50 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Rocket />
                    START MISSION
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 px-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">ACTIVE</span>
                  </div>
                )}
                <div className="text-lg font-mono bg-black/40 px-4 py-2 rounded-xl border border-purple-500">
                  <div className="flex items-center gap-2">
                    <Timer /> {minutes}:{seconds}
                  </div>
                </div>
              </div>
            </div>
            {/* Dice Panel */}
            <div className="mt-2 bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-purple-500/40 w-full max-w-6xl flex flex-col items-center gap-4">

              {/* Dice Row */}
              <div className="flex gap-16 items-center">

                {/* Positive Dice */}
                <div className="flex flex-col items-center text-green-400 font-bold">
                  <div className="text-5xl">{getDiceIcon(posDice)}</div>
                  <span className="text-xl mt-1">+{posDice}</span>
                </div>

                {/* Negative Dice */}
                <div className="flex flex-col items-center text-red-400 font-bold">
                  <div className="text-5xl">{getDiceIcon(negDice)}</div>
                  <span className="text-xl mt-1">-{negDice}</span>
                </div>

              </div>

              {/* Movement Text */}
              <div className="text-2xl font-bold text-purple-400">
                Move {movement} Steps {movement >= 0 ? "Forward" : "Backward"}
              </div>

              {/* Roll Button */}
              <button
                onClick={rollDice}
                className="flex items-center gap-2 bg-purple-600 px-10 py-3 rounded-xl font-bold text-lg hover:bg-purple-500 transition-all active:scale-95"
              >
                <Dice6 className="w-6 h-6" />
                Roll Dice
              </button>

            </div>
            {/* Gadget Scoreboard */}
            <div className="mt-4 w-full max-w-6xl bg-black/40 p-4 rounded-xl border border-purple-500/40">
              <h3 className="font-bold mb-2">Gadget Points</h3>
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
                {["Nobita", "Shizuka", "Gian", "Suneo", "Dekisugi"].map((c) => (
                  <div key={c} className="bg-slate-900 py-2 px-4 rounded-lg border border-blue-500/30 text-lg">{c}: 0</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
