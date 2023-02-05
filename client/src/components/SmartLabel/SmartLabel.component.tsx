import { useMemo } from "react";

const SmartLabelComponent = ({ data, children }: any) => {
  const renderedData = useMemo(() => {
    if (data) {
      return (
        <div className="smart-label">
          {Object.keys(data).map((key: any) => {
            return (
              <div className="smart-label-item" key={key}>
                <div className="smart-label-item-key">{key}</div>
                <div className="smart-label-item-value">{data[key]}</div>
              </div>
            );
          })}
        </div>
      );
    }
  }, [data]);
  return <div>{renderedData}</div>;
};

export default SmartLabelComponent;
