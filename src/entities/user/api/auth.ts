import { axiosInstance } from "@/shared/lib/axiosInstance";

import type { AuthCredentials, AuthResponse } from "../types/authType";

export const signUp = async ({
  email,
  password
}: AuthCredentials) => {
  const { data } = await axiosInstance.post<AuthResponse>('/users/create', {
    email,
    password
  });

  return data;
}

export const signIn = async ({
  email,
  password
}: AuthCredentials) => {
  const { data } = await axiosInstance.post<AuthResponse>('/users/login', {
    email,
    password,
  });

  return data;
};