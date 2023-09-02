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
import Error from './Pages/Error';

const formatDate = (type, dateString) => {
  const date = new Date(dateString);
  
  const day = date.toLocaleString('default', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return type === 'long' ? 
  `${day.charAt(0).toUpperCase() + day.slice(1)} ${dayOfMonth} ${month.charAt(0).toUpperCase() + month.slice(1)} - ${hours}:${minutes}`
  : type === 'short' && 
  <><small className="p-1">{dayOfMonth} {month.charAt(0).toUpperCase()}{month.slice(1)}</small><small className="p-1">{hours}:{minutes}</small></>
}

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App formatDate={formatDate} />
  },
  {
    path: "/allgames",
    element: <AllGames formatDate={formatDate} />
  },
  {
    path: "/*",
    element: <Error />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);