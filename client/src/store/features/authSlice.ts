import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RegisterState {
  email: string;
  firstName: string;
  lastName: string;
  password1: string;
  password2: string;
}

export interface SigninState {
  email: string;
  password: string;
}

const initialRegisterState: RegisterState = {
  email: "",
  firstName: "",
  lastName: "",
  password1: "",
  password2: "",
};

const initialSigninState: SigninState = {
  email: "",
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    register: initialRegisterState,
    signin: initialSigninState,
    signedUser: { name: "", email: "" },
  },
  reducers: {
    setRegisterDetails: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
        password1: string;
        password2: string;
      }>
    ) => {
      state.register.email = action.payload.email;
      state.register.firstName = action.payload.firstName;
      state.register.lastName = action.payload.lastName;
      state.register.password1 = action.payload.password1;
      state.register.password2 = action.payload.password2;
    },
    setRegisterEmail: (state, action: PayloadAction<string>) => {
      state.register.email = action.payload;
    },
    setRegisterFirstName: (state, action: PayloadAction<string>) => {
      state.register.firstName = action.payload;
    },
    setRegisterLastName: (state, action: PayloadAction<string>) => {
      state.register.lastName = action.payload;
    },
    setRegisterPassword1: (state, action: PayloadAction<string>) => {
      state.register.password1 = action.payload;
    },
    setRegisterPassword2: (state, action: PayloadAction<string>) => {
      state.register.password2 = action.payload;
    },
    clearRegisterDetails: (state) => {
      state.register = initialRegisterState;
    },

    setSigninDetails: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      state.signin.email = action.payload.email;
      state.signin.password = action.payload.password;
    },
    setSigninEmail: (state, action: PayloadAction<string>) => {
      state.signin.email = action.payload;
    },
    setSigninPassword: (state, action: PayloadAction<string>) => {
      state.signin.password = action.payload;
    },
    clearSigninDetails: (state) => {
      state.signin = initialSigninState;
    },

    setSignedUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
      }>
    ) => {
      state.signedUser.name = action.payload.name;
      state.signedUser.email = action.payload.email;
    },
  },
});

export default authSlice.reducer;
export const {
  setRegisterDetails,
  setRegisterEmail,
  setRegisterFirstName,
  setRegisterLastName,
  setRegisterPassword1,
  setRegisterPassword2,
  clearRegisterDetails,
  setSigninDetails,
  setSigninEmail,
  setSigninPassword,
  clearSigninDetails,
  setSignedUser,
} = authSlice.actions;
