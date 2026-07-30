import { useEffect, useRef, useState } from "react";
import { gradient } from "../lib/landscape";
import { getCandidateDirections } from "../lib/candidateDirections";

const SENSING_STEP_LIMIT = 3; // how many early steps get the full "sensing" visualization

export function useDescentLoop({ running, ball, learningRate, momentum, setBall, setPath, setStepCount, stepCount, setRunning }) {
  const velocity = useRef([0, 0]);
  const timeoutRef = useRef(null);
  const [sensingFrame, setSensingFrame] = useState(null);
  const [gradientVec, setGradientVec] = useState(null);

  useEffect(() => {
    if (!running || !ball) return;

    let localBall = { ...ball };
    let localStep = stepCount;

    const showSensingThenMove = () => {
      const frame = getCandidateDirections(localBall.x, localBall.y);
      setSensingFrame(frame);

      timeoutRef.current = setTimeout(() => {
        commitMove();
      }, 500);
    };

    const commitMove = () => {
      const [gx, gy] = gradient(localBall.x, localBall.y);
      setGradientVec([gx, gy]);

      velocity.current[0] = momentum * velocity.current[0] - learningRate * gx;
      velocity.current[1] = momentum * velocity.current[1] - learningRate * gy;

      localBall = {
        x: localBall.x + velocity.current[0],
        y: localBall.y + velocity.current[1],
      };
      localStep += 1;

      setBall(localBall);
      setPath((p) => [...p, [localBall.x, localBall.y]]);
      setStepCount(localStep);
      setSensingFrame(null);

      const gradMag = Math.sqrt(gx * gx + gy * gy);
      if (gradMag > 0.01 && localStep < 200) {
        timeoutRef.current = setTimeout(step, 150);
      } else {
        setRunning(false);
      }
    };

    const step = () => {
      if (localStep < SENSING_STEP_LIMIT) {
        showSensingThenMove();
      } else {
        commitMove();
      }
    };

    timeoutRef.current = setTimeout(step, 350);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return { velocity, sensingFrame, gradientVec };
}