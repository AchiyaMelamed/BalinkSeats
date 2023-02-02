import "./Row.scss";

import { useMemo } from "react";
import FormWrapper from "../../../components/BoxGridForm/BoxGridForm.component";
import SeatComponent from "./Seat.component";

const RowComponent = ({ rowData }: any) => {
  const renderedSeats = useMemo(
    () => (
      <div
        className={`seats-wrapper ${
          rowData.row.orientation === "vertical" && "column-seats"
        }`}
      >
        <div className="label">{rowData.row.number.slice(8)}</div>
        {rowData.seats?.map((seatData: any) => {
          return <SeatComponent seatData={seatData} key={seatData.seat._id} />;
        })}
      </div>
    ),
    [rowData]
  );
  return (
    <FormWrapper
      titleLabel={`${rowData.row.number.slice(8)} - ${rowData.row.description}`}
      titleOnHover={true}
      boxStyle={{
        borderColor: "#AF7AB3",
        borderWidth: "0.1rem",
        borderStyle: "dotted",
        width: "fit-content",
        minWidth: `${
          rowData.row.orientation === "horizontal" ? "80%" : "auto"
        }`,
        margin: "0",
        padding: "0",
        borderRadius: "2rem",
      }}
      gridStyle={{
        padding: "0.5rem 1rem 1rem",
        gap: "0.2rem",
        alignItems: "center",
      }}
      titleStyle={{
        marginBottom: "0.1rem",
        fontSize: "1.1rem",
        color: "#AF7AB3 !important",
        fontWeight: "500",
      }}
    >
      {renderedSeats}
    </FormWrapper>
  );
};

export default RowComponent;
