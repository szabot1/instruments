import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom";
import InstrumentListPage from "./instrument-list";
import InstrumentSinglePage from "./instrument-single";
import InstrumentCreatePage from "./instrument-create";
import InstrumentModifyPage from "./instrument-modify";
import InstrumentDeletePage from "./instrument-delete";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <InstrumentListPage />,
      },
      {
        path: "/hangszer/:id",
        element: <InstrumentSinglePage />,
      },
      {
        path: "/hangszer/:id/modositas",
        element: <InstrumentModifyPage />,
      },
      {
        path: "/hangszer/:id/torles",
        element: <InstrumentDeletePage />,
      },
      {
        path: "/uj-hangszer",
        element: <InstrumentCreatePage />,
      },
    ],
  },
]);

function AppLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Hangszerek
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/uj-hangszer"
                className="nav-link"
                activeClassName="active"
              >
                Új hangszer
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
