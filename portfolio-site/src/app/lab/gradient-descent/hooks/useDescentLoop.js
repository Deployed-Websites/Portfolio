import { useEffect, useRef } from "react";
import { gradient } from "../lib/landscape";

export function useDescentLoop({ running, ball, learningRate, momentum, setBall, setPath, setStepCount, stepCount, setRunning }) {
  const velocity = useRef([0, 0]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!running || !ball) return;

    let localBall = { ...ball };

    const step = () => {
      const [gx, gy] = gradient(localBall.x, localBall.y);

      velocity.current[0] = momentum * velocity.current[0] - learningRate * gx;
      velocity.current[1] = momentum * velocity.current[1] - learningRate * gy;

      localBall = {
        x: localBall.x + velocity.current[0],
        y: localBall.y + velocity.current[1],
      };

      setBall(localBall);
      setPath((p) => [...p, [localBall.x, localBall.y]]);
      setStepCount((c) => c + 1);

      const gradMag = Math.sqrt(gx * gx + gy * gy);
      if (gradMag > 0.01 && stepCount < 200) {
        timeoutRef.current = setTimeout(step, 100); // pause between each visible step
      } else {
        setRunning(false);
      }
    };

    timeoutRef.current = setTimeout(step, 350);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return velocity;
}