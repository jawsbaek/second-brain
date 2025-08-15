import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import KeycloakProvider from "./app/providers/KeycloakProvider";
import { router } from "./app/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KeycloakProvider>
      <RouterProvider router={router}/>
    </KeycloakProvider>
  </React.StrictMode>
);
