import { Area, Office, Row } from 'src/schemas';

export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');

export const numberToString = (num: number) => {
  return zeroPad(num, 3);
};

export const generateNumber = (parent, newNumber) => {
  const parentNumber = parent.number;
  const newNumberString = numberToString(newNumber);
  return parentNumber + '-' + newNumberString;
};
