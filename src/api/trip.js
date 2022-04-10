import axios from "axios";

export async function addATrip({
  title,
  description,
  startDate,
  endDate,
  userId,
}) {
  const trip = {
    title,
    description,
    start_date: startDate,
    end_date: endDate,
    users: [userId],
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/trip`,
      trip
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
