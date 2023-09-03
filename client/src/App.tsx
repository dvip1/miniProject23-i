import Home from "./routes/Home";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signin/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
