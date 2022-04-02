import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import Landing from "pages/Landing";
import Logout from "pages/Logout";
import { isEmpty } from "lodash";

export const AppRoutes = () => {
  const user = useSelector((state) => state.userInfo.user);

  const commonRoutes = [
    { path: "/", element: <Landing /> },
    { path: "/logout", element: <Logout /> },
  ];
  const routes = isEmpty(user) ? publicRoutes : protectedRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
