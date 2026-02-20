"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadCrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center text-sm text-gray-500 space-x-1 sm:space-x-2">
        <li>
          <Link
            href="/"
            className="hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <span className="text-gray-400">/</span>
              <li>
                {isLast ? (
                  <span className="capitalize font-semibold">
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-indigo-600 font-medium transition"
                  >
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
