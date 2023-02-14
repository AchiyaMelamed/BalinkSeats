import React from "react";

const RepeatEveryComponent = ({ repeatEvery }: any) => {
  const daysString = repeatEvery.join(", ");
  return (
    <i style={{ color: "#85CDFD", textAlign: "center" }}>
      Every <b style={{ color: "#85CDFD" }}>{daysString}</b>
    </i>
  );
};

export default RepeatEveryComponent;
