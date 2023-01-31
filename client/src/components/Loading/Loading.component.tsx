import "./Loading.scss";

const LoadingComponent = ({ count = 3, color = "#9073c0" }: any) => {
  const renderedDots = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`loading-dot dot`}
      style={{ backgroundColor: color }}
    ></div>
  ));

  return <div className="loading-dots-container">{renderedDots}</div>;
};

export default LoadingComponent;
