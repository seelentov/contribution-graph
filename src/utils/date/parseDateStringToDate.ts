export const parseDateStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}