import "./Area.scss";

import { useMemo } from "react";
import FormWrapper from "../../../components/BoxGridForm/BoxGridForm.component";
import RowComponent from "./Row.component";
// import maxXY from "../../../utils/dataAnalayze/maxXY";

const AreaComponent = ({ areaData }: any) => {
  // const [maxX, maxY] = maxXY(areaData.rows, "row");
  const allHorizontal = useMemo(
    () =>
      areaData.rows?.every((row: any) => row.row.orientation === "horizontal"),
    [areaData]
  );
  const renderedRows = useMemo(
    () => (
      <div className={`rows-wrapper ${allHorizontal && "column-rows"}`}>
        {areaData.rows?.map((rowData: any) => {
          return <RowComponent rowData={rowData} key={rowData.row._id} />;
        })}
      </div>
    ),
    [areaData, allHorizontal]
  );
  return (
    <FormWrapper
      titleLabel={`${areaData.area.number.slice(4)} - ${
        areaData.area.description
      }`}
      boxStyle={{
        minWidth: "calc(50% - 1rem)",
        height: "fit-content",
        width: "100%",
        margin: "0",
        padding: "0",
        borderWidth: "0.15rem",
        flex: "1 0",
        borderRadius: "5rem",
        gridRowStart: areaData.area.position[1] + 1,
        gridColumnStart: areaData.area.position[0] + 1,
      }}
      gridStyle={{ padding: "0.5rem 1rem 1rem", gap: "1rem" }}
      titleStyle={{
        marginBottom: "0.1rem",
        fontSize: "1.3rem",
        color: "#AF7AB3 !important",
        fontWeight: "500",
      }}
    >
      {renderedRows}
    </FormWrapper>
  );
};

export default AreaComponent;
