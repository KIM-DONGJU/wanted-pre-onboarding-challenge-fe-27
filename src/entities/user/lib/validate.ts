export const validate = {
  email: (email: string) => {
    // 8글자 이상, @,. 포함되어야 함
    const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return emailReg.test(email);
  },
  password: (password: string) => {
    // 8글자 이상
    const passwordReg = /^.{8,}$/;
    return passwordReg.test(password);
  },
  passwordConfirm: (password: string, passwordConfirm: string) => {
    return password === passwordConfirm;
  }
}