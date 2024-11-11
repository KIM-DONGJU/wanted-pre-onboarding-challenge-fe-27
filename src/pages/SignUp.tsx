import { SignUpForm } from "@/widgets/authForms";
import { CommonPageWrapper } from "@/shared";

export function SignUp() {
  return (
    <CommonPageWrapper>
      <h1 className="text-2xl font-bold">회원가입</h1>
      <SignUpForm />
    </CommonPageWrapper>
  )
}