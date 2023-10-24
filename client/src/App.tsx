import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signin/Signup";
import UserProfile from "./components/User/UserProfile";
import SignIn from "./components/signin/signin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
