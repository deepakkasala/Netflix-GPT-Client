// // ProtectedRoute.jsx
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.user);
//   const token = localStorage.getItem("token");

//   if (!user || !token) {
//     // not logged in -> redirect to login
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  // Check if user is logged in properly
  const isLoggedIn = user && user._id && token;

  if (!isLoggedIn) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
