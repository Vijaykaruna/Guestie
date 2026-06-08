import { useState } from "react";
import { authController } from "../controller/auth.controller.js";
import { useToast } from "../service/ToastProvider.jsx";

export const useSignUp = () => {
  const { triggerToast } = useToast();

  const { signup } = authController({ triggerToast });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formFields = [
    {
      id: "floatingName",
      label: "Username",
      type: "text",
      placeholder: "Enter the Username",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: "floatingEmail",
      label: "Email",
      type: "email",
      placeholder: "Enter the Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "floatingPassword",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  return {
    formFields,
    handleSignup,
  };
};

export const useLogIn = () => {
  const { triggerToast } = useToast();

  const { login } = authController({ triggerToast });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formFields = [
    {
      id: "floatingEmail",
      label: "Email",
      type: "email",
      placeholder: "Enter the Email...",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "floatingPassword",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password...",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return {
    formFields,
    handleLogin,
  };
};
