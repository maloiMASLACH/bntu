/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../constants";
import { ClassDto, PlaceDto, UnitDto, UserDto } from "../../types";
import { FirebaseContext, useModal } from "../../utils";
import {
  AdminPageProps,
  ClassesResponseType,
  PlaceResponseType,
  UnitsResponseType,
  UsersResponseType,
} from "./admin.model";
import "./admin.styles.css";
import {
  ClassesList,
  CreateNewClass,
  CreateNewPlace,
  PlacesList,
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
  const [places, setPlaces] = useState<PlaceDto[]>();
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

    firebase.places().once("value", (snapshot) => {
      const response: PlaceResponseType = snapshot.val();

      setPlaces(Object.values(response || {}));
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

          {places && <PlacesList places={places} />}
          <CreateNewPlace handleChange={toggleChanged} />

          {users && units && places && classes && (
            <ClassesList
              classes={classes}
              users={users}
              units={units}
              handleChange={toggleChanged}
              places={places}
            />
          )}

          {users && units && places && (
            <CreateNewClass
              users={users}
              units={units}
              places={places}
              handleChange={toggleChanged}
            />
          )}
        </>
      )}
    </div>
  );
};
