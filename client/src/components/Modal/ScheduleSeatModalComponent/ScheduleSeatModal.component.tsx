import "./ScheduleSeatModal.scss";

import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import React, { useMemo } from "react";
import FormComponent from "../../Form";
import SmallLabelComponent from "../../SmallLabel/SmallLabel.component";
import ModalComponent from "../Modal.component";

const ScheduleSeatModalComponent = ({
  showModal,
  signedUser,
  seatData,
  seatSchedules,
  results,
  onSubmit,
  onCloseModal,
  errorLabel,
  errorComponent,
  successLabel,
  successComponent,
  formFields,
}: any) => {
  const orderedSeatSchedules = useMemo(() => {
    if (seatSchedules && seatSchedules.length > 0) {
      const res = {} as any;
      for (const scheduled of seatSchedules) {
        if (!res[scheduled?.employee?._id]) {
          res[scheduled.employee._id] = {
            name: `${scheduled.employee.firstName} ${scheduled.employee.lastName}`,
            schedules: [scheduled],
          };
        } else {
          res[scheduled.employee._id].schedules.push(scheduled);
        }
      }
      return res;
    }
  }, [seatSchedules]);

  const allScheduledTitle = useMemo(
    () => (
      <DialogTitle
        sx={{
          padding: "0.5rem 0 0 0",
          textAlign: "center",
          color: "#5e2f7b!important",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        All Scheduled:
      </DialogTitle>
    ),
    []
  );

  const allScheduledModal = useMemo(
    () => (
      <>
        {allScheduledTitle}
        {orderedSeatSchedules ? (
          Object.keys(orderedSeatSchedules).map((employeeId: string) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={employeeId}
              >
                <DialogTitle
                  sx={{
                    padding: "0.5rem 0 0.2rem",
                    color: "#301E67 !important",
                    fontWeight: "500",
                    fontSize: "1.2rem",
                  }}
                >
                  {orderedSeatSchedules[employeeId].name}:
                </DialogTitle>
                {orderedSeatSchedules[employeeId].schedules.map(
                  (schedule: any) => (
                    <SmallLabelComponent
                      labelStyle={{ padding: 0, color: "#A61F69 !important" }}
                      divStyle={{ marginTop: 0 }}
                      key={schedule.id}
                    >
                      {moment(schedule.startDate).format("DD-MM-YYYY")} -
                      {moment(schedule.endDate).format("DD-MM-YYYY")}
                    </SmallLabelComponent>
                  )
                )}
              </div>
            );
          })
        ) : (
          <SmallLabelComponent labelStyle={{ color: "red !important" }}>
            No Scheduled for this seat
          </SmallLabelComponent>
        )}
      </>
    ),
    [orderedSeatSchedules, seatSchedules]
  );

  const scheduleSeatModal = (
    <ModalComponent
      open={showModal}
      title={`Schedule Seat for`}
      titleStyle={{ textAlign: "center", padding: "0.5rem 0 0 0" }}
      onClose={onCloseModal}
      secondModal={allScheduledModal || null}
    >
      <DialogTitle
        sx={{
          padding: 0,
          textAlign: "center",
          color: "#A084DC !important",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        {signedUser.name}
      </DialogTitle>
      {successLabel?.label !== "" && successComponent}
      {errorLabel?.label !== "" && errorComponent}
      <SmallLabelComponent
        labelStyle={{ padding: 0, color: "#96E5D1 !important" }}
        divStyle={{ marginTop: 0 }}
      >
        Seat number {seatData.seat.number}
      </SmallLabelComponent>
      <FormComponent
        fields={formFields}
        titleLabel="Please fill the fields below to schedule a seat"
        inputLabelStyle={{ color: "#A61F69 !important" }}
        submitButtonLabel="Schedule"
        requestStatus={results.status}
        onSubmitHandler={onSubmit}
      />
    </ModalComponent>
  );
  return scheduleSeatModal;
};

export default ScheduleSeatModalComponent;
