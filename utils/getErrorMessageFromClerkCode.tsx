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
    case "form_identifier_not_found":
      return "Couldn't find you account.";
    case "form_password_incorrect":
      return "Password is incorrect, Please try again.";
    case "client_state_invalid":
      return "Invalid action, Please try again.";

    default:
      return "";
  }
};
