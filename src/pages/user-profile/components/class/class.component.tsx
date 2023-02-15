/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useState } from "react";
import "./class.styles.css";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../../../utils";
import { ClassProfileProps } from "./class.model";
import { ClassDto } from "../../../../types";
import { RouterLinks } from "../../../../constants";

export const ClassProfileBlock: React.FC<ClassProfileProps> = ({ classId }) => {
  const firebase = useContext(FirebaseContext);

  const navigate = useNavigate();

  const [classData, setClassData] = useState<ClassDto>();

  const handleGoToClass = () => {
    navigate(`../${RouterLinks.Class}/${classId}`);
  };

  useEffect(() => {
    firebase
      .class(classId!)
      .once("value", (snapshot) => setClassData(snapshot.val()));
  }, []);

  return (
    <div className="profileClass">
      {classData && (
        <div className="blockWrapper">
          <div
            className="classImg"
            style={{
              background: classData.img
                ? `url(${classData.img}) no-repeat center/100%`
                : "grey",
            }}
          />
          <div className="shortInfo">
            <p className="">{classData.name}</p>
            <div className="addedInfo">
              <p>{`Время: ${classData.date}`}</p>
              <p>{`Место: ${classData.place}`}</p>
              <p className="link" onClick={handleGoToClass}>
                Узнать больше
                {" "}
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
