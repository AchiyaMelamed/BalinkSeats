import "./Home.scss";

import { useEffect, useMemo } from "react";
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

function HomePage() {
  const dispatch = useAppDispatch();
  const { isLoading, data, error, isError } = useGetDataQuery("data");
  const { data: dataScheduled } = useGetScheduledQuery("scheduled");
  const signedUser = useAppSelector((state) => state.auth.signedUser);

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

  const sittingTodayComponent = useMemo(() => {
    return (
      <div className="sitting-today">
        <SmallLabelComponent
          labelStyle={{
            color: "green !important",
            fontWeight: "600",
            fontSize: "1.5rem",
          }}
        >
          You are sitting today at:
        </SmallLabelComponent>
        <SmallLabelComponent
          labelStyle={{
            color: "green !important",
            fontWeight: "600",
            fontSize: "1.5rem",
          }}
          key={sittingToday?.seat?.id}
        >
          {sittingToday?.seat?.number}
        </SmallLabelComponent>
      </div>
    );
  }, [sittingToday]);

  return isLoading ? (
    <div className="loading">
      <LoadingComponent />
    </div>
  ) : isError ? (
    errorComponent
  ) : (
    data && (
      <div className="main">
        {sittingTodayComponent}
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
