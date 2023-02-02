import "./Area.scss";

import { useMemo } from "react";
import FormWrapper from "../../../components/BoxGridForm/BoxGridForm.component";
import RowComponent from "./Row.component";

const AreaComponent = ({ areaData }: any) => {
  const renderedRows = useMemo(
    () => (
      <div className="rows-wrapper">
        {areaData.rows?.map((rowData: any) => {
          return <RowComponent rowData={rowData} key={rowData.row._id} />;
        })}
      </div>
    ),
    [areaData]
  );
  return (
    <FormWrapper
      titleLabel={`${areaData.area.number.slice(4)} - ${
        areaData.area.description
      }`}
      boxStyle={{
        minWidth: "calc(50% - 1rem)",
        margin: "0",
        padding: "0",
        borderColor: "#96E5D1",
        borderWidth: "0.15rem",
        borderStyle: "dotted",
        flex: "1 0",
        borderRadius: "5rem",
      }}
      gridStyle={{ padding: "0.5rem 1rem 1rem", gap: "1rem" }}
      titleStyle={{
        marginBottom: "0.1rem",
        fontSize: "1.3rem",
        color: "#96E5D1 !important",
        fontWeight: "500",
      }}
    >
      {renderedRows}
    </FormWrapper>
  );
};

export default AreaComponent;
