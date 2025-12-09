import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface ThrottledMouseMoveOptions {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  throttleMs?: number;
  enabled?: boolean;
}

export function useThrottledMouseMove({
  mouseX,
  mouseY,
  throttleMs = 16, // ~60fps
  enabled = true
}: ThrottledMouseMoveOptions) {
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const pendingUpdateRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Store latest values
      pendingUpdateRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      };

      // Cancel any pending RAF
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame((timestamp) => {
        rafIdRef.current = null;

        // Throttle to specified fps
        if (timestamp - lastUpdateRef.current < throttleMs) {
          // Re-schedule if throttled
          rafIdRef.current = requestAnimationFrame((ts) => {
            rafIdRef.current = null;
            applyUpdate(ts);
          });
          return;
        }

        applyUpdate(timestamp);
      });
    };

    const applyUpdate = (timestamp: number) => {
      if (!pendingUpdateRef.current) return;

      mouseX.set(pendingUpdateRef.current.x);
      mouseY.set(pendingUpdateRef.current.y);
      lastUpdateRef.current = timestamp;
      pendingUpdateRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [mouseX, mouseY, throttleMs, enabled]);
}
