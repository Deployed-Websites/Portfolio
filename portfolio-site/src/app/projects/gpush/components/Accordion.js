"use client";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion({ items, renderContent }) {
  const [openIds, setOpenIds] = useState([]);
  const [keepOpen, setKeepOpen] = useState(false);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);

      if (isOpen) {
        return prev.filter((i) => i !== id);
      }

      if (keepOpen) {
        return [...prev, id];
      }

      return [id];
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={keepOpen}
            onChange={(e) => setKeepOpen(e.target.checked)}
          />
          Keep open
        </label>
      </div>

      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        >
          {renderContent(item, openIds.includes(item.id))}
        </AccordionItem>
      ))}
    </div>
  );
}