import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const signedUserSlice = createSlice({
  name: "signed",
  initialState: {
    signedUser: { name: "", email: "", token: "" },
    isSigned: false,
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
      state.isSigned = true;
    },
    logoutUser: () => {},
  },
});

export default signedUserSlice.reducer;
export const { setSignedUser, logoutUser } = signedUserSlice.actions;
