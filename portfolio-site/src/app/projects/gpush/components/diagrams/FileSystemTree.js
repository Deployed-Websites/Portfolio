export default function FileSystemTree({ nodes, highlightId, rootId }) {
  // nodes: array of { id, label, parentId, depth }
  // highlightId: the node to visually mark as "you are here" or "root found"
  // rootId: optionally mark a separate node as the resolved git root

  return (
    <div className="font-mono text-xs space-y-1">
      {nodes.map((node) => {
        const isHighlighted = node.id === highlightId;
        const isRoot = node.id === rootId;

        return (
          <div
            key={node.id}
            style={{ paddingLeft: `${node.depth * 16}px` }}
            className="flex items-center gap-2"
          >
            <span className="text-gray-600">{node.depth > 0 ? "└─" : ""}</span>
            <span
              className={`px-1.5 py-0.5 rounded ${
                isRoot
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : isHighlighted
                  ? "bg-blue-400/20 text-blue-300 border border-blue-400/40"
                  : "text-gray-400"
              }`}
            >
              {node.label}
              {isRoot && " ← .git root"}
              {isHighlighted && !isRoot && " ← you are here"}
            </span>
          </div>
        );
      })}
    </div>
  );
}