/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../constants";
import { ClassDto, UnitDto, UserDto } from "../../types";
import { FirebaseContext, useModal } from "../../utils";
import {
  AdminPageProps,
  ClassesResponseType,
  UnitsResponseType,
  UsersResponseType,
} from "./admin.model";
import "./admin.styles.css";
import {
  ClassesList,
  CreateNewClass,
  UnitsList,
  UsersList,
} from "./components";

export const AdminPage: React.FC<AdminPageProps> = ({ isAdmin }) => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const handleGoHome = () => {
    navigate(`..${RouterLinks.Landing}`);
  };

  if (!isAdmin) {
    handleGoHome();
  }

  const [units, setUnits] = useState<UnitDto[]>();
  const [users, setUsers] = useState<UserDto[]>();
  const [classes, setClasses] = useState<ClassDto[]>();
  const [isChanged, toggleChanged] = useModal(false);

  useEffect(() => {
    let isCancelled = false;
    firebase.units().once("value", (snapshot) => {
      const response: UnitsResponseType = snapshot.val();

      setUnits(
        Object.values(response || {}).map((elem) => ({
          ...elem,
        }))
      );
    });

    firebase.users().once("value", (snapshot) => {
      const response: UsersResponseType = snapshot.val();

      setUsers(
        Object.values(response || {}).map((elem) => ({
          id: elem.userData.uid,
          facultyName: elem.userData.faculty.name,
          ...elem.userData,
        }))
      );
    });

    firebase.classes().once("value", (snapshot) => {
      const response: ClassesResponseType = snapshot.val();

      setClasses(
        Object.values(response || {}).map((elem) => ({
          ...elem.classData,
        }))
      );
    });

    return () => {
      isCancelled = true;
    };
  }, [isChanged]);

  return (
    <div className="pageWrapper">
      {isAdmin && (
        <>
          {users && <UsersList users={users} />}
          {units && <UnitsList units={units} />}
          {classes && <ClassesList classes={classes} />}

          {users && units && (
            <CreateNewClass
              users={users}
              units={units}
              handleChange={toggleChanged}
            />
          )}
        </>
      )}
    </div>
  );
};
