export const getErrorMessageFromClerkCode = (code: string) => {
  switch (code) {
    case "form_password_pwned":
      return "Password is too week!";

    default:
      return ""
  }
};
