import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SmallLabelComponent from "../components/SmallLabel/SmallLabel.component";
import {
  useDeleteScheduleMutation,
  useGetScheduledQuery,
} from "../features/api/apiDataSlice";
import DeleteScheduleComponent from "../features/data/components/DeleteSchedule/DeleteSchedule.component";
import PermissionComponent from "../features/Permissions/components/Permission.component";
import { useAppSelector } from "../store/features/store";

const ProfilePage = () => {
  const [signedUser] = useAppSelector((state) => [state.signed.signedUser]);
  const { data: scheduled } = useGetScheduledQuery("scheduled");
  const [deleteSchedule, resultsDeleteSchedule] = useDeleteScheduleMutation();
  const [futureScheduledForEmployee, setFutureScheduledForEmployee] = useState(
    []
  ) as any;
  const [pastScheduledForEmployee, setPastScheduledForEmployee] = useState(
    []
  ) as any;

  useEffect(() => {
    setFutureScheduledForEmployee([]);
    setPastScheduledForEmployee([]);
    if (scheduled && scheduled?.length > 0) {
      for (let schedule of scheduled) {
        if (schedule.employee.email === signedUser.email) {
          if (
            new Date(schedule.endDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0)
          ) {
            setFutureScheduledForEmployee((prev: any) =>
              [...prev, schedule].sort((a: any, b: any) => {
                if (a.startDate < b.startDate) {
                  return -1;
                }
                if (a.startDate > b.startDate) {
                  return 1;
                }
                return 0;
              })
            );
          } else {
            setPastScheduledForEmployee((prev: any) =>
              [...prev, schedule].sort((a: any, b: any) => {
                if (a.startDate < b.startDate) {
                  return -1;
                }
                if (a.startDate > b.startDate) {
                  return 1;
                }
                return 0;
              })
            );
          }
        }
      }
    }
  }, [scheduled, signedUser]);

  const futureScheduledOfUserTitle = useMemo(
    () => (
      <DialogTitle
        sx={{
          padding: "0.5rem 0 0 0",
          textAlign: "center",
          // color: "#5e2f7b!important",
          fontWeight: "600",
        }}
      >
        Your Schedules
      </DialogTitle>
    ),
    []
  );

  const pastScheduledOfUserTitle = useMemo(
    () => (
      <DialogTitle
        sx={{
          padding: "0.5rem 0 0 0",
          textAlign: "center",
          // color: "#5e2f7b!important",
          fontWeight: "600",
        }}
      >
        Scheduled History
      </DialogTitle>
    ),
    []
  );

  const handleDeleteSchedule = useCallback(
    (schedule: any) => {
      deleteSchedule(schedule.id);
    },
    [deleteSchedule]
  );
  const futureScheduledElement = useMemo(
    () => (
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {futureScheduledOfUserTitle}
        {scheduled &&
        scheduled?.length > 0 &&
        futureScheduledForEmployee?.length > 0 ? (
          futureScheduledForEmployee.map((schedule: any) => {
            return (
              <div style={{ display: "flex" }} key={schedule.id}>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    background: "#ffffff",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  <DialogTitle
                    sx={{
                      padding: "0",
                      color: "#9454bb !important",
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
                    Seat Number: {schedule.seat.number}
                  </SmallLabelComponent>
                </div>
                <DeleteScheduleComponent
                  schedule={schedule}
                  onClick={() => handleDeleteSchedule(schedule)}
                />
              </div>
            );
          })
        ) : (
          <SmallLabelComponent labelStyle={{ color: "red !important" }}>
            No Schedules
          </SmallLabelComponent>
        )}
      </div>
    ),
    [
      futureScheduledForEmployee,
      futureScheduledOfUserTitle,
      handleDeleteSchedule,
      scheduled,
    ]
  );
  const pastScheduledElement = useMemo(
    () => (
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {pastScheduledOfUserTitle}
        {scheduled &&
        scheduled?.length > 0 &&
        pastScheduledForEmployee?.length > 0 ? (
          pastScheduledForEmployee.map((schedule: any) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  background: "#ffffff",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              >
                <DialogTitle
                  sx={{
                    padding: "0",
                    color: "#9454bb !important",
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
                  Seat Number: {schedule.seat.number}
                </SmallLabelComponent>
              </div>
            );
          })
        ) : (
          <SmallLabelComponent labelStyle={{ color: "red !important" }}>
            No Schedules
          </SmallLabelComponent>
        )}
      </div>
    ),
    [futureScheduledOfUserTitle, pastScheduledForEmployee, scheduled]
  );

  return (
    <div>
      <DialogTitle
        sx={{
          padding: "0.5rem 0 0 0",
          textAlign: "center",
          fontSize: "1.7rem",
          color: signedUser.level === "Admin" ? "orange !important" : "",
        }}
      >
        {signedUser?.name}
        {signedUser.level === "Admin" ? " (Admin)" : ""}
      </DialogTitle>
      <SmallLabelComponent
        labelStyle={{ padding: 0, color: "#A61F69 !important" }}
        divStyle={{ marginTop: 0 }}
      >
        {signedUser?.email}
      </SmallLabelComponent>

      <div style={{ display: "flex", gap: "10%", justifyContent: "center" }}>
        {futureScheduledElement}
        {pastScheduledElement}
      </div>
    </div>
  );
};

export default ProfilePage;
