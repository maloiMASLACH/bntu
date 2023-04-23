/* eslint-disable operator-linebreak */
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
import { assessableTypes } from "./user-profile.data";

export const UserProfilePage: React.FC = () => {
  const { id } = useParams();

  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState<UserDto | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer>("");
  const [classes, setClasses] = useState<string[]>();
  const [errorMessage, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
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
      ).then(() => firebase.getFile('avatar', `${id}`))
      .then((avatar) => setImage(avatar));
  }, [isUpdated]);

  const handleGoFaculty = () => {
    navigate(`../${RouterLinks.Unit}/${user?.faculty.id}`);
  };

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleClearSuccessMessage = () => {
    setSuccess("");
  };

  const readUrl = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      const formatArray = event.target.value.split(".");
      const extension = `.${formatArray[formatArray.length - 1]}`;

      // eslint-disable-next-line @typescript-eslint/no-shadow
      reader.onload = async (event) => {
        if (
          event.target &&
          event.target.result &&
          typeof event.target.result === "string" &&
          assessableTypes.includes(extension)
        ) {
          await setImage(event.target.result);
        } else {
          setError("Not acceptable type of file ");
        }
      };

      await reader.readAsDataURL(event.target.files[0]);
    }
    return event.target.files && event.target.files[0];
  };

  const inputChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    readUrl(event)
      .then(
        (file) => file && firebase.uploadFile("avatar", file, `${user?.uid}`)
      )
      .then(() => setSuccess("Вы успешно обновили аватар"))
      .catch((error: Error) => setError(error.message));
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
            <div className="avatarWrapper">
              <label>
                <div
                  className="avatar"
                  style={{
                    background: `url(${
                      image || user.avatar
                    }) no-repeat center/100%`,
                  }}
                />

                <input
                  className="imgInput"
                  accept={assessableTypes.join(",")}
                  type="file"
                  onChange={inputChangeHandler}
                />
              </label>
            </div>
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
      {!!classes?.length && (
        <div className="userProfileWrapper">
          <h2 className="classTitle">Ваши кружки:</h2>
          {classes.map((classId) => (
            <ClassProfileBlock classId={classId} />
          ))}
        </div>
      )}
      {!!isSuccess.length && (
        <AlertWindow
          toggleClose={handleClearSuccessMessage}
          message={isSuccess}
        />
      )}
    </div>
  );
};
