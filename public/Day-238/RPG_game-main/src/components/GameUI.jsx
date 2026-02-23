import { locations } from "../data/map";
import playerImg from "../assets/player.png";
import slimeImg from "../assets/slime.jpg";
import beastImg from "../assets/beast.jpg";
import dragonImg from "../assets/dragon.jpg";
import bgImg from "../assets/background.jpg";

function getEnemyImage(name) {
  if (name === "slime") return slimeImg;
  if (name === "fanged beast") return beastImg;
  if (name === "dragon") return dragonImg;
  return null;
}

export default function GameUI({
  xp,
  health,
  gold,
  location,
  enemy,
  enemyHealth,
  isDodging,
   isAttacking,
   combatText,
  inventory,
  weapon,
  randomNumbers,
  actions
}) {
  return (
    <div id="game">

      {/* 🟩 SCENE PANEL */}
      <div className="scene">
        <img src={bgImg} className="scene-bg" />

        <div className="scene-characters">
          <img
  src={playerImg}
  className={`player ${
  isDodging ? "dodge" : isAttacking ? "attack" : "idle"
}`}
/>

          {enemy && (
            <img
  src={getEnemyImage(enemy.name)}
  className={`enemy ${isAttacking ? "hit" : "bounce"}`}
/>
          )}
        </div>
      </div>

      {/* 📊 STATS */}
      <div id="stats">
        <span>XP: {xp}</span>
        <span>Health: {health}</span>
        <span>Gold: {gold}</span>
      </div>

      {/* 🎮 CONTROLS */}
      <div id="controls">
        {location === "town" && (
          <>
            <button onClick={() => actions.setLocation("store")}>
              Go to store
            </button>
            <button onClick={() => actions.setLocation("cave")}>
              Go to cave
            </button>
            <button onClick={() => actions.startFight(2)}>
              Fight dragon
            </button>
          </>
        )}

        {location === "store" && (
          <>
            <button onClick={actions.buyHealth}>
              Buy 10 health (10 gold)
            </button>
            {inventory.length < 4 ? (
              <button onClick={actions.buyWeapon}>
                Buy weapon (30 gold)
              </button>
            ) : (
              <button onClick={actions.sellWeapon}>
                Sell weapon (15 gold)
              </button>
            )}
            <button onClick={actions.goTown}>Go to town</button>
          </>
        )}

        {location === "cave" && (
          <>
            <button onClick={() => actions.startFight(0)}>
              Fight slime
            </button>
            <button onClick={() => actions.startFight(1)}>
              Fight beast
            </button>
            <button onClick={actions.goTown}>Go to town</button>
          </>
        )}

        {location === "fight" && (
          <>
            <button onClick={actions.attack}>Attack</button>
            <button onClick={actions.dodge}>Dodge</button>
            <button onClick={actions.goTown}>Run</button>
          </>
        )}

        {location === "easter" && (
          <>
            <button onClick={() => actions.pickNumber(2)}>2</button>
            <button onClick={() => actions.pickNumber(8)}>8</button>
            <button onClick={actions.goTown}>Go to town</button>
          </>
        )}
      </div>

      {/* 📝 TEXT BOX */}
      <div id="text">
        <p>{combatText || locations[location].text}</p>

        {location === "easter" && randomNumbers?.length > 0 && (
          <p>Random numbers: {randomNumbers.join(", ")}</p>
        )}

        <p><strong>Weapon:</strong> {weapon.name}</p>
        <p><strong>Inventory:</strong> {inventory.join(", ")}</p>

        {enemy && (
          <p>
            Fighting <strong>{enemy.name}</strong> — HP: {enemyHealth}
          </p>
        )}
      </div>
    </div>
  );
}
