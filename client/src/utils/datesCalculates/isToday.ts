import moment from "moment";

const isToday = (startDate: string, endDate: string) => {
  const today = moment().format("YYYY-MM-DD");
  return (
    today === moment(startDate).format("YYYY-MM-DD") ||
    today === moment(endDate).format("YYYY-MM-DD") ||
    moment(today).isBetween(startDate, endDate)
  );
};

export default isToday;
