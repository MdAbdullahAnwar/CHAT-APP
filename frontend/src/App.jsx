import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Route path="/" exact>
        <div className="App">
          <LandingPage />
        </div>
      </Route>
      <Route path="/auth">
        <div className="App with-bg">
          <HomePage />
        </div>
      </Route>
      <Route path="/chats">
        <div className="App with-bg">
          <ChatPage />
        </div>
      </Route>
    </>
  );
}

export default App;
