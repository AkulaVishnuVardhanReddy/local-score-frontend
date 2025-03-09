import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./Components/Authentication/RegistrationForm";
import LoginForm from "./Components/Authentication/LoginForm";
import HomeLayout from "./Components/Layouts/HomeLayout";
import OtpVerification from "./Components/Authentication/OtpVerification";
import HeroSection from "./Components/HeroSection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Before Login) */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HeroSection/>} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="verify-email" element={<OtpVerification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
