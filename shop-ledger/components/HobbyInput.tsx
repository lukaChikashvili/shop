"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function HobbyInput({
  hobbies,
  onChange,
}: {
  hobbies: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addHobby() {
    const trimmed = draft.trim();
    if (!trimmed || hobbies.includes(trimmed)) return;
    onChange([...hobbies, trimmed]);
    setDraft("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((h, i) => (
          <span
            key={i}
            className="flex items-center gap-1 rounded-full border border-white/50 bg-[#1E3A8A]/10 px-3 py-1 text-xs font-medium text-[#0C4A8C]"
          >
            {h}
            <button onClick={() => onChange(hobbies.filter((_, idx) => idx !== i))}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addHobby();
            }
          }}
          placeholder="მაგ: ფოტოგრაფია"
          className="flex-1 rounded-lg border border-white/60 bg-white/40 px-3 py-2 text-sm outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
        />
        <button
          onClick={addHobby}
          className="rounded-lg border border-white/60 bg-white/40 px-3 py-2 text-sm font-medium text-[#0C4A8C] hover:bg-white/60"
        >
          დამატება
        </button>
      </div>
    </div>
  );
}