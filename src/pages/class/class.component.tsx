/* eslint-disable function-paren-newline */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthUserContext } from "../../context";
import { ClassDto } from "../../types";
import { FirebaseContext, useModal } from "../../utils";
import "./class.styles.css";
import {
  ClassMasterBlock,
  ClassRegisterBlock,
  ClassUnRegisterBlock,
  UsersList,
} from "./components";

export const ClassPage: React.FC = () => {
  const { classId } = useParams();

  const firebase = useContext(FirebaseContext);
  const activeUser = useContext(AuthUserContext);

  const [classData, setClassData] = useState<ClassDto>();
  const [classUsers, setClassUsers] = useState<string[]>();

  const [isProcessed, toggleProcessed] = useModal(false);

  useEffect(() => {
    firebase
      .class(classId!)
      .once("value", (snapshot) => setClassData(snapshot.val()))
      .then(() =>
        firebase
          .classUsers(classId!)
          .once("value", (usersResponse) =>
            setClassUsers(Object.values(usersResponse.val() || {}))
          )
      );
  }, [isProcessed]);

  return (
    <div className="classPageWrapper">
      {classData && (
        <>
          <h1 className="classTitle">{classData.name}</h1>
          <div className="classContent">
            <div
              className="classImg"
              style={{
                background: `url(${classData.img}) no-repeat center/100%`,
              }}
            />
            <div className="classInfo">
              <p className="option">
                <p className="title">Описание:</p>
                {classData.description}
              </p>
              <p className="option">
                <p className="title">Организатор:</p>
                <ClassMasterBlock masterId={classData.masterId} />
              </p>
              <p className="option">
                <p className="title">Время:</p>
                {classData.date}
              </p>
              <p className="option">
                <p className="title">Место:</p>
                {classData.place}
              </p>
              <p className="option">
                <p className="title">Количесво учащихся:</p>
                {classUsers?.length}
              </p>
              {classUsers && (
                <div className="buttonsWrapper">
                  {classUsers.includes(activeUser?.userId || "") ? (
                    <ClassUnRegisterBlock
                      toggleSuccess={toggleProcessed}
                      classId={classData.id}
                    />
                  ) : (
                    <ClassRegisterBlock
                      toggleSuccess={toggleProcessed}
                      classId={classData.id}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {classData.masterId === activeUser?.userId && classUsers && (
            <UsersList users={classUsers} />
          )}
        </>
      )}
    </div>
  );
};
