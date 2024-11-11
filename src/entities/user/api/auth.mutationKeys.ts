import type { AuthCredentials } from "../types/authType";

export const authMutations = {
  signUp: ({
    email,
  }: Pick<AuthCredentials, "email">) => ['users/create', {
    email,
  }],
  signIn: ({
    email,
  }: Pick<AuthCredentials, "email">) => ['users/login', {
    email,
  }]
}