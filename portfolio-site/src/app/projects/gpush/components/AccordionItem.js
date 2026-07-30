export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-base font-medium">{title}</span>
        <span className={`text-gray-500 transition-transform ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>

      {isOpen && (
        <div className="pb-6 text-sm text-gray-400 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}