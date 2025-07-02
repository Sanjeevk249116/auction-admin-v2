import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContextProvider from "./context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ContextProvider>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ContextProvider>
  </Provider>
);
