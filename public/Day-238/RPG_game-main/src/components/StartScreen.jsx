export default function StartScreen({ onStart }) {
  return (
    <div className="boot-screen">
      <div className="boot-content">
        <h1 className="boot-title">
          🐉 Dragon Repeller
        </h1>

        <div className="dialogue-box">
          <p>
            A terrible dragon is preventing people from leaving the town.
          </p>
          <p>
            You are the only one brave enough to stop it.
          </p>
        </div>

        <button className="press-start" onClick={onStart}>
          ▶ Press Start
        </button>
      </div>
    </div>
  );
}
