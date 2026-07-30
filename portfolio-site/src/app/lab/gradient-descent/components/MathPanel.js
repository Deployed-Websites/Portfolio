export default function MathPanel({ ball, gradientVec, learningRate }) {
  if (!ball || !gradientVec) {
    return (
      <div className="border border-gray-800 rounded-lg p-5 text-sm text-gray-500">
        Drop the ball and hit Run to see the maths update live.
      </div>
    );
  }

  const [gx, gy] = gradientVec;
  const newX = ball.x - learningRate * gx;
  const newY = ball.y - learningRate * gy;

  return (
    <div className="border border-gray-800 rounded-lg p-5 space-y-4 font-mono text-sm">

      <div>
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Current position</div>
        <div>x = {ball.x.toFixed(3)}, &nbsp; y = {ball.y.toFixed(3)}</div>
      </div>

      <div>
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Gradient (steepest ascent direction)</div>
        <div>∇L = ( {gx.toFixed(3)}, &nbsp; {gy.toFixed(3)} )</div>
      </div>

      <div>
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Update rule</div>
        <div>x_new = x − α · ∂L/∂x</div>
        <div className="text-gray-400 mt-1">
          x_new = {ball.x.toFixed(3)} − {learningRate.toFixed(2)} × {gx.toFixed(3)} = {newX.toFixed(3)}
        </div>
        <div className="mt-2">y_new = y − α · ∂L/∂y</div>
        <div className="text-gray-400 mt-1">
          y_new = {ball.y.toFixed(3)} − {learningRate.toFixed(2)} × {gy.toFixed(3)} = {newY.toFixed(3)}
        </div>
      </div>

      <div className="text-xs text-gray-600 pt-2 border-t border-gray-800">
        α (alpha) is the learning rate — how big a step to take in the downhill direction each time.
      </div>

    </div>
  );
}