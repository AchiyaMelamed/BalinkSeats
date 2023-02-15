import "./ScheduleSeatModal.scss";

import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { AiOutlineEdit } from "react-icons/ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormComponent from "../../Form";
import SmallLabelComponent from "../../SmallLabel/SmallLabel.component";
import ModalComponent from "../Modal.component";
import DropdownComponent from "../../Dropdown/Dropdown.component";
import {
  useDeleteScheduleMutation,
  useGetAllEmployeesQuery,
  useUpdateScheduleMutation,
} from "../../../features/api/apiDataSlice";
import { useAppDispatch } from "../../../store/features/store";
import {
  setAllEmployees,
  setScheduleFor,
} from "../../../store/features/dataSlice";
import PermissionComponent from "../../../features/Permissions/components/Permission.component";
import DeleteScheduleComponent from "../../../features/data/components/DeleteSchedule/DeleteSchedule.component";
import EditScheduleComponent from "../../../features/data/components/EditSchedule/EditSchedule.component";
import RepeatEveryComponent from "../../../features/data/components/RepeatEvery/RepeatEvery.component";

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
  const [editMode, setEditMode] = useState("");
  const dispatch = useAppDispatch();
  const [deleteSchedule, resultsDeleteSchedule] = useDeleteScheduleMutation();
  const [editSchedule, resultsEditSchedule] = useUpdateScheduleMutation();

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

  const handleDeleteSchedule = useCallback(
    (schedule: any) => {
      deleteSchedule(schedule.id);
    },
    [deleteSchedule]
  );

  const handleEditClick = useCallback(
    (id: string) => {
      if (editMode === "") setEditMode(id);
      else setEditMode("");
    },
    [editMode]
  );

  const onCloseEdit = useCallback(() => {
    setEditMode("");
  }, []);

  const handleSubmitEdit = useCallback(
    ({ id, newSchedule }: any) => {
      editSchedule({ id, schedule: newSchedule });
    },
    [editSchedule]
  );

  useEffect(() => {
    if (
      resultsEditSchedule?.status === "rejected" ||
      resultsEditSchedule?.data?.ERROR
    ) {
      alert(
        `Error editing schedule: ${
          resultsEditSchedule?.data?.ERROR
            ? resultsEditSchedule?.data?.ERROR
            : JSON.parse(JSON.stringify(resultsEditSchedule?.error))?.data
                ?.message
        }`
      );
    } else if (resultsEditSchedule?.status === "fulfilled") {
      setEditMode("");
    }
  }, [resultsEditSchedule]);

  useEffect(() => {
    if (
      resultsDeleteSchedule?.status === "rejected" ||
      resultsDeleteSchedule?.data?.ERROR
    ) {
      alert(
        `Error deleting schedule: ${
          resultsDeleteSchedule?.data?.ERROR
            ? resultsDeleteSchedule?.data?.ERROR
            : JSON.parse(JSON.stringify(resultsDeleteSchedule?.error))?.data
                ?.message
        }`
      );
    }
  }, [resultsDeleteSchedule]);

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
        Seat Schedules
      </DialogTitle>
    ),
    []
  );

  const allScheduledModal = useMemo(
    () => (
      <>
        {allScheduledTitle}
        {filteredSeatSchedules && filteredSeatSchedules?.length > 0 ? (
          filteredSeatSchedules.map(
            (schedule: {
              id: string;
              employee: {
                _id: string;
                firstName: string;
                lastName: string;
                email: string;
              };
              seat: { id: string; number: string };
              startDate: string;
              endDate: string;
              repeatEvery: string[];
            }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: editMode === schedule.id ? "0.5rem" : "0",
                  }}
                  key={schedule.id}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "95%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      marginBottom: editMode === schedule.id ? "0" : "0.5rem",
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DialogTitle
                        sx={{
                          padding: "0",
                          color: "#301E67 !important",
                          fontWeight: "600",
                          fontSize: "1rem",
                          flex: "0 1 auto",
                          textAlign: "center",
                        }}
                      >
                        {moment(schedule.startDate).format("DD/MM/YYYY")} -
                        {moment(schedule.endDate).format("DD/MM/YYYY")}
                      </DialogTitle>
                      <SmallLabelComponent
                        labelStyle={{ padding: 0, color: "#A61F69 !important" }}
                        divStyle={{ marginTop: 0 }}
                      >
                        {schedule.employee.firstName}{" "}
                        {schedule.employee.lastName}
                      </SmallLabelComponent>
                      <PermissionComponent
                        levelPermitted={"Admin"}
                        emailPermitted={schedule.employee.email}
                      >
                        <DeleteScheduleComponent
                          schedule={schedule}
                          onClick={() => handleDeleteSchedule(schedule)}
                        />
                        <div
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#cd5888",
                            borderRadius: "0.5rem",
                          }}
                          onClick={() => handleEditClick(schedule.id)}
                        >
                          <AiOutlineEdit />
                        </div>
                      </PermissionComponent>
                    </div>
                    {schedule?.repeatEvery?.length > 0 && (
                      <RepeatEveryComponent
                        repeatEvery={schedule.repeatEvery}
                      />
                    )}
                  </div>
                  {editMode === schedule.id && (
                    <EditScheduleComponent
                      key={schedule.id}
                      schedule={schedule}
                      onSubmit={handleSubmitEdit}
                      onClose={onCloseEdit}
                      results={resultsEditSchedule}
                    />
                  )}
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
    [
      filteredSeatSchedules,
      allScheduledTitle,
      handleDeleteSchedule,
      editMode,
      handleEditClick,
      handleSubmitEdit,
      onCloseEdit,
      resultsEditSchedule,
    ]
  );

  const { data: allEmployees } = useGetAllEmployeesQuery("employees");

  useEffect(() => {
    if (allEmployees?.data?.ERROR) alert(allEmployees?.data?.ERROR);
    if (allEmployees?.error)
      alert(JSON.parse(JSON.stringify(allEmployees?.error))?.data?.message);
    if (allEmployees && allEmployees?.length > 0)
      dispatch(setAllEmployees(allEmployees));
  }, [allEmployees, dispatch]);

  const scheduleSeatModal = allEmployees && (
    <ModalComponent
      modalStyle={{ maxWidth: "90vw", padding: "1rem" }}
      open={showModal}
      title={`Schedule Seat for`}
      titleStyle={{ textAlign: "center", padding: "0.5rem 0 0 0" }}
      onClose={onCloseModal}
      secondModal={allScheduledModal || null}
    >
      <PermissionComponent
        levelPermitted={"Admin"}
        showInstead={
          <SmallLabelComponent
            labelStyle={{
              color: "#5e2f7b !important",
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
            divStyle={{ margin: "0" }}
          >
            {signedUser.name}
          </SmallLabelComponent>
        }
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
            else
              dispatch(
                setScheduleFor({
                  name: signedUser.name,
                  email: signedUser.email,
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
      </PermissionComponent>
      {successLabel?.label !== "" && successComponent}
      {errorLabel?.label !== "" && errorComponent}
      <SmallLabelComponent
        labelStyle={{
          padding: 0,
          color: "#96E5D1 !important",
          fontWeight: 600,
        }}
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
