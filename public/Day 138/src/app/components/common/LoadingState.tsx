import { Loader2, Sparkles } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center animate-pulse">
          <Sparkles className="w-10 h-10 text-blue-500" />
        </div>
        <Loader2 className="w-24 h-24 text-blue-500 animate-spin absolute -top-2 -left-2" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-600 text-center max-w-md">
        Our AI is analyzing your data...
      </p>
    </div>
  );
}
