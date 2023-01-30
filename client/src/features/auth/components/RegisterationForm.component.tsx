import { Typography } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import FormComponent from "../../../components/Form";
import SmallLabelComponent from "../../../components/SmallLabel/SmallLabel.component";
import {
  clearRegisterDetails,
  setRegisterEmail,
  setRegisterFirstName,
  setRegisterLastName,
  setRegisterPassword1,
  setRegisterPassword2,
} from "../../../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/features/store";
import { useRegisterMutation } from "../../api/authApiSlice";
import { NewUser } from "../models/NewUser";

const RegistrationFormComponent: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, results] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.auth.register.email);
  const firstNameValue = useAppSelector(
    (state) => state.auth.register.firstName
  );
  const lastNameValue = useAppSelector((state) => state.auth.register.lastName);
  const password1Value = useAppSelector(
    (state) => state.auth.register.password1
  );
  const password2Value = useAppSelector(
    (state) => state.auth.register.password2
  );

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeHolder: "example@balink.net",
      required: true,
      value: emailValue,
      onChange: (e: any) => dispatch(setRegisterEmail(e.currentTarget.value)),
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      width: "48%",
      value: firstNameValue,
      onChange: (e: any) =>
        dispatch(setRegisterFirstName(e.currentTarget.value)),
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      width: "48%",
      value: lastNameValue,
      onChange: (e: any) =>
        dispatch(setRegisterLastName(e.currentTarget.value)),
    },
    {
      name: "password1",
      label: "New Password",
      type: !showPassword ? "password" : "text",
      required: true,
      value: password1Value,
      onChange: (e: any) =>
        dispatch(setRegisterPassword1(e.currentTarget.value)),
    },
    {
      name: "password2",
      label: "Password Again",
      type: !showPassword ? "password" : "text",
      required: true,
      value: password2Value,
      onChange: (e: any) =>
        dispatch(setRegisterPassword2(e.currentTarget.value)),
    },
  ];
  const titleLabel = "Register to BalinkSeats";

  const submitButtonLabel = "Register";
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.password1.value !== e.currentTarget.password2.value) {
      alert("Passwords do not match");
      return;
    }
    const newUser: NewUser = {
      email: emailValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      password: password1Value,
    };
    register(newUser);

    dispatch(clearRegisterDetails());
  };

  const errorComponent = (
    <SmallLabelComponent
      linkLabel={!showPassword ? "Show Passwords" : "Hide Passwords"}
      link="#"
      onClickLink={() => setShowPassword(!showPassword)}
      labelStyle={{
        color: "red !important",
        fontWeight: "100",
      }}
    >
      Passwords do not match
    </SmallLabelComponent>
  );

  const linkLabel = "Signin";
  const link = "/signin";

  return (
    <FormComponent
      fields={fields}
      titleLabel={titleLabel}
      submitButtonLabel={submitButtonLabel}
      onSubmitHandler={onSubmitHandler}
      showError={password1Value !== password2Value}
      errorComponent={errorComponent}
    >
      <SmallLabelComponent linkLabel={linkLabel} link={link} isDivider={true}>
        Already have an Account?
      </SmallLabelComponent>
    </FormComponent>
  );
};

export default RegistrationFormComponent;
