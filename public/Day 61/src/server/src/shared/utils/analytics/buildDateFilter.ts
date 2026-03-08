export const buildDateFilter = (
  startDate?: Date,
  endDate?: Date,
  yearStart?: Date,
  yearEnd?: Date
) => ({
  ...(startDate && { gte: startDate }),
  ...(endDate && { lte: new Date(endDate) }),
  ...(yearStart && { gte: yearStart }),
  ...(yearEnd && { lte: yearEnd }),
});
