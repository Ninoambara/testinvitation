import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import LoginPage from "./views/LoginPage";
import Home from "./views/Home";
import { Provider } from "react-redux";
import store from "./stores";
import Navbar from "./components/Navbar";
import RegisterPage from "./views/RegisterPage";
import DetailPage from "./views/DetailPage";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      loader: () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw redirect("/login");
        }

        return null;
      },
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/detail/:id",
          element: <DetailPage />,
        },
      ],
    },
    {
      path: "/Login",
      element: <LoginPage />,
      loader: () => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          throw redirect("/");
        }

        return null;
      },
    },
    {
      path: "/register",
      element: <RegisterPage />,
      loader: () => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          throw redirect("/");
        }

        return null;
      },
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
