import "./DeleteSchedule.scss";
import { MdOutlineDelete } from "react-icons/md";

const DeleteScheduleComponent = ({ schedule, onClick }: any) => {
  return (
    <div
      className="delete-schedule-wrapper"
      title="delete schedule"
      onClick={onClick}
    >
      <MdOutlineDelete />
    </div>
  );
};

export default DeleteScheduleComponent;
