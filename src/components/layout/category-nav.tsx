"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-base-300">
      <ul className="scrollbar-hidden -mx-4 flex gap-1 overflow-x-auto px-4 py-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {categories.map((category) => {
          const href = routes.category(category.slug);
          const isActive = pathname === href;

          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content/75 hover:bg-primary/10 hover:text-primary",
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
