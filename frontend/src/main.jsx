import ChatProvider from "./Context/ChatProvider";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider value={defaultSystem}>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
