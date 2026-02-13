import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ReactNode } from "react";

import LoginPage  from "./pages/login"
import MessagesPage  from "./pages/messages"
import SignupPage from "./pages/signup";




interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const loggedIn = localStorage.getItem("authToken") ;
  return loggedIn ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <MessagesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
