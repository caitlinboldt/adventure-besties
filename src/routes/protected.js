import Homepage from "pages/Homepage";
import AdventurePage from "pages/AdventurePage";

export const protectedRoutes = [
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/adventure/:id",
    element: <AdventurePage />,
  },
];
