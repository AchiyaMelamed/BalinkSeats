import "./ScheduleSeatModal.scss";

import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { useMemo, useEffect } from "react";
import FormComponent from "../../Form";
import SmallLabelComponent from "../../SmallLabel/SmallLabel.component";
import ModalComponent from "../Modal.component";
import DropdownComponent from "../../Dropdown/Dropdown.component";
import { OptionUnstyled } from "@mui/base";
import { useGetAllEmployeesQuery } from "../../../features/api/apiDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/features/store";
import { setScheduleFor } from "../../../store/features/dataSlice";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (signedUser) {
      dispatch(setScheduleFor(signedUser));
    }
  }, [signedUser, dispatch]);

  const filteredSeatSchedules = useMemo(() => {
    if (seatSchedules && seatSchedules.length > 0) {
      return seatSchedules
        .filter(
          (scheduled: any) =>
            new Date(scheduled.endDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0)
        )
        .sort((a: any, b: any) => {
          if (a.startDate < b.startDate) {
            return -1;
          }
          if (a.startDate > b.startDate) {
            return 1;
          }
          return 0;
        });
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
        {filteredSeatSchedules ? (
          filteredSeatSchedules.map(
            (schedule: {
              id: string;
              employee: { _id: string; firstName: string; lastName: string };
              seat: { id: string; number: string };
              startDate: string;
              endDate: string;
            }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={schedule.id}
                >
                  <DialogTitle
                    sx={{
                      padding: "0",
                      color: "#301E67 !important",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    {moment(schedule.startDate).format("DD-MM-YYYY")} -
                    {moment(schedule.endDate).format("DD-MM-YYYY")}
                  </DialogTitle>
                  <SmallLabelComponent
                    labelStyle={{ padding: 0, color: "#A61F69 !important" }}
                    divStyle={{ marginTop: 0 }}
                  >
                    {schedule.employee.firstName} {schedule.employee.lastName}
                  </SmallLabelComponent>
                </div>
              );
            }
          )
        ) : (
          <SmallLabelComponent labelStyle={{ color: "red !important" }}>
            No Scheduled for this seat
          </SmallLabelComponent>
        )}
      </>
    ),
    [filteredSeatSchedules, allScheduledTitle]
  );

  const { data: allEmployees } = useGetAllEmployeesQuery("employees");

  const scheduleSeatModal = allEmployees && (
    <ModalComponent
      open={showModal}
      title={`Schedule Seat for`}
      titleStyle={{ textAlign: "center", padding: "0.5rem 0 0 0" }}
      onClose={onCloseModal}
      secondModal={allScheduledModal || null}
    >
      <DropdownComponent
        options={allEmployees}
        selected={
          allEmployees.find(
            (employee: any) => employee.email === signedUser.email
          ) || null
        }
        handleSelect={(event: any, newValue: any) => {
          if (newValue)
            dispatch(
              setScheduleFor({
                name: `${newValue.firstName} ${newValue.lastName}`,
                email: newValue.email,
              })
            );
        }}
        getOptionLabel={(option: any) =>
          `${option.firstName} ${option.lastName} - ${option.email}`
        }
        isOptionEqualToValue={(option: any, value: any) =>
          option._id === value._id
        }
      ></DropdownComponent>
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
