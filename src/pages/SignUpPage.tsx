import { useNavigate } from "react-router-dom";
import type { FormEventHandler } from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/authApi";

const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");

    const result = await registerUser(email, password);
    const prefix = result.ok ? "" : "Error: ";

    alert(prefix + result.message);

    if (result.ok) {
      navigate("/");
    }
  };

  return <AuthForm onSubmit={handleSubmit} isLogin={false} />;
};

export default SignUpPage;