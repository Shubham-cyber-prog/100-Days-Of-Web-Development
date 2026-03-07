"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ListCardHeaderProps {
  title: string;
  viewAllLink?: string;
}

const ListCardHeader = ({ title, viewAllLink }: ListCardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          View all <ExternalLink className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
};

export default ListCardHeader;
