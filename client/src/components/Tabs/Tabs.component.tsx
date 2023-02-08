import "./Tabs.scss";

import { useState } from "react";

export const Tab = ({ label, children }: any) => {
  return <div>{children}</div>;
};

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(
    children?.length > 0 ? children[0].props?.label : ""
  );

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children?.map((child: any) => {
          const { label } = child.props;
          const officeNumber =
            child.props.children.props.children.props.officeData.office.number;

          return (
            <li
              key={label}
              className={
                activeTab === label ? "tab-list-item active" : "tab-list-item"
              }
              title={officeNumber}
              onClick={() => onClickTabItem(label)}
            >
              {label}
            </li>
          );
        })}
      </ol>
      <div className="tab-content">
        {children?.map((child: any) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
