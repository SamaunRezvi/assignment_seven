"use client";

import { useId, useState, type ComponentPropsWithoutRef } from "react";

interface FormFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "id"> {
  label: string;
  error?: string;
}

export function FormField({
  label,
  error,
  type = "text",
  className,
  ...props
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && isVisible ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`input w-full ${isPassword ? "pr-16" : ""} ${error ? "input-error" : ""} ${className ?? ""}`}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setIsVisible((value) => !value)}
            className="text-primary absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium"
            aria-pressed={isVisible}
          >
            {isVisible ? "লুকান" : "দেখুন"}
          </button>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-error text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
