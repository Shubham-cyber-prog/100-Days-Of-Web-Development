// Determine if the previous period should be fetched
export const shouldFetchPreviousPeriod = (timePeriod: string): boolean =>
  timePeriod !== "allTime" && timePeriod !== "custom";
