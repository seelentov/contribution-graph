export function formatDateToLongString(date: Date): string {
  const days: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const dayOfWeek: string = days[date.getDay()];
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  const formattedDate: string = `${dayOfWeek}, ${month} ${day}, ${year}`;

  return formattedDate;
}