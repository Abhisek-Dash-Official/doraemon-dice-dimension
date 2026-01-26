import {
    Gamepad2, Book, Users, Clock, Dices, DoorOpen, Timer,
    Zap, TrendingUp, Trophy, Skull, Lightbulb, ArrowLeft,
    Target, Coins, Shield, Flame, Heart, Star, AlertTriangle,
    CheckCircle2, XCircle
} from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/50">
                        <Gamepad2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-6xl font-black mb-4 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        GAME GUIDE
                    </h1>
                    <div className="h-1 w-32 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
                    <h2 className="text-3xl font-bold text-blue-300 mb-3">The Great Gadget Heist</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Master the game mechanics and rescue Doraemon's stolen gadgets
                    </p>
                </div>

                {/* Game Story */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-purple-500/20 rounded-xl">
                            <Book className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Mission Brief</h3>
                    </div>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            The <span className="text-red-400 font-semibold">Alien Techno-Thief</span> has infiltrated Doraemon's dimension and stolen his legendary 4D pocket, scattering <span className="text-yellow-400 font-semibold">many powerful gadgets</span> across a temporal battlefield.
                        </p>
                        <p className="text-lg">
                            Navigate through 100 squares of danger, collecting gadgets and outsmarting your opponents to reach Doraemon at the final square.
                        </p>
                        <div className="bg-linear-to-r from-yellow-500/20 to-orange-500/20 border-l-4 border-yellow-500 p-5 rounded-lg mt-6">
                            <div className="flex items-start gap-3">
                                <Trophy className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-yellow-400 text-lg mb-1">Victory Condition</p>
                                    <p className="text-gray-200">Reach Square 100 with the highest Gadget Points to claim ultimate victory!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Game Setup */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-500/20 rounded-xl">
                            <Users className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Pre-Game Setup</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
                            <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                Player Configuration
                            </h4>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span>Choose: Player vs Computer OR Player vs Player</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span>Minimum 2 combatants required to start mission</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span>Select your character before deployment</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
                            <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-red-400" />
                                Critical Time Limit
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Timer className="w-8 h-8 text-red-400" />
                                    <div>
                                        <p className="text-2xl font-bold text-red-400">60 MINUTES</p>
                                        <p className="text-sm text-gray-400">Mission Duration</p>
                                    </div>
                                </div>
                                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-4">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                        <p className="text-red-300 text-sm">Mission failure if time expires before rescue completion</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dice Mechanics */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-purple-500/20 rounded-xl">
                            <Dices className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Dual Dice System</h3>
                    </div>

                    <p className="text-gray-300 text-lg mb-6">
                        Each turn deploys a <span className="text-purple-400 font-semibold">dual-force dice system</span> that determines your movement trajectory.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-linear-to-br from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/50">
                            <div className="flex items-center gap-3 mb-3">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                                <h4 className="font-bold text-xl text-green-400">Positive Die</h4>
                            </div>
                            <p className="text-gray-300">Forward momentum generator</p>
                        </div>

                        <div className="bg-linear-to-br from-red-500/20 to-red-600/10 rounded-xl p-6 border border-red-500/50">
                            <div className="flex items-center gap-3 mb-3">
                                <XCircle className="w-6 h-6 text-red-400" />
                                <h4 className="font-bold text-xl text-red-400">Negative Die</h4>
                            </div>
                            <p className="text-gray-300">Temporal resistance factor</p>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-400" />
                            Calculation Example
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 text-lg">
                                <span className="text-gray-400">Roll Result:</span>
                                <span className="text-green-400 font-bold">+6</span>
                                <span className="text-gray-500">and</span>
                                <span className="text-red-400 font-bold">-3</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <span className="text-gray-400">Net Movement:</span>
                                <span className="text-purple-400 font-bold">6 - 3 = 3 squares forward</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-yellow-400" />
                            Movement Protocol
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span><span className="text-green-400 font-semibold">Positive Result:</span> Optional movement - tactical skip available</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <span><span className="text-red-400 font-semibold">Negative Result:</span> Mandatory backward movement - no evasion possible</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Board Elements */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-pink-500/20 rounded-xl">
                            <Zap className="w-7 h-7 text-pink-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Battlefield Elements</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-6 border border-pink-500/50 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/30 rounded-lg">
                                    <DoorOpen className="w-7 h-7 text-pink-400" />
                                </div>
                                <h4 className="font-bold text-2xl text-pink-400">Anywhere Door</h4>
                            </div>
                            <p className="text-gray-300 mb-4">Dimensional portal for rapid advancement to a higher square</p>
                            <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-500/40">
                                <div className="flex items-center gap-2">
                                    <Coins className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-400 font-semibold">Bonus Reward: +1 Gadget Point</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-gray-700/20 to-gray-800/20 rounded-xl p-6 border border-gray-600/50 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-600/30 rounded-lg">
                                    <Timer className="w-7 h-7 text-gray-400" />
                                </div>
                                <h4 className="font-bold text-2xl text-gray-300">Time Machine Rift</h4>
                            </div>
                            <p className="text-gray-300 mb-4">Temporal anomaly forcing backward displacement</p>
                            <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/40">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                    <span className="text-red-400 font-semibold">Effect: Forced Regression</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Characters */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-orange-500/20 rounded-xl">
                            <Star className="w-7 h-7 text-orange-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Combat Operatives</h3>
                    </div>

                    <div className="grid gap-6">
                        {/* Nobita */}
                        <div className="bg-linear-to-r from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-blue-400 mb-1">NOBITA</h4>
                                    <p className="text-gray-400 text-sm">Class: Bad Luck Survivor</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg">
                                    <Target className="w-6 h-6 text-blue-400" />
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p><span className="text-blue-400 font-semibold">Deployment:</span> Randomized start position (Squares 1-10)</p>
                                <div className="flex items-center gap-2 bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                                    <Coins className="w-5 h-5 text-yellow-400" />
                                    <span className="text-green-400 font-semibold">Starting Bonus: +1 Gadget Point</span>
                                </div>
                            </div>
                        </div>

                        {/* Shizuka */}
                        <div className="bg-linear-to-r from-pink-500/10 to-pink-600/5 rounded-xl p-6 border border-pink-500/30 hover:border-pink-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-pink-400 mb-1">SHIZUKA</h4>
                                    <p className="text-gray-400 text-sm">Class: Tactical Coordinator</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-lg">
                                    <Heart className="w-6 h-6 text-pink-400" />
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p><span className="text-pink-400 font-semibold">Ability:</span> Ally Recall Protocol</p>
                                <p>Teleport any player ahead of her position to her current square</p>
                                <div className="flex items-center gap-2 bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                                    <Zap className="w-5 h-5 text-purple-400" />
                                    <span className="text-purple-400 font-semibold">Charges: 3 per mission</span>
                                </div>
                            </div>
                        </div>

                        {/* Gian */}
                        <div className="bg-linear-to-r from-red-500/10 to-red-600/5 rounded-xl p-6 border border-red-500/30 hover:border-red-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-red-400 mb-1">GIAN</h4>
                                    <p className="text-gray-400 text-sm">Class: Berserker</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-lg">
                                    <Flame className="w-6 h-6 text-red-400" />
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p><span className="text-red-400 font-semibold">Passive:</span> Rage State Activation</p>
                                <p>Triggered when displaced by Time Machine Rift</p>
                                <div className="flex items-center gap-2 bg-orange-500/20 rounded-lg p-3 border border-orange-500/30">
                                    <Flame className="w-5 h-5 text-orange-400" />
                                    <span className="text-orange-400 font-semibold">Next Turn: Base Movement + 2 Bonus Squares</span>
                                </div>
                            </div>
                        </div>

                        {/* Suneo */}
                        <div className="bg-linear-to-r from-yellow-500/10 to-yellow-600/5 rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-yellow-400 mb-1">SUNEO</h4>
                                    <p className="text-gray-400 text-sm">Class: Strategic Investor</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg">
                                    <Coins className="w-6 h-6 text-yellow-400" />
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p><span className="text-yellow-400 font-semibold">Ability:</span> Financial Override</p>
                                <p>Nullify ONE Anywhere Door or Time Machine Rift effect</p>
                                <div className="flex items-center gap-2 bg-yellow-500/20 rounded-lg p-3 border border-yellow-500/30">
                                    <Shield className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-400 font-semibold">Usage: Single activation per mission</span>
                                </div>
                            </div>
                        </div>
                        {/* Dekisugi */}
                        <div className="bg-linear-to-r from-indigo-500/10 to-indigo-600/5 rounded-xl p-6 border border-indigo-500/30 hover:border-indigo-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-indigo-400 mb-1">DEKISUGI</h4>
                                    <p className="text-gray-400 text-sm">Class: Mathematical Genius</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/20 rounded-lg">
                                    <Target className="w-6 h-6 text-indigo-400" />
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p><span className="text-indigo-400 font-semibold">Ability:</span> Probability Inverter</p>
                                <p>Can multiply his dice roll result by -1 to reverse the outcome</p>
                                <div className="flex items-center gap-2 bg-indigo-500/20 rounded-lg p-3 border border-indigo-500/30">
                                    <Zap className="w-5 h-5 text-indigo-400" />
                                    <span className="text-indigo-400 font-semibold">Usage: Unlimited activations per mission</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Victory & Defeat */}
                <section className="mb-12 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-xl">
                            <Trophy className="w-7 h-7 text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Mission Outcomes</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-linear-to-br from-green-500/20 to-emerald-500/10 rounded-xl p-6 border border-green-500/50">
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy className="w-8 h-8 text-green-400" />
                                <h4 className="font-bold text-2xl text-green-400">MISSION SUCCESS</h4>
                            </div>
                            <p className="text-gray-300 mb-4">Achieved when all operatives reach Square 100:</p>
                            <div className="bg-gray-900/50 rounded-lg p-5 border border-green-500/30 italic text-green-300">
                                "All heroes have breached Square 100 and successfully extracted Doraemon from captivity! Combining their collected gadget arsenal, the team neutralized the Alien Techno-Thief and secured dimensional victory!"
                            </div>
                            <div className="mt-4 flex items-center gap-2 bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/40">
                                <Star className="w-6 h-6 text-yellow-400" />
                                <span className="text-yellow-400 font-bold text-lg">Victor: Highest Gadget Point Holder</span>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-red-500/20 to-rose-500/10 rounded-xl p-6 border border-red-500/50">
                            <div className="flex items-center gap-3 mb-4">
                                <Skull className="w-8 h-8 text-red-400" />
                                <h4 className="font-bold text-2xl text-red-400">MISSION FAILURE</h4>
                            </div>
                            <p className="text-gray-300 mb-4">Occurs when 60-minute time limit expires:</p>
                            <div className="bg-gray-900/50 rounded-lg p-5 border border-red-500/30 italic text-red-300">
                                "Time displacement critical. The Alien Techno-Thief has vanished into the temporal void with Doraemon's gadget collection. Doraemon remains lost in the dimensional rift... MISSION TERMINATED."
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pro Tips */}
                <section className="mb-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-500/50 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-purple-500/30 rounded-xl">
                            <Lightbulb className="w-7 h-7 text-yellow-400" />
                        </div>
                        <h3 className="text-3xl font-bold">Pro Tactics</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 bg-gray-900/40 rounded-lg p-4 border border-purple-500/30">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-gray-300">Prioritize Anywhere Doors for Gadget Point acceleration</p>
                        </div>
                        <div className="flex items-start gap-3 bg-gray-900/40 rounded-lg p-4 border border-purple-500/30">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-gray-300">Deploy character abilities at critical mission phases</p>
                        </div>
                        <div className="flex items-start gap-3 bg-gray-900/40 rounded-lg p-4 border border-purple-500/30">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-gray-300">Monitor time remaining - coordinate team arrival</p>
                        </div>
                        <div className="flex items-start gap-3 bg-gray-900/40 rounded-lg p-4 border border-purple-500/30">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-gray-300">Strategic movement skip can avoid Rift penalties</p>
                        </div>
                    </div>
                </section>

                {/* Back Button */}
                <div className="text-center">
                    <a href="/" className="group inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Return to Command Center
                    </a>
                </div>
            </div>
        </div>
    );
}