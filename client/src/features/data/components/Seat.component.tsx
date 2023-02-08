import "./Seat.scss";

import moment from "moment";
import { GiOfficeChair } from "react-icons/gi";
import { useMemo, useState, useCallback, useEffect } from "react";

import { useAppSelector } from "../../../store/features/store";
import { useScheduleSeatMutation } from "../../api/apiDataSlice";
import SmallLabelComponent from "../../../components/SmallLabel/SmallLabel.component";
import ScheduleSeatModalComponent from "../../../components/Modal/ScheduleSeatModalComponent/ScheduleSeatModal.component";
import isToday from "../../../utils/datesCalculates/isToday";

const SeatComponent = ({ seatData }: any) => {
  const [successLabel, setSuccessLabel] = useState({ label: "" });
  const [errorLabel, setErrorLabel] = useState({ label: "" });
  const [showModal, setShowModal] = useState(false);
  const today = useMemo(() => moment().format("YYYY-MM-DD"), []);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [signedUser, isSigned] = useAppSelector((state) => [
    state.signed.signedUser,
    state.signed.isSigned,
  ]);
  const scheduled = useAppSelector((state) => state.data.scheduled);
  const [schedule, results] = useScheduleSeatMutation();
  const scheduleFor = useAppSelector((state) => state.data.scheduleFor);

  const fields = useMemo(() => {
    return [
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
        placeHolder: "MM-DD-YYYY",
        required: true,
        value: startDate,
        onChange: (e: any) => setStartDate(e.currentTarget.value),
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
        placeHolder: "MM-DD-YYYY",
        required: true,
        value: endDate,
        onChange: (e: any) => setEndDate(e.currentTarget.value),
      },
    ];
  }, [startDate, endDate]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!isSigned)
        return setErrorLabel({ label: "❌ Can't Schedule, Please sign in" });
      schedule({
        seat: seatData.seat._id,
        employeeEmail: scheduleFor.email || signedUser.email,
        startDate,
        endDate,
      });
    },
    [schedule, seatData, signedUser, startDate, endDate, scheduleFor, isSigned]
  );

  let errorComponent = useMemo(() => {
    return (
      <SmallLabelComponent errorText={true}>
        {errorLabel?.label}
      </SmallLabelComponent>
    );
  }, [errorLabel]);

  let successComponent = useMemo(() => {
    return (
      <SmallLabelComponent successText={true}>
        {successLabel?.label}
      </SmallLabelComponent>
    );
  }, [successLabel]);

  const handleClick = () => {
    setShowModal(true);
  };

  const onCloseModal = useCallback(() => {
    setShowModal(false);
    setSuccessLabel({ label: "" });
    setErrorLabel({ label: "" });
    setStartDate(today);
    setEndDate(today);
  }, [today]);

  useEffect(() => {
    if (results.data && !results.data.ERROR && !results.error) {
      setSuccessLabel({ label: "✅ Seat scheduled successfully" });
      setErrorLabel({ label: "" });
    } else if (results?.data?.ERROR || results.error) {
      setErrorLabel({ label: `❌ ${results?.data?.ERROR}` });
      setSuccessLabel({ label: "" });
    }
  }, [results]);

  const seatSchedules = useMemo(() => {
    if (scheduled) {
      return scheduled.filter((schedule: any) => {
        return schedule.seat.id === seatData.seat._id;
      });
    }
  }, [scheduled, seatData]);

  const sittingName = useMemo(() => {
    if (seatSchedules) {
      const found = seatSchedules?.find((schedule: any) => {
        return isToday(schedule.startDate, schedule.endDate);
      });
      if (found)
        return `${found?.employee?.firstName} ${found?.employee?.lastName}`;
    }
    return "";
  }, [seatSchedules]);

  const isAvailableClass = useMemo(() => {
    return !sittingName ? "available-seat" : "not-available-seat";
  }, [sittingName]);

  const isSignedSittingClassName = useMemo(
    () => (isSigned && signedUser.name === sittingName ? "signed-sitting" : ""),
    [signedUser.name, sittingName, isSigned]
  );

  const modal = useMemo(
    () => (
      <ScheduleSeatModalComponent
        showModal={showModal}
        signedUser={signedUser}
        seatData={seatData}
        seatSchedules={seatSchedules}
        results={results}
        onSubmit={onSubmit}
        onCloseModal={onCloseModal}
        errorLabel={errorLabel}
        errorComponent={errorComponent}
        successLabel={successLabel}
        successComponent={successComponent}
        formFields={fields}
      ></ScheduleSeatModalComponent>
    ),
    [
      showModal,
      signedUser,
      seatData,
      results,
      onSubmit,
      onCloseModal,
      errorLabel,
      errorComponent,
      successLabel,
      successComponent,
      fields,
      seatSchedules,
    ]
  );

  return (
    <>
      {modal}
      <div
        className={`seat-wrapper ${isAvailableClass} ${isSignedSittingClassName}`}
        title={`Click to schedule (${seatData.seat.number}})`}
        onClick={() => handleClick()}
      >
        <div className="name-label">{sittingName}</div>
        <div className="seat-icon">
          <GiOfficeChair className="seat-icon" />
        </div>
        <div className="small">{seatData.seat.number.slice(12)}</div>
      </div>
    </>
  );
};

export default SeatComponent;
