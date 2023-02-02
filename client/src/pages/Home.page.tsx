import "./Home.scss";

import { useMemo } from "react";
import { useGetDataQuery } from "../features/api/apiDataSlice";
import OfficeComponent from "../features/data/components/Office.component";
import Tabs, { Tab } from "../components/Tabs/Tabs.component";

function HomePage() {
  const { isLoading, data, error, isFetching, isError } =
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

  return (
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
  );
}

export default HomePage;
