import { Target, Coins, Shield, Flame, Heart, Zap } from "lucide-react";

export default function CharectorInfo({ charectorName }) {
  charectorName = charectorName?.toLowerCase();

  const baseCard =
    "rounded-xl p-6 border backdrop-blur-md transition-all shadow-lg";

  if (charectorName === "nobita") {
    return (
      <div
        className={`${baseCard} bg-blue-900/30 border-blue-400/40 hover:border-blue-400`}
      >
        <Header
          title="NOBITA"
          color="blue"
          icon={<Target />}
          subtitle="Class: Bad Luck Survivor"
        />
        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-blue-300 font-semibold">Deployment:</span>{" "}
            Randomized start position (Squares 1-10)
          </p>
          <InfoBox
            color="green"
            icon={<Coins />}
            text="Starting Bonus: +1 Gadget Point"
          />
        </div>
      </div>
    );
  }

  if (charectorName === "shizuka") {
    return (
      <div
        className={`${baseCard} bg-pink-900/30 border-pink-400/40 hover:border-pink-400`}
      >
        <Header
          title="SHIZUKA"
          color="pink"
          icon={<Heart />}
          subtitle="Class: Tactical Coordinator"
        />
        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-pink-300 font-semibold">Ability:</span> Ally
            Recall Protocol
          </p>
          <p>Teleport any player ahead of her position to her current square</p>
          <InfoBox
            color="purple"
            icon={<Zap />}
            text="Charges: 3 per mission"
          />
        </div>
      </div>
    );
  }

  if (charectorName === "gian") {
    return (
      <div
        className={`${baseCard} bg-red-900/30 border-red-400/40 hover:border-red-400`}
      >
        <Header
          title="GIAN"
          color="red"
          icon={<Flame />}
          subtitle="Class: Berserker"
        />
        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-red-300 font-semibold">Passive:</span> Rage
            State Activation
          </p>
          <p>Triggered when displaced by Time Machine Rift</p>
          <InfoBox
            color="orange"
            icon={<Flame />}
            text="Next Turn: Base Movement +2 Squares"
          />
        </div>
      </div>
    );
  }

  if (charectorName === "suneo") {
    return (
      <div
        className={`${baseCard} bg-yellow-900/30 border-yellow-400/40 hover:border-yellow-400`}
      >
        <Header
          title="SUNEO"
          color="yellow"
          icon={<Coins />}
          subtitle="Class: Strategic Investor"
        />
        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-yellow-300 font-semibold">Ability:</span>{" "}
            Financial Override
          </p>
          <p>Nullify ONE Anywhere Door or Time Machine Rift</p>
          <InfoBox
            color="yellow"
            icon={<Shield />}
            text="Usage: Once per mission"
          />
        </div>
      </div>
    );
  }

  if (charectorName === "dekisugi") {
    return (
      <div
        className={`${baseCard} bg-indigo-900/30 border-indigo-400/40 hover:border-indigo-400`}
      >
        <Header
          title="DEKISUGI"
          color="indigo"
          icon={<Target />}
          subtitle="Class: Mathematical Genius"
        />
        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-indigo-300 font-semibold">Ability:</span>{" "}
            Probability Inverter
          </p>
          <p>Multiply dice result by -1 to reverse movement</p>
          <InfoBox color="indigo" icon={<Zap />} text="Unlimited usage" />
        </div>
      </div>
    );
  }

  return <div className="text-white">Character not found.</div>;
}

/* Helper UI Components */

function Header({ title, subtitle, icon, color }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className={`text-2xl font-bold text-${color}-400 mb-1`}>{title}</h4>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div
        className={`flex items-center justify-center w-12 h-12 bg-${color}-500/30 rounded-lg`}
      >
        {icon}
      </div>
    </div>
  );
}

function InfoBox({ color, icon, text }) {
  return (
    <div
      className={`flex items-center gap-2 bg-${color}-500/20 rounded-lg p-3 border border-${color}-400/30`}
    >
      {icon}
      <span className={`text-${color}-300 font-semibold`}>{text}</span>
    </div>
  );
}
