import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationForm";
import LoginForm from "./Components/LoginForm";
import HomeLayout from "./Components/HomeLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Before Login) */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
