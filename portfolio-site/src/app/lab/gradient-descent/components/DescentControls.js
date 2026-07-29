export default function DescentControls({
  learningRate, setLearningRate,
  momentum, setMomentum,
  ball, running,
  onRun, onPause, onReset,
}) {
  return (
    <div className="flex-1 space-y-6">

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Learning Rate: {learningRate.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-600 mt-1">
          Too high and the ball overshoots wildly. Too low and it barely moves.
        </p>
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Momentum: {momentum.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="0.95"
          step="0.05"
          value={momentum}
          onChange={(e) => setMomentum(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-600 mt-1">
          Carries speed from previous steps — sometimes enough to roll straight
          through a shallow valley and escape it.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRun}
          disabled={!ball || running}
          className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Run
        </button>
        <button
          onClick={onPause}
          disabled={!running}
          className="px-4 py-2 rounded-md border border-gray-700 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Pause
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-md border border-gray-700 text-sm"
        >
          Reset
        </button>
      </div>

    </div>
  );
}