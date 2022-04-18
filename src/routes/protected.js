import Homepage from "pages/Homepage";
import AdventurePage from "pages/AdventurePage";
import ProfilePage from "pages/ProfilePage";

export const protectedRoutes = [
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/adventure/:id",
    element: <AdventurePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
