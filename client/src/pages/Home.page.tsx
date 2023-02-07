import "./Home.scss";

import { useEffect, useMemo, useState } from "react";
import {
  useGetDataQuery,
  useGetScheduledQuery,
} from "../features/api/apiDataSlice";
import OfficeComponent from "../features/data/components/Office.component";
import Tabs, { Tab } from "../components/Tabs/Tabs.component";
import LoadingComponent from "../components/Loading/Loading.component";
import SmallLabelComponent from "../components/SmallLabel/SmallLabel.component";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import { setScheduled } from "../store/features/dataSlice";
import isToday from "../utils/datesCalculates/isToday";
import { logoutUser } from "../store/features/signedUserSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ModalComponent from "../components/Modal/Modal.component";

function HomePage() {
  const [showSittingToday, setShowSittingToday] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error, isError } = useGetDataQuery("data");
  const { data: dataScheduled } = useGetScheduledQuery("scheduled");
  const signedUser = useAppSelector((state) => state.signed.signedUser);

  useEffect(() => {
    if (dataScheduled) {
      dispatch(setScheduled(dataScheduled));
    }
  }, [dataScheduled, dispatch]);

  const renderedOffices = useMemo(
    () =>
      data?.map((officeData: any) => {
        return (
          <div className="office-wrapper" key={officeData?.office._id}>
            <OfficeComponent officeData={officeData} />
          </div>
        );
      }),
    [data]
  );

  const errorComponent = useMemo(() => {
    return (
      <SmallLabelComponent
        labelStyle={{
          color: "red !important",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        ERROR while loading data, please try again
      </SmallLabelComponent>
    );
  }, []);

  const sittingToday = dataScheduled?.filter((scheduled: any) => {
    return (
      scheduled.employee.email === signedUser?.email &&
      isToday(scheduled.startDate, scheduled.endDate)
    );
  })[0];

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

  const sittingTodayComponent = useMemo(() => {
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
          color: "#09ffd680 !important",
          fontWeight: "600",
          fontSize: "0.8rem",
          border: "#88ffeb80 1px solid",
          borderRadius: "0.5rem",
          margin: "0",
        }}
      >
        <u>Office:</u> {officeSittingToday?.office?.description} (
        {officeSittingToday?.office?.number})
        <br />
        <u>Area:</u> {areaSittingToday?.area?.description} (
        {areaSittingToday?.area?.number.split("-")[1]})
        <br />
        <u>Row:</u> {rowSittingToday?.row?.description} (
        {rowSittingToday?.row?.number.split("-")[2]})
        <br />
        <u>Seat:</u> ({sittingToday?.seat.number.split("-")[3]})
        <br />
        <i>Enjoy!</i>
      </SmallLabelComponent>
    );
  }, [sittingToday, officeSittingToday, areaSittingToday, rowSittingToday]);

  return isLoading ? (
    <div className="loading">
      <LoadingComponent />
    </div>
  ) : isError ? (
    errorComponent
  ) : (
    data && (
      <div className="main">
        {sittingToday && (
          <Button
            sx={{
              color: "#88ffeb80 !important",
              padding: 0,
              border: "#88ffeb80 1px solid",
            }}
            onClick={() => setShowSittingToday(!showSittingToday)}
          >
            Where I sit Today?
          </Button>
        )}
        {showSittingToday && sittingTodayComponent}
        <Tabs>
          {renderedOffices?.map((office: any, index: number) => {
            return (
              <Tab label={data[index].office.description} key={index}>
                {office}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    )
  );
}

export default HomePage;
