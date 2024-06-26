import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signin/Signup";
import UserProfile from "./components/User/UserProfile";
import SignIn from "./components/signin/signin";
import Dashboard from "./routes/Dashboard";
import Dashboard2 from "./routes/Dashboard2";
import RootNav from "./components/homeNav";
import ProtectedRoute from "./components/protectedRoute";
import Crypto from "./components/crypto";
function App() {
  return (
    <div>
      <BrowserRouter>
        <RootNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard2 />} />
          <Route path="/das" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/crypto" element={<Crypto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
