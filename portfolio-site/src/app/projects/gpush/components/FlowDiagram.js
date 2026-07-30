import { flowSteps } from "../data/flowSteps";

export default function FlowDiagram({ upToSectionId }) {
  const cutoffIndex = flowSteps.findIndex((s) => s.revealedAt === upToSectionId);
  const visibleSteps = cutoffIndex === -1 ? [] : flowSteps.slice(0, cutoffIndex + 1);

  if (visibleSteps.length === 0) return null;

  return (
    <div className="border border-gray-800 rounded-lg p-5 mt-4 bg-black/30">
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
        Flow so far
      </div>

      <div className="flex flex-col gap-0">
        {visibleSteps.map((step, idx) => {
          const isLast = idx === visibleSteps.length - 1;
          return (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isLast ? "bg-amber-400" : "bg-gray-600"
                  }`}
                />
                {!isLast && <div className="w-px flex-1 bg-gray-700 my-1" />}
              </div>

              <div className={`pb-4 ${isLast ? "text-white" : "text-gray-500"}`}>
                <div className="text-sm font-medium">{step.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{step.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}