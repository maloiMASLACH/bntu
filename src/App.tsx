import React, {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter, Routes, Route, useLocation
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./components";

import { LocalStorageKeys, RouterLinks } from "./constants";
import themes from "./constants/themes";
import { ActiveUserType, AuthUserContext } from "./context";
import {
  AdminPage,
  ClassesPage,
  ClassPage,
  LandingPage,
  SignInPage,
  SignUpPage,
  UnitPage,
  UserProfilePage,
} from "./pages";
import { FirebaseContext, fetchURLInfo } from "./utils";

export const ScrollToTop: React.FC = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
});

const App = () => {
  const firebase = useContext(FirebaseContext);

  const [theme, setTheme] = useState(
    localStorage.getItem(LocalStorageKeys.Theme) || themes[0]
  );

  const [user, setUser] = useState<ActiveUserType | null>(null);

  const handleTheme = (option: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(LocalStorageKeys.Theme, option.target.value);

    setTheme(option.target.value);
  };

  useEffect(() => {
    fetchURLInfo(setUser, firebase);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthUserContext.Provider value={user}>
        <NavBar userId={user?.userId} isAdmin={!!user?.isAdmin} />
        <Routes>
          <Route element={<LandingPage />} path={RouterLinks.Landing} />
          <Route element={<SignInPage />} path={RouterLinks.SingIn} />
          <Route element={<SignUpPage />} path={RouterLinks.SingUp} />
          <Route element={<ClassesPage />} path={RouterLinks.Classes} />
          <Route
            element={<AdminPage isAdmin={!!user?.isAdmin} />}
            path={RouterLinks.Admin}
          />
          <Route element={<UnitPage />} path={`${RouterLinks.Unit}/:unit`} />
          <Route
            element={<UserProfilePage />}
            path={`${RouterLinks.User}/:id`}
          />
          <Route
            element={<ClassPage />}
            path={`${RouterLinks.Class}/:classId`}
          />
        </Routes>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
