import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScheduledState {
  id: string;
  startDate: string;
  endDate: string;
  employee: {
    id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    level: string;
  };
  seat: { id: string; number: string };
}

const initialScheduledState: ScheduledState = {
  id: "",
  startDate: "",
  endDate: "",
  employee: {
    id: "",
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    level: "",
  },
  seat: {
    id: "",
    number: "",
  },
};

const initialUpdatedScheduledState: any = {
  id: "",
  startDate: "",
  endDate: "",
  seatNumber: " ",
  employeeEmail: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    scheduled: [initialScheduledState],
    scheduleFor: { name: "", email: "" },
    updatedSchedule: initialUpdatedScheduledState,
    allEmployees: [{}],
  },
  reducers: {
    setScheduled: (
      state,
      action: PayloadAction<[typeof initialScheduledState]>
    ) => {
      state.scheduled = action.payload;
    },
    setScheduleFor: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.scheduleFor = action.payload;
    },
    setUpdatedSchedule: (
      state,
      action: PayloadAction<typeof initialUpdatedScheduledState>
    ) => {
      state.updatedSchedule = action.payload;
    },
    setUpdatedStartDate: (state, action: PayloadAction<string>) => {
      state.updatedSchedule.startDate = action.payload;
    },
    setUpdatedEndDate: (state, action: PayloadAction<string>) => {
      state.updatedSchedule.endDate = action.payload;
    },
    setUpdatedSeat: (state, action: PayloadAction<string>) => {
      state.updatedSchedule.seatNumber = action.payload;
    },
    setUpdatedEmployeeEmail: (state, action: PayloadAction<string>) => {
      state.updatedSchedule.employeeEmail = action.payload;
    },
    setAllEmployees: (state, action: PayloadAction<[{}]>) => {
      state.allEmployees = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const {
  setScheduled,
  setScheduleFor,
  setAllEmployees,
  setUpdatedStartDate,
  setUpdatedEndDate,
  setUpdatedSchedule,
  setUpdatedEmployeeEmail,
  setUpdatedSeat,
} = dataSlice.actions;
