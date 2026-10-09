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
      <label htmlFor={id} className="text-base-content/70 text-sm">
        সাজান
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => {
          if (isSortOrder(event.target.value)) onChange(event.target.value);
        }}
        className="select select-bordered select-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
