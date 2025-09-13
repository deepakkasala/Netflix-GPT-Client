// // PublicRoute.jsx
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const user = useSelector((state) => state.user);
//   const token = localStorage.getItem("token");

//   if (user && token) {
//     // already logged in -> redirect to browse
//     return <Navigate to="/browse" replace />;
//   }

//   return children;
// };

// export default PublicRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // If already logged in → block access to `/` and send them to `/browse`
  if (user) {
    return <Navigate to="/browse" replace />;
  }

  return children;
};

export default PublicRoute;
