import { FC } from "react";
import FormComponent from "../../../components/Form";
import SmallLabelComponent from "../../../components/SmallLabel/SmallLabel.component";
import {
  clearSigninDetails,
  setSigninEmail,
  setSigninPassword,
} from "../../../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/features/store";

const SigninFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.auth.signin.email);
  const passwordValue = useAppSelector((state) => state.auth.signin.password);

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeHolder: "example@balink.net",
      required: true,
      value: emailValue,
      onChange: (e: any) => dispatch(setSigninEmail(e.currentTarget.value)),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      value: passwordValue,
      onChange: (e: any) => dispatch(setSigninPassword(e.currentTarget.value)),
    },
  ];
  const titleLabel = "SignIn to BalinkSeats";

  const submitButtonLabel = "SignIn";
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(clearSigninDetails());
  };

  const registerLinkLabel = "Register";
  const registerLink = "/register";
  // const forgotPasswordLinkLabel = "Reset Password";
  // const forgotPasswordLink = "/forgot-password";

  return (
    <FormComponent
      fields={fields}
      titleLabel={titleLabel}
      submitButtonLabel={submitButtonLabel}
      onSubmitHandler={onSubmitHandler}
    >
      <SmallLabelComponent
        linkLabel={registerLinkLabel}
        link={registerLink}
        isDivider={true}
      >
        Don't have an Account?
      </SmallLabelComponent>
      {/* <SmallLabelComponent
        linkLabel={forgotPasswordLinkLabel}
        link={forgotPasswordLink}
      >
        Forgot Password?
      </SmallLabelComponent> */}
    </FormComponent>
  );
};

export default SigninFormComponent;
