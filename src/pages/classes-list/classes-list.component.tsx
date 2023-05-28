/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

import "./classes-list.styles.css";
import { FirebaseContext, useModal } from "../../utils";
import { ClassBlock } from "../../shared";
import {
  ClassesDataType,
  ClassesFilterType,
  ClassesRequestResponse,
} from "./classes-list.model";
import { ClassesFilterPanel } from "./components";
import { UsersResponseType } from "../admin/admin.model";
import { UserDto } from "../../types";

export const ClassesPage: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [classes, setClasses] = useState<ClassesDataType[]>();
  const [filterObj, setFilterObj] = useState<ClassesFilterType>();
  const [masters, setMasters] = useState<UserDto[]>();
  const [isUpdated, toggleUpdated] = useModal(false);

  useEffect(() => {
    let isCancelled = false;

    firebase
      .classes()
      .once("value", (snapshot) => {
        const responseClasses: ClassesRequestResponse = snapshot.val();
        setClasses(Object.values(responseClasses || {}));
      })
      .then(() => {
        firebase.users().once("value", (snapshot) => {
          const responseMasters: UsersResponseType = snapshot.val();

          setMasters(
            Object.values(responseMasters || {}).map((elem) => ({
              id: elem.userData.uid,
              facultyName: elem.userData.faculty.name,
              ...elem.userData,
            })).filter((user) => user.isAdmin === true)
          );
        });
      });

    return () => {
      isCancelled = true;
    };
  }, [isUpdated]);

  return (
    <div className="classesListWrapper">
      <h1 className="title">Все кружки:</h1>
      <ClassesFilterPanel masters={masters} handleChange={setFilterObj} />
      {classes &&
        Object.values(classes)
          .filter((classObj) => {
            if (filterObj?.master) {
              return (
                classObj.classData.name.includes(filterObj?.name || "") &&
                classObj.classData.masterId === filterObj?.master
              );
            }
            return classObj.classData.name.includes(filterObj?.name || "");
          })
          .map(({ classData, users }) => (
            <ClassBlock
              key={classData.id}
              classData={classData}
              userList={Object.values(users || {})}
            />
          ))}
    </div>
  );
};
