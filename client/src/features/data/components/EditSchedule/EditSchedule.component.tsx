import "./EditSchedule.scss";
import { MdOutlineDelete } from "react-icons/md";
import PermissionComponent from "../../../Permissions/components/Permission.component";
import SmallLabelComponent from "../../../../components/SmallLabel/SmallLabel.component";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/features/store";
import DropdownComponent from "../../../../components/Dropdown/Dropdown.component";
import {
  setScheduleFor,
  setUpdatedEndDate,
  setUpdatedSchedule,
  setUpdatedEmployeeEmail,
  setUpdatedSeat,
  setUpdatedStartDate,
} from "../../../../store/features/dataSlice";
import { useEffect, useMemo, useState } from "react";
import FormComponent from "../../../../components/Form";
import moment from "moment";

const EditScheduleComponent = ({
  schedule,
  onSubmit,
  onClose,
  results,
}: any) => {
  const [successLabel, setSuccessLabel] = useState({ label: "" });
  const [errorLabel, setErrorLabel] = useState({ label: "" });
  const updatedSchedule = useAppSelector((state) => state.data.updatedSchedule);
  const dispatch = useAppDispatch();
  const signedUser = useAppSelector((state) => state.signed.signedUser);
  const allEmployees = useAppSelector((state) => state.data.allEmployees);

  useEffect(() => {
    dispatch(
      setUpdatedSchedule({
        id: schedule.id,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        seatNumber: schedule.seat.number,
        employeeEmail: schedule.employee.email,
      })
    );
  }, [dispatch, schedule]);

  const {
    startDate: newStartDate,
    endDate: newEndDate,
    seatNumber: newSeat,
  } = updatedSchedule;

  const formFields = useMemo(() => {
    return [
      {
        name: "seatNumber",
        label: "Seat Number",
        type: "text",
        placeHolder: "office-area-row-seat (Space for previous seat)",
        required: true,
        value: newSeat !== " " ? newSeat : schedule.seat.number,
        onChange: (e: any) => dispatch(setUpdatedSeat(e.currentTarget.value)),
      },
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
        placeHolder: "MM-DD-YYYY",
        required: true,
        value:
          newStartDate !== ""
            ? moment(newStartDate).format("YYYY-MM-DD")
            : moment(schedule.startDate).format("YYYY-MM-DD"),
        onChange: (e: any) =>
          dispatch(setUpdatedStartDate(e.currentTarget.value)),
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
        placeHolder: "MM-DD-YYYY",
        required: true,
        value:
          newEndDate !== ""
            ? moment(newEndDate).format("YYYY-MM-DD")
            : moment(schedule.endDate).format("YYYY-MM-DD"),
        onChange: (e: any) =>
          dispatch(setUpdatedEndDate(e.currentTarget.value)),
      },
    ];
  }, [newStartDate, newEndDate, schedule, newSeat, dispatch]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      newStartDate === schedule.startDate &&
      newEndDate === schedule.endDate &&
      newSeat === schedule.seat.number &&
      updatedSchedule.employeeEmail === schedule.employee.email
    ) {
      setErrorLabel({ label: "No changes made" });
      return;
    }
    const seatNumberArray = newSeat.split("-");
    if (
      seatNumberArray.length !== 4 ||
      seatNumberArray.some((item: string) => item.length !== 3)
    ) {
      setErrorLabel({ label: "Seat number is not valid" });
      return;
    }
    onSubmit({ id: schedule.id, newSchedule: updatedSchedule });
  };

  return (
    <div
      style={{
        width: "80%",
        background: "#f0f7f9",
        borderRadius: "0.5rem",
      }}
    >
      <PermissionComponent
        levelPermitted={"Admin"}
        showInstead={
          <SmallLabelComponent
            labelStyle={{
              color: "#5e2f7b !important",
              fontWeight: "600",
              fontSize: "0.8rem",
            }}
            divStyle={{ margin: "0" }}
          >
            {signedUser.name}
          </SmallLabelComponent>
        }
      >
        <DropdownComponent
          inputStyle={{ width: "90%" }}
          options={allEmployees}
          selected={
            allEmployees.find(
              (employee: any) => employee.email === schedule.employee.email
            ) || null
          }
          handleSelect={(event: any, newValue: any) => {
            dispatch(setUpdatedEmployeeEmail(newValue.email));
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
      <FormComponent
        fields={formFields}
        marginField={"0"}
        inputLabelStyle={{ color: "#A61F69 !important" }}
        submitButtonLabel="Edit"
        requestStatus={results.status}
        onSubmitHandler={handleSubmit}
        submitButtonStyle={{
          width: "20%",
        }}
      />
    </div>
  );
};

export default EditScheduleComponent;
