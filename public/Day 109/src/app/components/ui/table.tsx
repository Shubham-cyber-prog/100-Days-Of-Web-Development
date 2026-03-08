import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={clsx("w-full caption-bottom", className)}
          {...props}
        />
      </div>
    );
  }
);
Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={clsx("border-b", className)} {...props} />;
  }
);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={className} {...props} />;
  }
);
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={clsx(
          "border-b transition-colors hover:bg-muted/50",
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={clsx(
          "h-12 px-4 text-left align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      />
    );
  }
);
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={clsx("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";
