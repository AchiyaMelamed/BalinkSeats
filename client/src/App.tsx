import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { theme } from "./shared/utils/theme";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SigninPage from "./pages/Signin.page";
import HeaderComponent from "./components/Header/Header.component";
import FooterComponent from "./components/Footer/Footer.component";
import { useAppDispatch, useAppSelector } from "./store/features/store";
import { logoutUser } from "./store/features/signedUserSlice";

function App() {
  const dispatch = useAppDispatch();

  const isSigned = useAppSelector((state) => state.signed.isSigned);
  const pages = [
    { path: "/", name: "Home", element: <HomePage />, display: true },
    {
      path: "/register",
      name: "Register",
      element: <RegisterPage />,
      display: !isSigned,
    },
    {
      path: "/signin",
      name: "Signin",
      element: <SigninPage />,
      display: !isSigned,
    },
    {
      path: "/profile",
      name: "Profile",
      element: <div>Profile</div>,
      display: isSigned,
    },
  ];

  const actions = [
    {
      name: "logout",
      onClick: () => {
        dispatch(logoutUser());
      },
      navigateTo: 0,
      display: isSigned,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HeaderComponent pages={pages} actions={actions} />
        <Routes>
          {pages.map((page) => (
            <Route path={page.path} element={page.element} key={page.path} />
          ))}
        </Routes>
        <FooterComponent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
