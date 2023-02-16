/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

import "./classes-list.styles.css";
import { FirebaseContext, useModal } from "../../utils";
import { ClassBlock } from "../../shared";
import {
  ClassesFilterType,
  ClassesRequestResponse,
} from "./classes-list.model";
import { ClassesFilterPanel } from "./components";

export const ClassesPage: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [classes, setClasses] = useState<ClassesRequestResponse>();
  const [filterObj, setFilterObj] = useState<ClassesFilterType>();
  const [isUpdated, toggleUpdated] = useModal(false);

  useEffect(() => {
    firebase.classes().once("value", (snapshot) => setClasses(snapshot.val()));
  }, [isUpdated]);

  return (
    <div className="classesListWrapper">
      <h1 className="title">Все кружки:</h1>
      <ClassesFilterPanel handleChange={setFilterObj} />
      {classes
        && Object.values(classes)
          .filter((classObj) => {
            if (filterObj?.master) {
              return (
                classObj.classData.name.includes(filterObj?.name || "")
                && classObj.classData.masterId === filterObj?.master
              );
            }
            return classObj.classData.name.includes(filterObj?.name || "");
          })
          .map(({ classData, users }) => (
            <ClassBlock
              key={classData.id}
              classData={classData}
              userList={Object.values(users)}
            />
          ))}
    </div>
  );
};
