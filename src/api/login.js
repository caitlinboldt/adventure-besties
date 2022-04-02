import { Auth } from "aws-amplify";
import axios from "axios";

export async function cognitoLogin({ email, password }) {
  // Login the user with Cognito.
  try {
    const { attributes } = await Auth.signIn({
      username: email,
      password,
    });
    return attributes;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function mainLogin(cognitoUser) {
  // Create the user and login.
  const user = {
    email: cognitoUser.email,
    cognito_id: cognitoUser.sub,
    name: cognitoUser.name,
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/user`,
      user
    );
    return response.data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}
