"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 w-full", className)}
      classNames={{
        months: "w-full",
        month: "w-full space-y-4",
        caption: "flex justify-center items-center relative h-10 mb-2",
        caption_label: "text-base font-semibold text-white",
        nav: "flex items-center",
        nav_button: cn(
          "h-9 w-9 bg-transparent p-0 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/10 transition-all duration-300 rounded-md"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7 gap-0 mb-3",
        head_cell:
          "text-[#757575] h-10 w-full flex items-center justify-center font-normal text-xs uppercase tracking-wide",
        row: "grid grid-cols-7 gap-0 mt-2",
        cell: "h-10 w-full p-0 relative flex items-center justify-center",
        day: cn(
          "h-10 w-10 p-0 font-medium text-white hover:bg-[#00E676]/20 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
        ),
        day_selected:
          "bg-[#00E676] text-[#121212] font-bold hover:bg-[#00E676] hover:text-[#121212] shadow-[0_0_15px_rgba(0,230,118,0.5)]",
        day_today: "bg-[#1B5E20]/40 text-white font-semibold ring-1 ring-[#00E676]/30 ring-inset",
        day_outside:
          "text-[#424242] opacity-50",
        day_disabled: "text-[#424242] opacity-40 line-through cursor-not-allowed hover:bg-transparent",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };