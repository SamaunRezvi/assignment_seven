"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্য ক্যাটাগরি" className="mx-auto w-full max-w-6xl px-4">
      <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
        {categories.map((category) => {
          const href = routes.category(category.slug);
          const isActive = pathname === href;

          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "btn btn-sm whitespace-nowrap",
                  isActive ? "btn-primary" : "btn-ghost",
                )}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
