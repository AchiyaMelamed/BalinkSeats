import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const signedUserSlice = createSlice({
  name: "signed",
  initialState: {
    signedUser: { name: "", email: "", token: "" },
  },
  reducers: {
    setSignedUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        token: string;
      }>
    ) => {
      state.signedUser.name = action.payload.name;
      state.signedUser.email = action.payload.email;
      state.signedUser.token = action.payload.token;
    },
    logoutUser: () => {},
  },
});

export default signedUserSlice.reducer;
export const { setSignedUser, logoutUser } = signedUserSlice.actions;
