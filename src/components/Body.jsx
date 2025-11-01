import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import MyList from "./MyList";
import BrowseByLanguages from "./BrowseByLanguages";
import ChangePlan from "./ChangePlan";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <Browse />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-list",
      element: (
        <ProtectedRoute>
          <MyList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/browse-by-languages",
      element: (
        <ProtectedRoute>
          <BrowseByLanguages />
        </ProtectedRoute>
      ),
    },
    {
      path: "/change-plan",
      element: (
        <ProtectedRoute>
          <ChangePlan />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
