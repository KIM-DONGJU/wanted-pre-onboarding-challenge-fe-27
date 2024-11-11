import { SignInForm } from "@/widgets/authForms";
import { CommonPageWrapper } from "@/shared";

export function SignIn() {
  return (
    <CommonPageWrapper>
      <h1 className="text-2xl font-bold">로그인</h1>
      <SignInForm />
    </CommonPageWrapper>
  )
}