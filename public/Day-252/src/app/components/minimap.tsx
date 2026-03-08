interface MinimapProps {
  canvasSize: { width: number; height: number };
  viewportPosition: { x: number; y: number };
  viewportSize: { width: number; height: number };
  onNavigate: (position: { x: number; y: number }) => void;
}

export function Minimap({ canvasSize, viewportPosition, viewportSize, onNavigate }: MinimapProps) {
  const scale = 0.1; // 10% scale for minimap
  const minimapWidth = canvasSize.width * scale;
  const minimapHeight = canvasSize.height * scale;
  const viewportWidth = viewportSize.width * scale;
  const viewportHeight = viewportSize.height * scale;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    onNavigate({ x, y });
  };

  return (
    <div
      className="relative bg-gray-100 border border-gray-300 rounded cursor-pointer"
      style={{ width: minimapWidth, height: minimapHeight, maxWidth: 200, maxHeight: 150 }}
      onClick={handleClick}
    >
      {/* Viewport indicator */}
      <div
        className="absolute border-2 border-blue-500 bg-blue-500/20"
        style={{
          left: viewportPosition.x * scale,
          top: viewportPosition.y * scale,
          width: viewportWidth,
          height: viewportHeight,
        }}
      />
    </div>
  );
}
