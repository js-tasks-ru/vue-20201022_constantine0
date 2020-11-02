export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function getMonthFirstDay(date) {
  const startDate = new Date(date.valueOf());

  startDate.setDate(1);
  resetTime(startDate);

  return startDate;
}

export function getNextMonthFirstDate(date) {
  const nextMonthDate = new Date(date.valueOf());

  if (nextMonthDate.getMonth() == 11) {
    nextMonthDate.setFullYear(date.getFullYear() + 1);
    nextMonthDate.setMonth(0);
  } else {
    nextMonthDate.setMonth(date.getMonth() + 1);
  }

  return getMonthFirstDay(nextMonthDate);
}

export function getPrevMonthFirstDate(date) {
  const prevMonthDate = new Date(date.valueOf());

  if (prevMonthDate.getMonth() == 0) {
    prevMonthDate.setFullYear(date.getFullYear() - 1);
    prevMonthDate.setMonth(11);
  } else {
    prevMonthDate.setMonth(date.getMonth() - 1);
  }

  return getMonthFirstDay(prevMonthDate);
}

export function getWeekMonday(date) {
  const mondayDate = new Date(date.valueOf());

  resetTime(mondayDate);

  if (mondayDate.getDay() !== 1) {
    const shift = mondayDate.getDay() === 0 ? 6 : mondayDate.getDay() - 1;

    mondayDate.setTime(mondayDate.getTime() - ONE_DAY_IN_MILLISECONDS * shift);
  }

  return mondayDate;
}

function resetTime(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}
