import AuthLayout from "../features/auth/components/AuthLayout";
import SigninFormComponent from "../features/auth/components/SigninForm.component";
import { useEffect } from "react";
import { useAppSelector } from "../store/features/store";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();
  const [isSigned] = useAppSelector((state) => [state.signed.isSigned]);

  useEffect(() => {
    if (isSigned) navigate("/");
  }, [isSigned, navigate]);

  return (
    <AuthLayout>
      <SigninFormComponent />
    </AuthLayout>
  );
}

export default SigninPage;
