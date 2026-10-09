"use client";

import { useId } from "react";
import { sortOptions } from "@/config/site";
import { isSortOrder } from "@/lib/products/selectors";
import type { SortOrder } from "@/types/product";

interface SortSelectProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-base-content/70 text-sm font-medium">
        সাজান
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => {
            if (isSortOrder(event.target.value)) onChange(event.target.value);
          }}
          className="select select-sm sm:select-md w-full min-w-44 appearance-none pr-9"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-base-content/60 pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
