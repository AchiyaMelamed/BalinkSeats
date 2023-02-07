import { useMemo } from "react";
import SmallLabelComponent from "../../../../components/SmallLabel/SmallLabel.component";
import { useAppSelector } from "../../../../store/features/store";

const SittingTodayComponent = ({ data, sittingToday }: any) => {
  const isSigned = useAppSelector((state: any) => state.signed.isSigned);

  const officeSittingToday = useMemo(() => {
    return data?.filter((office: any) => {
      return office?.office.number === sittingToday?.seat?.number.split("-")[0];
    })[0];
  }, [data, sittingToday]);

  const areaSittingToday = useMemo(() => {
    return officeSittingToday?.areas?.filter((area: any) => {
      return area?.area?.number === sittingToday?.seat?.number.slice(0, 7);
    })[0];
  }, [officeSittingToday, sittingToday]);

  const rowSittingToday = useMemo(() => {
    return areaSittingToday?.rows?.filter((row: any) => {
      return row?.row?.number === sittingToday?.seat?.number.slice(0, 11);
    })[0];
  }, [areaSittingToday, sittingToday]);

  return (
    <SmallLabelComponent
      divStyle={{
        margin: "0",
        textAlign: "start",
        position: "fixed",
        zIndex: "1",
        backgroundColor: "#000000",
        opacity: "0.8",
        borderRadius: "0.5rem",
      }}
      labelStyle={{
        userSelect: "text",
        color: sittingToday ? "#09ffd680 !important" : "red !important",
        fontWeight: "600",
        fontSize: "0.8rem",
        border: "0.08rem solid",
        borderColor: sittingToday ? "#09ffd680 !important" : "red !important",
        borderRadius: "0.5rem",
        margin: "0",
      }}
    >
      {sittingToday ? (
        <>
          <u>Office:</u> {officeSittingToday?.office?.description} (
          {officeSittingToday?.office?.number})
          <br />
          <u>Area-:</u> {areaSittingToday?.area?.description} (
          {areaSittingToday?.area?.number.split("-")[1]})
          <br />
          <u>Row:</u> {rowSittingToday?.row?.description} (
          {rowSittingToday?.row?.number.split("-")[2]})
          <br />
          <u>Seat:</u> ({sittingToday?.seat.number.split("-")[3]})
          <br />
          <i>Enjoy!</i>
        </>
      ) : isSigned ? (
        <>
          You don't have any scheduled seat for today,
          <br /> But you can always schedule one!
        </>
      ) : (
        <>Please Sign In to see your scheduled seat for today,</>
      )}
    </SmallLabelComponent>
  );
};

export default SittingTodayComponent;
