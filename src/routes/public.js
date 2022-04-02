import ForgotPassword from "pages/ForgotPassword";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Logout from "pages/Logout";
import SignUp from "pages/SignUp";

export const publicRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
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
  {
    path: "/logout",
    element: <Logout />,
  },
];
