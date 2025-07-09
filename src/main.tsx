import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Import from new store location
import { store } from "./store/index";
import ErrorBoundary from "./components/ui/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
