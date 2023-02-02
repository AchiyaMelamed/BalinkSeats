import "./Seat.scss";

import { GiOfficeChair } from "react-icons/gi";

const SeatComponent = ({ seatData }: any) => {
  return (
    <div
      className="seat-wrapper available-seat"
      onClick={() => console.log(`seat ${seatData.seat.number} schduled`)}
    >
      <div className="seat-icon">
        <GiOfficeChair className="seat-icon" />
      </div>
      <div className="small">{seatData.seat.number.slice(12)}</div>
    </div>
  );
};

export default SeatComponent;
