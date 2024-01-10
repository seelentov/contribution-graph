import { formatDateToShortString } from "../../utils/date/formatDateToShortString";
import { months } from "../constants/months";
import { ContribData } from "../types/contribution";

const API_URL = 'https://dpg.gg/test/calendar.json';

type IGetContribData = {
  contribsArray: ContribData[]
  months: string[]
}

export const getContribData = async (): Promise<IGetContribData> => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 357);

  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Не удалось получить список контрибуции');
  }
  const apiContribs = await response.json();
  const apiContribsKeys = Object.keys(apiContribs)

  const contribsArray: ContribData[] = [];

  for (let date = new Date(startDate); date <= currentDate; date = new Date(date.getTime() + 86400000)) {

    let contrib = 0
    const dateString = formatDateToShortString(date)
    if (apiContribsKeys.includes(dateString)) {
      contrib = apiContribs[dateString]
    }

    contribsArray.push({ date: new Date(date), contrib });
  }

  const months = getMonthsList()

  return { contribsArray, months };
};


const getMonthsList = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1

  return months.slice(currentMonth,).concat(months.slice(0,currentMonth));
}