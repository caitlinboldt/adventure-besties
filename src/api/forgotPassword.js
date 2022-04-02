import { Auth } from "aws-amplify";

export async function forgotPasswordUserCode({ email }) {
  try {
    const response = await Auth.forgotPassword(email);
    return response;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function newPasswordSubmit({ email, code, password }) {
  try {
    const response = await Auth.forgotPasswordSubmit(email, code, password);
    return response;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}
