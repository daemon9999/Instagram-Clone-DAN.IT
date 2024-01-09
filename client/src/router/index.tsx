import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "src/components/auth/private-route";
import AuthLayout from "src/pages/auth-layout";
import Login from "src/pages/auth-layout/login";
import Register from "src/pages/auth-layout/register";
import MainLayout from "src/pages/main-layout";
import Favorites from "src/pages/main-layout/favorites";
import Home from "src/pages/main-layout/home";
import Messages from "src/pages/main-layout/messages";

import Profile from "src/pages/main-layout/profile";
import UserProfile from "src/pages/main-layout/user-profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },

      {
        path: "messages",
        element: <Messages />,
      },

      {
        path: "profile",
        element: <Profile/>
      }, {
        path: "/:id",
        element: <UserProfile/>
      }
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/auth/login"} replace={true} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default appRouter;
