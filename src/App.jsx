import React from "react";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>
        <Body />
      </Provider>
    </div>
  );
};

export default App;
