import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Style/App.scss';
import App from './App';
import AllGames from './Pages/AllGames';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/allgames",
    element: <AllGames />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);