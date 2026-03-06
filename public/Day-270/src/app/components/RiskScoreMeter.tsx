interface RiskScoreMeterProps {
  score: number;
}

export function RiskScoreMeter({ score }: RiskScoreMeterProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 25) return "text-green-500";
    if (score < 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = () => {
    if (score < 25) return "#22c55e";
    if (score < 50) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="size-48 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${getColor()}`}>{score}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Risk Score</span>
      </div>
    </div>
  );
}
