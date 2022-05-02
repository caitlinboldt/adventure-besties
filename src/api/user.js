import axios from "axios";

export async function editUser({ data, userId }) {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}
