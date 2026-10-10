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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const toggleLabel = `${label} ${isPasswordVisible ? "লুকান" : "দেখুন"}`;

  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label-text mb-1 block font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          id={id}
          type={isPassword && isPasswordVisible ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : props["aria-describedby"]}
          className={`input input-bordered w-full ${isPassword ? "pr-11" : ""} ${error ? "input-error" : ""} ${className ?? ""}`}
        />
        {isPassword ? (
          <button
            type="button"
            className="password-toggle text-base-content/70 hover:bg-primary/8 hover:text-primary absolute top-1/2 right-1 grid size-8 -translate-y-1/2 place-items-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-40"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            disabled={props.disabled}
            aria-label={toggleLabel}
            title={toggleLabel}
            aria-pressed={isPasswordVisible}
            aria-controls={id}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
            >
              {isPasswordVisible ? (
                <>
                  <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.8 5.2A11 11 0 0 1 12 5c5.4 0 9 7 9 7a16.7 16.7 0 0 1-3 3.8M6.1 6.1A17 17 0 0 0 3 12s3.6 7 9 7a10.4 10.4 0 0 0 5-1.4" />
                </>
              ) : (
                <>
                  <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
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
