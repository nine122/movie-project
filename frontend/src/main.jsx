import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import "./index.css";
import Movies from "./pages/Movies";
import AddMovies from "./pages/AddMovies";
import MovieDetail from "./pages/MovieDetail";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/movies/edit",
        element: <Edit />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetail />,
      },
      {
        path: "/addmovies",
        element: <AddMovies />,
      },

      {
        path: "/editmovies/:id",
        element: <AddMovies />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
