// importing bootstrap and jquery
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//componete import
import Login from "./component/Login";
import Layout from "./component/Layout";


import Insights from "./Module/Insights";
import GameManagement from "./Module/GameManagement";
import ListPlayers from "./Module/ListPlayers";
import DailyLoginReport from "./Module/DailyLoginReport";
import CreateNewVerosion from "./Module/CreateNewVerosion";
import ListVersion from "./Module/ListVersion";
import BroadcastManagement from "./Module/BroadcastManagement";
import CreateTable from "./Module/CreateTable";
import EditTable from "./Module/EditTable";
import EditPlayer from "./Module/EditPlayer";
import {checkAuthLoader} from './utilities/auth'
import { Provider } from "react-redux";
import store from "./redux/store";
// import EditVersion from "./Module/EditVersion";

const routers = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    loader:checkAuthLoader,
    children: [
      {
        path: '/',
        element: <Insights />
      },
      {
        path: 'game-management',
        element: <GameManagement />
      },
      {
        path: 'game-management/create-Table',
        element: <CreateTable />
      },
      {
        path: 'game-management/edit-Table/:id',
        element: <EditTable />
      },
      {
        path: 'usermanagement/list-player',
        element: <ListPlayers />
      },
      {
        path: 'usermanagement/edit-player/:id',
        element: <EditPlayer />
      },
      {
        path: 'usermanagement/daily-login-report',
        element: <DailyLoginReport />
      },
      {
        path: 'version/create-new-version',
        element: <CreateNewVerosion />
      },
      {
        path: 'version/list-version',
        element: <ListVersion />
      },
      // {
      //   path:'version/edit-version/:id',
      //   element: <EditVersion/>
      // },
      {
        path: 'broadcastmanagement',
        element: <BroadcastManagement />

      }
    ]
  }
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  {/* <React.StrictMode> */}
    
    <RouterProvider router={routers} />
    
  {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
