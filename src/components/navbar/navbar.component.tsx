import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../constants";
import { AlertWindow } from "../../shared";
import { FirebaseContext, useModal } from "../../utils";
import { NavBarProps } from "./navbar.model";
import "./navbar.styles.css";

export const NavBar: React.FC<NavBarProps> = ({ isAdmin, userId }) => {
  const navigate = useNavigate();
  const [errorMessage, setError] = useState("");
  const [isProcessing, toggleProcessing] = useModal(false);

  const firebase = useContext(FirebaseContext);

  const handleGoHome = async () => {
    // navigate("../");
    console.log(await firebase.getFile());
  };

  const handleGoSignIn = () => {
    navigate(`../${RouterLinks.SingIn}`);
  };

  const handleGoProfile = () => {
    navigate(`../${RouterLinks.User}/${userId}`);
  };

  const handleGoAdmin = () => {
    navigate(`../${RouterLinks.Admin}`);
  };

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleLogUot = () => {
    toggleProcessing();
    firebase
      .doSignOut()
      .then(() => {
        navigate(RouterLinks.Landing);
      })
      .catch((e) => {
        setError(e.message);
        toggleProcessing();
      });
  };

  return (
    <div className="navbar navBarWrapper">
      <div className="navbar logo">
        <img
          className="logoImg"
          src="../../logo.png"
          alt="logo"
          onClick={handleGoHome}
        />
      </div>
      {userId?.length ? (
        isAdmin ? (
          <div className="navRightButtonsWrapper">
            <p onClick={handleGoAdmin}>Админстратор</p>
            <p onClick={handleGoProfile}>Аккаунт</p>
            <p
              onClick={handleLogUot}
              className={isProcessing ? "navbarLoading" : ""}
            >
              Выйти
            </p>
          </div>
        ) : (
          <div className="navRightButtonsWrapper">
            <p onClick={handleGoProfile}>Аккаунт</p>
            <p
              onClick={handleLogUot}
              className={isProcessing ? "navbarLoading" : ""}
            >
              Выйти
            </p>
          </div>
        )
      ) : (
        typeof userId === "string" && <p onClick={handleGoSignIn}>Войти</p>
      )}

      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}
    </div>
  );
};
