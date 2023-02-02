import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { theme } from "./shared/utils/theme";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SigninPage from "./pages/Signin.page";
import ThreePage from "./pages/Three.page";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/three" element={<ThreePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
