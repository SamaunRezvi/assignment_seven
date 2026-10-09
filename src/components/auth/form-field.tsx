"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

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

  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label-text mb-1 block font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`input input-bordered w-full ${error ? "input-error" : ""} ${className ?? ""}`}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-error text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
