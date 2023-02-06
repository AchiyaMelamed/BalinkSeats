import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScheduledState {
  scheduled: [any];
}

const initialScheduledState: ScheduledState = {
  scheduled: [{}],
};

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    scheduled: initialScheduledState.scheduled,
    scheduleFor: { name: "", email: "" },
  },
  reducers: {
    setScheduled: (state, action: PayloadAction<[{}]>) => {
      state.scheduled = action.payload;
    },
    setScheduleFor: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.scheduleFor = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { setScheduled, setScheduleFor } = dataSlice.actions;
