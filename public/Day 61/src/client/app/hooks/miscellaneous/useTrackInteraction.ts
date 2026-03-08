"use client";
import { useCreateInteractionMutation } from "@/app/store/apis/AnalyticsApi";
import { useCallback, useRef } from "react";
import { useAppSelector } from "../state/useRedux";

interface TrackInteractionOptions {
  debounceMs?: number;
}

const useTrackInteraction = ({
  debounceMs = 500,
}: TrackInteractionOptions = {}) => {
  const { user } = useAppSelector((state) => state.auth);

  const [createInteraction] = useCreateInteractionMutation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const trackInteraction = useCallback(
    async (productId: string | undefined, type: "view" | "click" | "other") => {
      if (!user?.id) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          await createInteraction({
            userId: user.id,
            productId,
            type,
          }).unwrap();
        } catch (error) {
          console.error("Failed to track interaction:", error);
        }
      }, debounceMs);
    },
    [user?.id, createInteraction, debounceMs]
  );

  return { trackInteraction, isTracking: !!timeoutRef.current };
};

export default useTrackInteraction;
