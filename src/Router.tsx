import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";

const Router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      return <div>Loading</div>;
    },
    errorElement: <div>Something Went Wrong</div>,
    children: [
      {
        path: "/",
        lazy: async () => {
          let Home = await import("./pages/home")
          return { Component: Home.default }
        }
      },
      {
        path: "/weather",
        lazy: async () => {
          let Weather = await import("./pages/weather")
          return { Component: Weather.default }
        }
      },
      {
        path: "*",
        loader: () => {
          return redirect("/");
        },
      },
    ],
  },
]);

export default Router;
