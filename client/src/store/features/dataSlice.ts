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
  },
  reducers: {
    setScheduled: (state, action: PayloadAction<[{}]>) => {
      state.scheduled = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { setScheduled } = dataSlice.actions;
