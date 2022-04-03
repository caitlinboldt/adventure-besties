import ForgotPassword from "pages/ForgotPassword";
import Login from "pages/Login";
import SignUp from "pages/SignUp";

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
];
