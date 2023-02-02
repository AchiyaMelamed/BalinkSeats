import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import FormWrapper from "../../../components/BoxGridForm/BoxGridForm.component";
import FormComponent from "../../../components/Form";
import LinkComponent from "../../../components/Link/Link.component";
import ModalComponent from "../../../components/Modal/Modal.component";
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
import { useRegisterMutation } from "../../api/apiAuthSlice";
import { NewUser } from "../models/NewUser";

const RegistrationFormComponent: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, results] = useRegisterMutation();
  const [showModal, setShowModal] = useState(false);
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

  const submitButtonLabel = "Sign In";

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1Value === password2Value) {
      const newUser: NewUser = {
        email: emailValue,
        firstName:
          firstNameValue.charAt(0).toUpperCase() + firstNameValue.slice(1),
        lastName:
          lastNameValue.charAt(0).toUpperCase() + lastNameValue.slice(1),
        password: password1Value,
      };
      register(newUser).then((res: any) => {
        if (res.data && !res.data.ERROR) {
          setShowModal(true);
          dispatch(clearRegisterDetails());
        }
      });
    }
  };

  const formErrorComponent = (
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

  const apiErrorLabel: { label: string; link?: string; linkLabel?: string } =
    useMemo(
      () =>
        results?.data?.ERROR
          ? results.data.ERROR === "Employee not found"
            ? {
                label: `Email does not exists. Please contact your HR`,
              }
            : results.data.ERROR === "Email already in use"
            ? {
                label: "This email already has an account",
                link: "/signin",
                linkLabel: "SignIn",
              }
            : results.data.ERROR ===
              "First or/and last name do not match the employee record for this email"
            ? {
                label:
                  "First or/and last name do not match the employee record for this email",
              }
            : { label: "Something went wrong, Please try again" }
          : results.status === "rejected"
          ? { label: "Something went wrong, Please try again" }
          : { label: "" },
      [results.data, results.status]
    );

  const apiErrorComponent = (
    <SmallLabelComponent
      divStyle={{ margin: 0, alignSelf: "center" }}
      labelStyle={{ color: "red !important" }}
      linkLabel={apiErrorLabel?.linkLabel}
      link={apiErrorLabel?.link}
    >
      {apiErrorLabel?.label}
    </SmallLabelComponent>
  );

  const linkLabel = "Signin";
  const link = "/signin";

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <FormWrapper titleLabel={titleLabel}>
        {apiErrorLabel && apiErrorComponent}
        <FormComponent
          fields={fields}
          submitButtonLabel={submitButtonLabel}
          onSubmitHandler={onSubmitHandler}
          showError={password1Value !== password2Value}
          errorComponent={formErrorComponent}
          requestStatus={results.status}
        ></FormComponent>
        <SmallLabelComponent linkLabel={linkLabel} link={link} isDivider={true}>
          Already have an Account?
        </SmallLabelComponent>
      </FormWrapper>

      <ModalComponent
        open={showModal}
        onClose={onClose}
        closeIcon="close"
        title="Registration Success"
      >
        <LinkComponent to="/signin">Sign In</LinkComponent>
      </ModalComponent>
    </div>
  );
};

export default RegistrationFormComponent;
