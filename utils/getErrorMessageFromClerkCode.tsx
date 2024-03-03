export const getErrorMessageFromClerkCode = (code: string) => {
  switch (code) {
    case "form_password_pwned":
      return "Password is too week!";
    case "form_param_nil":
      return "Enter code.";
    case "verification_expired":
      return "This code has been expired";
    case "session_exists":
      return "You are already logged in";

    default:
      return ""
  }
};
