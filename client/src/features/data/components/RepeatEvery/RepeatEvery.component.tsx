import React from "react";

const RepeatEveryComponent = ({ repeatEvery }: any) => {
  const daysString = repeatEvery.join(", ");
  return (
    <span style={{ color: "#85CDFD" }}>
      Every <b style={{ color: "#85CDFD" }}>{daysString}</b>
    </span>
  );
};

export default RepeatEveryComponent;
