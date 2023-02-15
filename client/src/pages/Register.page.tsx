import AuthLayout from "../features/auth/components/AuthLayout";
import RegistrationFormComponent from "../features/auth/components/RegisterationForm.component";
import { useEffect } from "react";
import { useAppSelector } from "../store/features/store";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [isSigned] = useAppSelector((state) => [state.signed.isSigned]);

  useEffect(() => {
    if (isSigned) navigate("/");
  }, [isSigned, navigate]);

  return (
    <AuthLayout>
      <RegistrationFormComponent />
    </AuthLayout>
  );
}

export default RegisterPage;
