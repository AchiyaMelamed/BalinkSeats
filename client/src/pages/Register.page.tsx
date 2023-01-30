import AuthLayout from "../features/auth/components/AuthLayout";
import RegistrationFormComponent from "../features/auth/components/RegisterationForm.component";

function RegisterPage() {
  return (
    <AuthLayout>
      <RegistrationFormComponent />
    </AuthLayout>
  );
}

export default RegisterPage;
