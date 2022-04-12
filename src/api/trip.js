import axios from "axios";

export async function addATrip({
  title,
  description,
  startDate,
  endDate,
  userId,
  image,
}) {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("user", userId);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/trip`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function getTripGallery({ userId }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/user/${userId}/trips`
    );
    return response.data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}

export async function getTrip({ tripId }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/trip/${tripId}`
    );
    return response.data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
}
