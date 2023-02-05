import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../../components/BoxGridForm/BoxGridForm.component";
import FormComponent from "../../../components/Form";
import SmallLabelComponent from "../../../components/SmallLabel/SmallLabel.component";
import {
  clearSigninDetails,
  setSignedUser,
  setSigninEmail,
  setSigninPassword,
} from "../../../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/features/store";
import { useSigninMutation } from "../../api/apiAuthSlice";
import { UserSignin } from "../models/UserSignin";

const SigninFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signin, results] = useSigninMutation();
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

  const submitButtonLabel = "Sign In";
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const userSignin: UserSignin = {
      email: emailValue,
      password: passwordValue,
    };
    signin(userSignin).then((res: any) => {
      if (res.data && !res.data.ERROR) {
        dispatch(setSignedUser({ ...res.data }));
        dispatch(clearSigninDetails());
        navigate("/");
      }
    });
  };

  const apiErrorLabel: { label: string; link?: string; linkLabel?: string } =
    useMemo(
      () =>
        results?.data?.ERROR
          ? {
              label: `❌ Email or Password is incorrect`,

              link: "/register",
              linkLabel: "Register",
            }
          : results.status === "rejected"
          ? { label: "❌ Something went wrong, Please try again" }
          : { label: "" },
      [results.data, results.status]
    );

  const apiErrorComponent = (
    <SmallLabelComponent
      errorText={true}
      linkLabel={apiErrorLabel?.linkLabel}
      link={apiErrorLabel?.link}
    >
      {apiErrorLabel?.label}
    </SmallLabelComponent>
  );

  const registerLinkLabel = "Register";
  const registerLink = "/register";
  // const forgotPasswordLinkLabel = "Reset Password";
  // const forgotPasswordLink = "/forgot-password";

  return (
    <FormWrapper titleLabel={titleLabel}>
      {apiErrorLabel && apiErrorComponent}
      <FormComponent
        fields={fields}
        titleLabel={titleLabel}
        submitButtonLabel={submitButtonLabel}
        onSubmitHandler={onSubmitHandler}
        requestStatus={results.status}
      ></FormComponent>
      {/* <SmallLabelComponent
        linkLabel={forgotPasswordLinkLabel}
        link={forgotPasswordLink}
      >
        Forgot Password?
      </SmallLabelComponent> */}
      <SmallLabelComponent
        linkLabel={registerLinkLabel}
        link={registerLink}
        isDivider={true}
      >
        Don't have an Account?
      </SmallLabelComponent>
    </FormWrapper>
  );
};

export default SigninFormComponent;
