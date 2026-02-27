export default function EndingScreen({ win }) {
  return (
    <div className="screen end-screen">
      <div className="screen-card">
        <h1 className="end-title">
          {win ? "🎉 YOU WIN!" : "💀 GAME OVER"}
        </h1>

        <p className="end-text">
          {win
            ? "The dragon has been defeated. The town is finally safe."
            : "You fought bravely, but your journey ends here."}
        </p>

        <button
          className="primary-btn"
          onClick={() => {
            localStorage.removeItem("dragon-repeller-save");
            location.reload();
          }}
        >
          🔄 Replay
        </button>
      </div>
    </div>
  );
}
