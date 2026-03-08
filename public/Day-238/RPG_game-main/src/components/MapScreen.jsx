export default function MapScreen({ onBack, onTravel }) {
  return (
    <div className="card">
      <h2>🗺️ World Map</h2>
      <button onClick={() => onTravel("town")}>Town</button>
      <button onClick={() => onTravel("forest")}>Forest</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
