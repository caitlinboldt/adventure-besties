import { Auth } from "aws-amplify";

export async function signUpUser({ email, password, name }) {
  try {
    const response = await Auth.signUp({
      username: email,
      password,
      attributes: { email, name },
    });
    return response;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function confirmUserSignUp({ email, code }) {
  try {
    const response = await Auth.confirmSignUp(email, code);
    return response;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function resendUserCode({ email }) {
  try {
    const response = await Auth.resendSignUp(email);
    return response;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}
