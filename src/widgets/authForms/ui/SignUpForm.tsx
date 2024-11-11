import { type FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { validate, signUp, authMutations } from "@/entities/user";
import { CommonButton, CommonInput, MAIN, localStorageController } from "@/shared";

export function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const checkValidation = () => {
    if (
      !validate.email(email) ||
      !validate.password(password) ||
      !validate.passwordConfirm(password, passwordConfirm)
    ) {
      return false;
    }

    return true;
  };

  const { mutate: onSignUp} = useMutation({
    mutationKey: authMutations.signUp({ email }),
    mutationFn: () => signUp({ email, password }),
    onSuccess: (data) => {
      localStorageController.setItem("authToken", data.token);
      alert('회원가입에 성공했습니다.');
      navigate(MAIN);
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
    gcTime: Infinity,
  });

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignUp();
  }

  return (
  <form onSubmit={handleSignUp}>
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
        placeholder="@와 .을 포함한 8자 이상의 이메일을 입력해주세요."
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
        placeholder="8자 이상의 비밀번호를 입력해주세요."
        autoComplete="new-password"
      />
    </div>
    <div className="mt-3 flex flex-col gap-y-2">
      <p className="font-semibold text-sm">
        비밀번호 확인
      </p>
      <CommonInput
        className="flex-1"
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        type="password"
        height="lg"
        placeholder="비밀번호 확인"
        autoComplete="new-password"
      />
    </div>
    <CommonButton
      className="mt-5"
      type="submit"
      width="full"
      height="lg"
      disabled={!checkValidation()}
    >
      회원가입
    </CommonButton>
  </form>
  )
}