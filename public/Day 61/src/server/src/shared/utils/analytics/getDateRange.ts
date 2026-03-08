import { endOfYear, startOfYear, subDays, subMonths, subYears } from "date-fns";

interface DateRangeInput {
  timePeriod?: string;
  year?: number;
  startDate?: string;
  endDate?: string;
}

// Output includes calculated date boundaries, including current and prior periods for comparison.
interface DateRangeOutput {
  currentStartDate?: Date;
  previousStartDate?: Date;
  previousEndDate?: Date;
  yearStart?: Date;
  yearEnd?: Date;
}

export function getDateRange({
  timePeriod,
  year,
  startDate,
  endDate,
}: DateRangeInput): DateRangeOutput {
  const now = new Date();

  // Will hold computed values for the current period and the immediately preceding comparable period.
  let currentStartDate: Date | undefined;
  let previousStartDate: Date | undefined;
  let previousEndDate: Date | undefined;
  let yearStart: Date | undefined;
  let yearEnd: Date | undefined;

  // If a year is passed, compute the exact start and end of that calendar year.
  if (year) {
    // Months are zero-indexed: January = 0
    yearStart = startOfYear(new Date(year, 0, 1));
    yearEnd = endOfYear(new Date(year, 0, 1));
  }

  // If user explicitly provides start and end dates, assume a custom range.
  if (startDate && endDate) {
    currentStartDate = new Date(startDate);

    // When using a custom range, previous periods are not inferred.
    previousStartDate = undefined;
    previousEndDate = undefined;
  } else {
    // If no custom range is provided, fall back to predefined timePeriod logic.
    switch (timePeriod) {
      case "last7days":
        // * Example: If today is April 17, 2025
        // currentStartDate = April 10 (7 days ago)
        // previousStartDate = April 3 (14 days ago)
        // previousEndDate = April 10 (7 days ago again — the end of the previous period)
        // ? So:
        //   - The "current" period is from April 10 → April 17 (today)
        //   - The "previous" period is from April 3 → April 10 (same length, just shifted back)
        currentStartDate = subDays(now, 7);
        previousStartDate = subDays(now, 14);
        previousEndDate = subDays(now, 7);
        break;

      case "lastMonth":
        // Current period: last full month; Previous: month before last.
        currentStartDate = subMonths(now, 1);
        previousStartDate = subMonths(now, 2);
        previousEndDate = subMonths(now, 1);
        break;
      case "lastYear":
        // Current period: last year from today; Previous: the year before that.
        currentStartDate = subYears(now, 1);
        previousStartDate = subYears(now, 2);
        previousEndDate = subYears(now, 1);
        break;
      case "allTime":
        // No filtering; returns undefined to imply "since the beginning."
        currentStartDate = undefined;
        previousStartDate = undefined;
        previousEndDate = undefined;
        break;
      case "custom":
        // Custom keyword used without explicit dates — this is invalid.
        throw new Error("Custom time period requires startDate and endDate");
      default:
        // Defensive check: ensures unexpected timePeriod strings are caught early.
        throw new Error(`Invalid time period: ${timePeriod}`);
    }
  }

  // Final assembled result containing relevant time boundaries.
  return {
    currentStartDate,
    previousStartDate,
    previousEndDate,
    yearStart,
    yearEnd,
  };
}
