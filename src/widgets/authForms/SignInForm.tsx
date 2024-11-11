import { type FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { validate, signIn, authMutations } from "@/entities/user";
import {
  CommonButton,
  CommonInput,
  MAIN,
  SIGN_UP,
  localStorageController
} from "@/shared";

export function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkValidation = () => {
    if (
      !validate.email(email) ||
      !validate.password(password)
    ) {
      return false;
    }

    return true;
  };

  const { mutate: onSignIn} = useMutation({
    mutationKey: authMutations.signIn({ email }),
    mutationFn: () => signIn({ email, password }),
    onSuccess: (data) => {
      localStorageController.setItem("authToken", data.token);
      alert('로그인 하였습니다.');
      navigate(MAIN);
    },
    onError: () => {
      alert('계정을 확인해주세요.');
    },
    gcTime: Infinity,
  });

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignIn();
  }

  const moveSignUp = () => {
    navigate(SIGN_UP);
  }

  return (
  <form onSubmit={handleSignIn}>
    <div className="mt-5 flex flex-col gap-y-2">
      <p className="font-semibold text-sm">
        이메일
      </p>
      <CommonInput
        className="flex-1"
        value={email}
        onChange={setEmail}
        type="email"
        height="lg"
        autoComplete="email"
      />
    </div>
    <div className="mt-3 flex flex-col gap-y-2">
      <p className="font-semibold text-sm">
        비밀번호
      </p>
      <CommonInput
        className="flex-1"
        value={password}
        onChange={setPassword}
        type="password"
        height="lg"
        autoComplete="new-password"
      />
    </div>
    <div className="mt-5 flex items-center gap-x-3">
      <CommonButton
        type="submit"
        width="full"
        height="lg"
        disabled={!checkValidation()}
      >
        로그인
      </CommonButton>
      <CommonButton
        width="full"
        height="lg"
        variant="secondary"
        onClick={moveSignUp}
      >
        회원가입
      </CommonButton>
    </div>
  </form>
  )
}