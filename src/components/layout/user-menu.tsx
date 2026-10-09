"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { routes } from "@/config/site";
import { SignOutButton } from "./sign-out-button";

export function UserMenu({ name, email }: { name: string; email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${name} - অ্যাকাউন্ট`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className="btn btn-ghost btn-sm sm:btn-md max-w-32 gap-2 sm:max-w-64"
      >
        <span
          aria-hidden="true"
          className="bg-primary text-primary-content flex h-4 min-w-6 shrink-0 items-center justify-center rounded-full px-1 text-xs font-bold sm:h-6 sm:min-w-9 sm:px-2 sm:text-sm"
        >
          {name.trim().charAt(0).toUpperCase()}
        </span>
        <span className="hidden min-w-0 truncate sm:inline">{name}</span>
        <span aria-hidden="true" className="text-base-content/60 shrink-0 text-xs">
          ▾
        </span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className="border-base-300 bg-base-100 absolute top-full right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border p-3 shadow-lg"
        >
          <div className="px-2 py-1">
            <p className="text-base-content/80 truncate text-sm font-semibold">{name}</p>
            <p className="text-base-content/65 text-xs break-all">{email}</p>
          </div>
          <div className="mt-1">
            <Link
              href={routes.profile}
              onClick={() => setIsOpen(false)}
              className="hover:bg-base-200 flex min-h-8 items-center gap-1 rounded-lg px-2 py-1 text-sm"
            >
              <span aria-hidden="true">👤</span>
              আমার প্রোফাইল
            </Link>
            <SignOutButton />
          </div>
        </div>
      ) : null}
    </div>
  );
}
