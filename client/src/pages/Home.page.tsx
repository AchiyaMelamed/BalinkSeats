import "./Home.scss";

import { useMemo } from "react";
import { useGetDataQuery } from "../features/api/apiDataSlice";
import OfficeComponent from "../features/data/components/Office.component";
import Tabs, { Tab } from "../components/Tabs/Tabs.component";
import LoadingComponent from "../components/Loading/Loading.component";
import SmallLabelComponent from "../components/SmallLabel/SmallLabel.component";

function HomePage() {
  const { isLoading, isFetching, data, error, isError } =
    useGetDataQuery("data");

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
  }, [error]);

  return isLoading ? (
    <div className="loading">
      <LoadingComponent />
    </div>
  ) : isError ? (
    errorComponent
  ) : (
    data && (
      <div className="main">
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
