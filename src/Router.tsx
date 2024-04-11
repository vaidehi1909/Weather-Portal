import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Weather from "./pages/weather";

const Router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      return <div>Loading</div>;
    },
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/weather",
        element: <Weather />,
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
