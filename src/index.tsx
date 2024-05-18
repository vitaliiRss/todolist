import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { store } from "./store/store";
import { App } from "./App";
import { Login } from "./features/Login/Login";
import { ErrorPage } from "./features/ErrorPage/ErrorPage";
import { Todolists } from "./features/Todolists/Todolists";



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Navigate to="/404" />,
      children: [
        {
          index: true,
          element: <Navigate to="/todolists" />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/todolists",
          element: <Todolists />,
        },
      ],
    },
    {
      path: "/404",
      element: <ErrorPage />,
    }
  ]
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);