import moment from "moment";

const isToday = (startDate: string, endDate: string, repeatEvery: string[]) => {
  const today = moment().format("YYYY-MM-DD");
  return (
    (today === moment(startDate).format("YYYY-MM-DD") ||
      today === moment(endDate).format("YYYY-MM-DD") ||
      moment(today).isBetween(startDate, endDate)) &&
    (repeatEvery?.length === 0 ||
      repeatEvery?.length === 7 ||
      (repeatEvery?.length > 0 &&
        repeatEvery.includes(
          new Date().toLocaleDateString("en-US", { weekday: "long" })
        )))
  );
};

export default isToday;
