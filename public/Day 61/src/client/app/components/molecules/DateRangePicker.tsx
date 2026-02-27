"use client";

import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  isSameDay,
  isToday,
  isWithinInterval,
  isBefore,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Controller, useController } from "react-hook-form";
import Dropdown from "./Dropdown";

interface DateRangePickerProps {
  label?: string;
  control: any;
  startName: string;
  endName: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  control,
  startName,
  endName,
}) => {
  const { field: startField } = useController({ name: startName, control });
  const { field: endField } = useController({ name: endName, control });

  const [currentMonth, setCurrentMonth] = useState<Date>(
    startField.value || new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [selecting, setSelecting] = useState<"start" | "end">("start"); // Track which date is being selected
  const pickerRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = [
    { label: "Sunday", value: "Su" },
    { label: "Monday", value: "Mo" },
    { label: "Tuesday", value: "Tu" },
    { label: "Wednesday", value: "We" },
    { label: "Thursday", value: "Th" },
    { label: "Friday", value: "Fr" },
    { label: "Saturday", value: "Sa" },
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, i) => ({ label: (1900 + i).toString(), value: (1900 + i).toString() })
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: format(new Date(2000, i, 1), "MMMM"),
    value: format(new Date(2000, i, 1), "MMMM"),
  }));

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getDay(startOfMonth(currentMonth));
    const days: (Date | null)[] = Array.from({ length: firstDay }, () => null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
    }
    while (days.length % 7 !== 0) {
      days.push(null);
    }
    return days;
  };

  const handleDateSelect = (date: Date | null) => {
    if (!date) return;

    if (selecting === "start") {
      startField.onChange(date);
      // If the end date is before the new start date, clear it
      if (endField.value && isBefore(endField.value, date)) {
        endField.onChange(null);
      }
      setSelecting("end");
    } else {
      // Ensure end date is not before start date
      if (startField.value && isBefore(date, startField.value)) {
        endField.onChange(startField.value);
        startField.onChange(date);
      } else {
        endField.onChange(date);
      }
      setSelecting("start");
      setIsOpen(false); // Close the picker after selecting the end date
    }
  };

  const handleMonthChange = (next: boolean) => {
    setDirection(next ? 1 : -1);
    setCurrentMonth(
      next ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1)
    );
  };

  const handleYearChange = (selectedYear: string | null) => {
    if (selectedYear !== null) {
      setCurrentMonth(
        new Date(parseInt(selectedYear), currentMonth.getMonth(), 1)
      );
    }
  };

  const handleMonthSelect = (selectedMonth: string | null) => {
    if (selectedMonth !== null) {
      const monthIndex = months.findIndex((m) => m.value === selectedMonth);
      setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    }
  };

  const calendarDays = generateCalendarDays();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format the display value for the input
  const displayValue = () => {
    if (!startField.value && !endField.value) {
      return label || "Select date range";
    }
    const start = startField.value
      ? format(startField.value, "MMM dd, yyyy")
      : "Start";
    const end = endField.value ? format(endField.value, "MMM dd, yyyy") : "End";
    return `${start} - ${end}`;
  };

  return (
    <div className="relative min-w-[300px]" ref={pickerRef}>
      <div
        className="flex justify-between items-center px-3 py-2 rounded-lg border border-gray-200 
                  bg-white cursor-pointer hover:border-gray-300 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-gray-700">
          {displayValue()}
        </span>
        <Calendar size={18} className="text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-10 w-full overflow-hidden"
          >
            <div className="p-3">
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  onClick={() => handleMonthChange(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex space-x-2 w-full px-2">
                  <Controller
                    name="months"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        options={months}
                        value={
                          field.value ||
                          currentMonth.toLocaleString("default", {
                            month: "long",
                          })
                        }
                        onChange={handleMonthSelect}
                        className="text-xs font-medium px-6
                        "
                      />
                    )}
                  />

                  <Controller
                    name="years"
                    control={control}
                    render={() => (
                      <Dropdown
                        options={years}
                        value={currentMonth.getFullYear().toString()}
                        onChange={handleYearChange}
                        className="text-xs font-medium px-6
                        "
                      />
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleMonthChange(true)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={format(currentMonth, "yyyy-MM")}
                  initial={{ x: direction * 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -direction * 10, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {daysOfWeek.map((day) => (
                      <div
                        key={day.value}
                        className="text-xs font-medium text-gray-400 py-1"
                      >
                        {day.value}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarDays.map((date, index) => {
                      const isInRange =
                        date &&
                        startField.value &&
                        endField.value &&
                        isWithinInterval(date, {
                          start: startField.value,
                          end: endField.value,
                        });
                      const isStart =
                        date &&
                        startField.value &&
                        isSameDay(date, startField.value);
                      const isEnd =
                        date &&
                        endField.value &&
                        isSameDay(date, endField.value);

                      return (
                        <div
                          key={index}
                          className={`
                            aspect-square flex items-center justify-center rounded-full text-sm
                            ${date ? "cursor-pointer" : ""}
                            ${
                              date && isToday(date) && !isStart && !isEnd
                                ? "border border-blue-400 text-blue-600"
                                : ""
                            }
                            ${
                              isInRange && !isStart && !isEnd
                                ? "bg-blue-100 text-gray-800"
                                : ""
                            }
                            ${
                              isStart || isEnd
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : date
                                ? "hover:bg-gray-100 text-gray-800"
                                : ""
                            }
                            transition-colors duration-200
                          `}
                          onClick={() => date && handleDateSelect(date)}
                        >
                          {date ? (
                            <span className="text-xs font-medium">
                              {date.getDate()}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                <button
                  className="text-xs font-medium text-blue-500 hover:text-blue-600 px-2 py-1 rounded transition-colors"
                  onClick={() => {
                    const today = new Date();
                    startField.onChange(today);
                    endField.onChange(today);
                    setSelecting("start");
                  }}
                >
                  Today
                </button>
                <button
                  className="text-xs font-medium text-gray-500 hover:text-gray-600 px-2 py-1 rounded transition-colors"
                  onClick={() => {
                    startField.onChange(null);
                    endField.onChange(null);
                    setSelecting("start");
                    setIsOpen(false);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
