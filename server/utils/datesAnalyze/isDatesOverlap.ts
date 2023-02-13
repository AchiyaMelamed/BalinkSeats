import { DayOfWeek } from 'src/types/DayOfWeek';

const getDates = (start: Date, end: Date): Date[] => {
  const dates = [];
  for (let i = new Date(start); i <= end; ) {
    dates.push(new Date(i));
    i.setDate(i.getDate() + 1);
  }
  return dates;
};

const isDatesOverlap = (
  [start1, end1, repeatEvery1]: [Date | number, Date | number, DayOfWeek[]],
  [start2, end2, repeatEvery2]: [Date | number, Date | number, DayOfWeek[]],
): boolean => {
  // start1 = new Date(start1).setHours(0, 0, 0, 0);
  // end1 = new Date(end1).setHours(0, 0, 0, 0);
  // start2 = new Date(start2).setHours(0, 0, 0, 0);
  // end2 = new Date(end2).setHours(0, 0, 0, 0);
  const daysOfWeekStrings = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ] as DayOfWeek[];
  const start1Date = new Date(start1);
  const end1Date = new Date(end1);
  const start2Date = new Date(start2);
  const end2Date = new Date(end2);

  if (repeatEvery1?.length > 0 || repeatEvery2?.length > 0) {
    if (repeatEvery1?.length > 0 && repeatEvery2?.length === 0) {
      const dates2 = getDates(start2Date, end2Date);
      for (const date of dates2) {
        if (
          date >= start1Date &&
          date <= end1Date &&
          repeatEvery1.includes(daysOfWeekStrings[date.getDay()])
        )
          return true;
      }
      return false;
    } else if (repeatEvery2?.length > 0 && repeatEvery1?.length === 0) {
      const dates1 = getDates(start1Date, end1Date);
      for (const date of dates1) {
        if (
          date >= start2Date &&
          date <= end2Date &&
          repeatEvery2.includes(daysOfWeekStrings[date.getDay()])
        )
          return true;
      }
      return false;
    } else {
      const dates1 = getDates(start1Date, end1Date);
      const dates2 = getDates(start2Date, end2Date);
      for (const date of dates1) {
        if (
          date >= start2Date &&
          date <= end2Date &&
          repeatEvery2.includes(daysOfWeekStrings[date.getDay()]) &&
          repeatEvery1.includes(daysOfWeekStrings[date.getDay()])
        )
          return true;
      }
      for (const date of dates2) {
        if (
          date >= start1Date &&
          date <= end1Date &&
          repeatEvery1.includes(daysOfWeekStrings[date.getDay()]) &&
          repeatEvery2.includes(daysOfWeekStrings[date.getDay()])
        )
          return true;
      }
      return false;
    }
  } else
    return (
      (start1 < end2 && start2 < end1) || start1 === end2 || start2 === end1
    );
};

export default isDatesOverlap;
