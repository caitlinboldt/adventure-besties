import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/user/userSlice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
  },
});
