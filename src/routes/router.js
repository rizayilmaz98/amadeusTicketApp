import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TicketPage from "../pages/TicketPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":info",
        element: <TicketPage />,
      },
    ],
  },
  {
    path: "/ticket",
    element: <TicketPage />,
  },
]);

export default router;
