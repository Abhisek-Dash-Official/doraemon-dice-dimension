"use client";

import { useState, useEffect, useRef } from "react";
import { HelpCircle, Timer, Rocket, AlertTriangle, Zap, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer, Bounce } from "react-toastify";
import CharectorInfo from "./components/CharectorInfo.jsx";
import { charactersBgColorCodes } from "./data/colors.js";
import { charactersTextColorCodes } from "./data/colors.js";
import WinnerBanner from "./components/WinnerBanner.jsx";
import FailureBanner from "./components/FailureBanner.jsx";
import { RestartGameEngine, HandleDiceRollTurn, HandleUseAbility, CheckCanUseAbility } from "./logic/gameEngine.js";
import ALL_TILES from "./data/boardTiles.js"
import { SPECIAL_TILE_ICONS, DESTINATION_TILE_ICONS } from "./data/SpecialTilesIcons.js";

export default function Home() {
  const GAME_END_TIME = 1800; // 0.5 hour in seconds
  const AI_SPEED = 2000; // AI speed to roll dice in seconds
  const timerRef = useRef(null);
  const [claimedTiles, setClaimedTiles] = useState({});
  const RankCount = useRef(0)
  const [time, setTime] = useState(GAME_END_TIME);
  const [gameStarted, setGameStarted] = useState(false);
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  const [posDice, setPosDice] = useState(0);
  const [negDice, setNegDice] = useState(0);
  const [movement, setMovement] = useState(0);
  const [diceDisabled, setDiceDisabled] = useState(true);
  const [currentTurn, setCurrentTurn] = useState("Unknown");
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);

  // {Nobita: {tile: 1, mode: 'p', points: 0}, ...}
  const [playingCharacters, setPlayingCharacters] = useState({});

  // {Nobita: NobitaObject, ...}
  const [charectersObjects, setCharectersObjects] = useState({});

  // {Dekisugi: { rank: 1, points: 1210 }, Shizuka: { rank: 3, points: 98 }, Nobita: { rank: 2, points: 30 }, Suneo: { rank: 4, points: 230 }, ...}
  const [won, setWon] = useState({});

  // ["Nobita", "Gian"]
  const [failed, setFailed] = useState([]);

  const restartGame = () => {
    RankCount.current = 0;
    setGameStarted(false);
    setTime(GAME_END_TIME);
    setPosDice(0);
    setNegDice(0);
    setMovement(0);
    setCurrentTurn("Unknown");
    setCurrentTurnIdx(0);
    setDiceDisabled(true);
    setCharectersObjects({});
    setPlayingCharacters({});
    setWon({});
    setFailed([]);
    setClaimedTiles({});

  }

  const askUseAbilityToast = (functionToCall, functionToCallAtRejection) => {
    toast(
      <div className="bg-black/80 border border-purple-500 p-3 rounded-xl text-white flex flex-col gap-2">

        <div className="flex items-center gap-2 text-purple-400 font-bold">
          <Zap size={16} />
          ABILITY DETECTED
        </div>

        <div className="text-sm">
          Use <span className="font-bold text-pink-400">{currentTurn}</span>'s ability?
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm font-bold"
            onClick={() => {
              functionToCall();
              toast.dismiss();
            }}
          >
            YES
          </button>

          <button
            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm font-bold"
            onClick={() => { toast.dismiss(); functionToCallAtRejection(); }}
          >
            NO
          </button>
        </div>

      </div>,
      {
        autoClose: false,
        closeButton: false,
        draggable: false,
        pauseOnHover: true,
        className: "bg-transparent shadow-none",
      }
    );
  }

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

  const handleSpecialTileToast = (tileNumber, characterName) => {
    const tile = ALL_TILES[tileNumber];
    if (!tile || tile.type === "none") return;

    let message = "";
    switch (tile.type) {
      case "door":
        message = `🏠 ${characterName} found a Door at tile ${tileNumber}! Jump to ${tile.to}`;
        break;

      case "rift":
        message = `⏳ ${characterName} fell into a Time Rift at tile ${tileNumber}! Go back to ${tile.to}`;
        break;

      case "bomb":
        message = `💣 ${characterName} hit a Bomb at tile ${tileNumber}! Back to Start`;
        break;

      case "bamboo-copter":
        message = `🚁 ${characterName} got a Bamboo Copter at tile ${tileNumber}! Move to ${tile.to}`;
        break;

      case "big-light":
        message = `🔆 ${characterName} got Big Light at tile ${tileNumber}! Double move next turn`;
        break;

      case "small-light":
        message = `🌙 ${characterName} got Small Light at tile ${tileNumber}! Half move next turn`;
        break;

      case "easter-egg":
        message = `🎮 Easter Egg unlocked by ${characterName} at tile ${tileNumber}!`;
        break;

      default:
        message = `${characterName} landed on something special at tile ${tileNumber}!`;
    }

    toast.info(message, {
      position: "top-left",
      autoClose: 4500,
      pauseOnHover: true,
      closeButton: true,
      draggable: true,
    });
  };

  const endTurn = () => {
    setCharectersObjects(prev => ({
      ...prev,
      [currentTurn]: prev[currentTurn],
    }));

    setCurrentTurnIdx(prev => {
      const keys = Object.keys(playingCharacters);
      if (keys.length === 0) return 0;
      return (prev + 1) % keys.length;
    });

    setDiceDisabled(false);
  };

  const handleWinCondition = (nextTile) => {
    if (nextTile < 100) return false;

    RankCount.current++;
    const bonus = RankCount.current === 1 ? 5 : 0;

    setWon(prev => ({
      ...prev,
      [currentTurn]: {
        rank: RankCount.current,
        points: (playingCharacters[currentTurn]?.points || 0) + bonus,
        bonus,
      }
    }));

    setPlayingCharacters(prev => {
      const copy = { ...prev };
      delete copy[currentTurn];
      return copy;
    });

    setDiceDisabled(false);
    return true;
  };

  const handleTilePoints = (nextTile) => {
    if (claimedTiles[nextTile] || nextTile === 1) return;

    setPlayingCharacters(prev => ({
      ...prev,
      [currentTurn]: {
        ...prev[currentTurn],
        points: (prev[currentTurn]?.points || 0) + 1,
      }
    }));

    setClaimedTiles(prev => ({
      ...prev,
      [nextTile]: true,
    }));
    toast.success(
      `${currentTurn} claimed tile ${nextTile} and earned +1 Gadget Point! 🔫`,
      {
        position: "top-right",
        autoClose: 2500,
      }
    );
  };

  const handleAITurn = (moveBy, endTurn) => {
    const { canUseAbility, newTile } =
      HandleDiceRollTurn(moveBy, currentTurn, charectersObjects);

    setPlayingCharacters(prev => ({
      ...prev,
      [currentTurn]: {
        ...prev[currentTurn],
        tile: newTile
      }
    }));

    if (canUseAbility) {
      HandleUseAbility(currentTurn, charectersObjects);
    }
    endTurn();
  };

  const handlePlayerTurn = ({ moveBy, p, n, endTurn, }) => {
    // PLAYER TURN – DEKISUGI
    if (currentTurn === "Dekisugi") {
      const canUseAbility = CheckCanUseAbility(currentTurn, charectersObjects);

      if (canUseAbility) {
        askUseAbilityToast(
          () => {
            const abilityMove = n - 2 * p;
            setMovement(abilityMove);
            HandleDiceRollTurn(abilityMove, currentTurn, charectersObjects);
            endTurn();
          },
          () => {
            HandleDiceRollTurn(moveBy, currentTurn, charectersObjects);
            endTurn();
          }
        );
        return true;
      }

      HandleDiceRollTurn(moveBy, currentTurn, charectersObjects);
      endTurn();
      return true;
    }

    // PLAYER TURN – OTHERS
    const { canUseAbility, newTile } =
      HandleDiceRollTurn(moveBy, currentTurn, charectersObjects);

    setPlayingCharacters(prev => ({
      ...prev,
      [currentTurn]: {
        ...prev[currentTurn],
        tile: newTile
      }
    }));

    if (canUseAbility) {
      askUseAbilityToast(
        () => {
          HandleUseAbility(currentTurn, charectersObjects);
          endTurn();
        },
        () => endTurn()
      );
    } else {
      endTurn();
    }

    return true;
  };

  const rollDice = () => {
    if (diceDisabled) return;
    if (!playingCharacters[currentTurn]) return;

    setDiceDisabled(true);

    const p = Math.ceil(Math.random() * 6);
    const n = Math.ceil(Math.random() * 6);

    setPosDice(p);
    setNegDice(n);

    const moveBy = 2 * p - n;
    setMovement(moveBy);

    const nextTile = playingCharacters[currentTurn].tile + moveBy;
    handleSpecialTileToast(nextTile, currentTurn);

    // WIN CONDITION
    if (handleWinCondition(nextTile)) return;

    // POINTS ON TILE
    handleTilePoints(nextTile);

    // AI TURN
    if (playingCharacters[currentTurn].mode === "c") {
      handleAITurn(moveBy, endTurn);
      return;
    }

    // PLAYER TURN
    if (playingCharacters[currentTurn].mode === "p") {
      handlePlayerTurn({ moveBy, p, n, endTurn, });
      return;
    }
  };

  useEffect(() => {
    toast(
      <div className="flex items-center gap-3">
        <img
          src="/logo2.png"
          className="w-15 h-15 rounded-full border border-cyan-400 shadow-lg"
        />
        <div>
          <p className="text-cyan-300 font-bold text-lg tracking-wide">
            Welcome to Doraemon Dice Dimension
          </p>
          <p className="text-sm text-gray-300">
            Select your operatives and start the mission
          </p>
        </div>
      </div>
      , { pauseOnHover: true, autoClose: 5000 });

    const showDarkModeWarnToast = () =>
      toast(
        <div className="p-3 bg-red-600 rounded">

          <h2 className="font-bold text-lg text-white drop-shadow-md">
            An Advice!
          </h2>
          <p className="text-sm text-white/90">
            Use Light Mode for best Doraemon Dice Dimension experience
          </p>

        </div>,
        {
          autoClose: 4000,
          pauseOnHover: false,
          position: "top-right"
        }
      );
    const checkDarkMode = () => {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const enabled = darkModeQuery.matches;

      if (enabled) {
        showDarkModeWarnToast();
      }
    }

    checkDarkMode();
  }, []);

  useEffect(() => {
    setPlayingCharacters(prev => {
      const updated = { ...prev };

      Object.keys(updated).forEach(c => {
        const characterObj = charectersObjects[c];
        if (characterObj) {
          updated[c] = {
            ...updated[c],
            tile: characterObj.tilePosition,
            points: prev[c]?.points ?? 0,
          };
        }
      });

      return updated;
    });
  }, [charectersObjects]);

  useEffect(() => {
    let timer = null;
    if (!gameStarted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTime(GAME_END_TIME); // reset timer
      return;
    } else {
      if (playingCharacters && Object.keys(playingCharacters)?.length >= 2) {
        if (playingCharacters[currentTurn]?.mode === "c") {
          setDiceDisabled(false);
          rollDice();
        } else {
          setDiceDisabled(false);
        }
        setCurrentTurn(Object.keys(playingCharacters)[currentTurnIdx]);
        const { updatedCharacters, newPlayersObjects } = RestartGameEngine(playingCharacters);
        setPlayingCharacters(updatedCharacters);
        setCharectersObjects(newPlayersObjects);
        timer = setInterval(() => {
          setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
      }
      else {
        toast.error(
          <div className="mission-error-toast">
            <div className="mission-error-title flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              SYSTEM ALERT
            </div>
            <div className="mission-error-text">
              Select at least two operative to start the mission.
            </div>
          </div>,
          {
            pauseOnHover: true,
            className: "mission-error-container",
            progressClassName: "mission-error-progress",
          }
        );
        setGameStarted(false);
      }
    }
    return () => { if (timer) clearInterval(timer); };
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const keys = Object.keys(playingCharacters);
    if (keys.length === 0) return;

    // Make sure currentTurnIdx is in range
    const idx = currentTurnIdx >= keys.length ? 0 : currentTurnIdx;
    const safeTurn = keys[idx];
    if (!safeTurn) return;

    setCurrentTurn(safeTurn);

    if (playingCharacters[safeTurn]?.mode !== "c") return;

    setDiceDisabled(false);
    const timer = setTimeout(() => rollDice(), AI_SPEED);
    return () => clearTimeout(timer);
  }, [currentTurnIdx, gameStarted, playingCharacters]);

  useEffect(() => {
    if (time === 0 && gameStarted) {
      setGameStarted(false);
      // Determine failed characters
      const failedCharacters = Object.entries(playingCharacters)
        .filter(([_, data]) => (data.mode === "p" || data.mode === "c") && !(data.tile === 100))
        .map(([name, _]) => name);
      setFailed(failedCharacters);
    }
  }, [time]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only SPACE
      if (e.code !== "Space") return;

      // Prevent page scroll
      e.preventDefault();

      // Guards
      if (!gameStarted) return;
      if (diceDisabled) return;

      const currentPlayer = playingCharacters[currentTurn];
      if (!currentPlayer) return;

      // Only PLAYER turns
      if (currentPlayer.mode !== "p") return;

      // Avoid triggering while typing
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      rollDice();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    gameStarted,
    diceDisabled,
    currentTurn,
    playingCharacters,
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-black text-white flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo2.png"
            alt="Doraemon Dice Dimension"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold flex gap-2"><span>Doraemon Dice Dimension</span><span className="text-3xl font-bold text-blue-300 mb-3 underline">( The Great Gadget Heist )</span></h1>
          <Image
            src="/logo.png"
            alt="Doraemon Dice Dimension"
            width={100}
            height={100}
            className="rounded-lg"
          />
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
            {Object.keys(charactersBgColorCodes).map((c, i) => (
              <div
                key={c}
                className={`flex-1 ${charactersBgColorCodes[c]} bg-opacity-10 p-3 rounded-lg 
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
                  {["p", "c"].map((mode) => (
                    <label key={mode} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`mode-${c}`} // unique per character
                        value={mode}
                        checked={playingCharacters[c]?.mode === mode}
                        disabled={gameStarted}
                        className={`
                          ${mode === "p" ? "accent-green-500" :
                            mode === "c" ? "accent-purple-500" :
                              "accent-gray-500"
                          }`}
                        onChange={() =>
                          setPlayingCharacters((prev) => ({
                            ...prev,
                            [c]: { ...prev[c], tile: 1, mode: mode, points: 0 },
                          }))
                        }
                      />
                      {mode === "p" ? "Player" : mode === "c" ? "AI" : ""}
                    </label>
                  ))}
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
                  const tileData = ALL_TILES[num];
                  const specialIcon = SPECIAL_TILE_ICONS[tileData?.type];

                  return (
                    <div key={i} className="relative">
                      {/* Player Circles */}
                      {num !== 100 && (
                        <div className="absolute top-1 right-1 flex gap-1 z-10 flex-wrap px-1.5 py-0.5">
                          {Object.entries(playingCharacters)
                            .filter(([_, data]) => data.tile === num && ["p", "c"].includes(data.mode))
                            .map(([name]) => (
                              <div
                                key={name}
                                className={`w-3 h-3 rounded-full border border-white shadow ${charactersBgColorCodes[name]}`}
                              />
                            ))}
                        </div>
                      )}

                      {/* TILE BOX */}
                      <div
                        className={`relative w-14 h-14 flex items-center justify-center text-xs font-bold rounded border transition-all ${isSpecial
                          ? "bg-linear-to-br from-yellow-500/30 to-orange-500/30 border-yellow-500/60 shadow-lg shadow-yellow-500/20"
                          : "bg-linear-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-purple-500/50"
                          } ${!claimedTiles[num] ? "text-amber-300" : "text-gray-300"}`}
                      >
                        {/* Tile Number */}
                        <span className="relative z-10">{num}</span>

                        {/* Special Tile Icon (TOP LEFT) */}
                        {(() => {
                          // source tile icon
                          if (
                            ALL_TILES[num]?.type !== "none" &&
                            ALL_TILES[num]?.type !== "easter-egg"
                          ) {
                            return (
                              <img
                                src={`/specialTiles/${ALL_TILES[num].type}.png`}
                                alt={ALL_TILES[num].type}
                                title={
                                  ALL_TILES[num].to
                                    ? `Warp to tile ${ALL_TILES[num].to}`
                                    : ALL_TILES[num].type.replace("-", " ")
                                }
                                className="absolute top-0.5 left-0.5 w-6 h-6 opacity-90"
                              />
                            );
                          }

                          // destination tile icon
                          if (DESTINATION_TILE_ICONS[num]) {
                            return (
                              <img
                                src={`/specialTiles/${DESTINATION_TILE_ICONS[num].icon}`}
                                alt="arrival"
                                title={`Arrived from tile ${DESTINATION_TILE_ICONS[num].fromTile}`}
                                className="absolute top-0.5 left-0.5 w-6 h-6 opacity-80"
                              />
                            );
                          }

                          return null;
                        })()}
                      </div>

                      {/* DORAEMON START ICON */}
                      {i === 0 && (
                        <div className="absolute -top-5 -left-5 h-12 aspect-square rounded-full border border-blue-500">
                          <img
                            src="/characters/doraemon.png"
                            alt="Doraemon"
                            className="object-cover"
                          />
                        </div>
                      )}
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
                  <div
                    className={`text-xl font-bold ${charactersTextColorCodes[currentTurn] || "text-blue-400"
                      }`}
                  >
                    {`${currentTurn ?? "Unknown"} (${playingCharacters[currentTurn]?.mode ?? ""})`}
                  </div>
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
                {gameStarted ? (
                  <>
                    {`(2 * ${posDice}) - ${negDice} => `}
                    {movement === 0 && "Oops! "}
                    Move {Math.abs(movement)} Steps {movement >= 0 ? "Forward" : "Backward"}
                  </>
                ) : (
                  "Press Start Mission to start"
                )}
              </div>

              {/* Roll Button */}
              <button
                onClick={rollDice}
                disabled={diceDisabled && (playingCharacters[currentTurn]?.mode === "c")}
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
                {["Nobita", "Shizuka", "Gian", "Suneo", "Dekisugi"].map((c) => {
                  const points =
                    playingCharacters[c]?.points ??
                    won[c]?.points ??
                    0;

                  return (
                    <div
                      key={c}
                      className="bg-slate-900 py-2 px-4 rounded-lg border border-blue-500/30 text-lg"
                    >
                      {c}: {points}
                      {won[c] && <span className="text-yellow-400 ml-2">🏆</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WINNER BANNER */}
      {Object.keys(won).length > 0 && Object.keys(playingCharacters).length === 0 && <WinnerBanner winners={won} restartGame={restartGame} />}

      {/* FAILURE BANNER */}
      {failed && failed.length > 0 && <FailureBanner failed={failed} restartGame={restartGame} />}

      {/* TOAST CONTAINER */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </div>
  );
}
