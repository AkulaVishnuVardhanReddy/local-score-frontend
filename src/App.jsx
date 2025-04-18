import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./Components/Authentication/RegistrationForm";
import LoginForm from "./Components/Authentication/LoginForm";
import HomeLayout from "./Components/Layouts/HomeLayout";
import OtpVerification from "./Components/Authentication/OtpVerification";
import HeroSection from "./Components/HeroSection";
import PageNotFound from "./Components/PageNotFound";
import Matches from "./Components/Feautures/Matches";
import UpdateScore from "./Components/Feautures/UpdateScore";
import CreateTeam from "./Components/Feautures/CreateTeam";
import CreateMatch from "./Components/Feautures/CreateMatch";
import ViewCreatedMatches from "./Components/Feautures/ViewCreatedMatches";
import CreateTournament from "./Components/Feautures/CreateTournament";

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
          <Route path="matches" element={<Matches />} />
          <Route path="score-update" element={<UpdateScore />} />
          <Route path="create-team" element={<CreateTeam />} />
          <Route path="create-match" element={<CreateMatch />} />
          <Route path="view-created-matches" element={<ViewCreatedMatches />} />
          <Route path="create-tournament" element={<CreateTournament />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
