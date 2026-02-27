import { Navigate } from "react-router-dom";
import type { FormEventHandler } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const SignInPage = (): JSX.Element => {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");

    const result = await login(email, password);
    const prefix = result.ok ? "" : "Error: ";

    alert(prefix + result.message);
  };

  return <AuthForm onSubmit={handleSubmit} isLogin={true} />;
};

export default SignInPage;