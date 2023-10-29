import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signin/Signup";
import UserProfile from "./components/User/UserProfile";
import SignIn from "./components/signin/signin";
import Dashboard from "./routes/Dashboard";
import Dashboard2 from "./routes/Dashboard2";
import RootNav from "./components/partials/homeNav";
function App() {
  return (
    <div>
      <BrowserRouter>
        <RootNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/charts" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
