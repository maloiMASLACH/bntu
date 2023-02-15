/* eslint-disable function-paren-newline */
import React, { useContext, useEffect, useState } from "react";

import "./user-profile.styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { FirebaseContext, useModal } from "../../utils";
import { UserDto } from "../../types";
import { RouterLinks } from "../../constants";
import { AlertWindow } from "../../shared";
import {
  ClassProfileBlock,
  UpdatePasswordModal,
  UpdateUserModal,
} from "./components";

export const UserProfilePage: React.FC = () => {
  const { id } = useParams();

  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState<UserDto | null>(null);
  const [classes, setClasses] = useState<string[]>();
  const [errorMessage, setError] = useState("");
  const [isLoading, toggleLoading] = useModal(false);
  const [isUpdating, toggleUpdating] = useModal(false);
  const [isUpdatingPassword, toggleUpdatingPassword] = useModal(false);
  const [isUpdated, toggleUpdated] = useModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    firebase
      .user(`${id}`)
      .once("value", (snapshot) => setUser(snapshot.val()))
      .then(() =>
        firebase
          .userClasses(`${id}`)
          .once("value", (snapshot) =>
            setClasses(Object.values(snapshot.val() || {}))
          )
      );
  }, [isUpdated]);

  const handleGoFaculty = () => {
    navigate(`../${RouterLinks.Unit}/${user?.faculty.id}`);
  };

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleLogUot = () => {
    toggleLoading();
    firebase
      .doSignOut()
      .then(() => {
        navigate(RouterLinks.Landing);
      })
      .catch((e) => {
        setError(e.message);
        toggleLoading();
      });
  };

  return (
    <div className="userProfilePage">
      <div className="userProfileWrapper">
        {user && (
          <>
            <div className="avatarWrapper" />
            <div className="shortInfo">
              <div className="paramWrapper">
                <p>Фамилия</p>
                <p>{user.lastName}</p>
              </div>
              <div className="paramWrapper">
                <p>Имя</p>
                <p>{user.firstName}</p>
              </div>
              <div className="paramWrapper">
                <p>Группа</p>
                <p>{user.group}</p>
              </div>
              <div className="paramWrapper">
                <p>Факультет</p>
                <p className="link" onClick={handleGoFaculty}>
                  {user.faculty.name}
                </p>
              </div>
              <div className="paramWrapper">
                <p>Почта</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="profileButtons">
              <Button
                disabled={isLoading}
                color="success"
                variant="contained"
                type="button"
                onClick={toggleUpdating}
              >
                Редактировать
              </Button>
              <Button
                disabled={isLoading}
                variant="outlined"
                type="button"
                onClick={toggleUpdatingPassword}
              >
                Сменить пароль
              </Button>
              <Button
                disabled={isLoading}
                color="error"
                variant="contained"
                type="button"
                onClick={handleLogUot}
              >
                Выйти
              </Button>
            </div>

            {isUpdating && (
              <UpdateUserModal
                userData={user}
                closeHandler={toggleUpdating}
                resultHandler={toggleUpdated}
              />
            )}

            {isUpdatingPassword && (
              <UpdatePasswordModal closeHandler={toggleUpdatingPassword} />
            )}
          </>
        )}
        {!!errorMessage.length && (
          <AlertWindow
            toggleClose={handleClearErrorMessage}
            message={errorMessage}
          />
        )}
      </div>
      {classes && (
        <div className="userProfileWrapper">
          <h2 className="classTitle">Ваши кружки:</h2>
          {classes.map((classId) => (
            <ClassProfileBlock classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
};
