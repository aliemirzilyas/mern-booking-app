import { RegisterFormData, SignInFormData } from "./lib/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (registerFormData: RegisterFormData) => {
  const request = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerFormData),
  });
  const response = await request.json();
  if (!request.ok) throw new Error(response.message);

  return response;
};

export const signIn = async (signInFormData: SignInFormData) => {
  const request = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signInFormData),
  });
  const response = await request.json();
  if (!request.ok) throw new Error(response.message);

  return response;
};

export const signOut = async () => {
  const request = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!request.ok) throw new Error("Something went wrong!");
};

export const validateToken = async () => {
  const request = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  const response = await request.json();
  if (!request.ok) throw new Error("Invalid token!");

  return response;
};
