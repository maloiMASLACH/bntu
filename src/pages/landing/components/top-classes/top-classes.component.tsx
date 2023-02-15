/* eslint-disable object-curly-newline */
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../constants";
import { ClassDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import { ClassesResponseType } from "./top-classes.model";
import "./top-classes.styles.css";

export const TopClasses: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [classes, setClasses] = useState<ClassDto[]>([]);

  const handleGoToClass = (id: string) => {
    navigate(`../${RouterLinks.Class}/${id}`);
  };

  useEffect(() => {
    firebase.classes().once("value", (snapshot) => {
      const response: ClassesResponseType = snapshot.val();

      setClasses(
        Object.values(response || {})
          .slice(0, 3)
          .map((elem) => ({
            ...elem.classData,
          }))
      );
    });
  }, []);

  return (
    <div className="topClassesWrapper">
      <h1 className="title">Кружки</h1>
      <div className="listWrapper">
        {classes.map(({ id, name, img, date, place }) => (
          <div key={id} className="blockWrapper">
            <div
              className="classImg"
              style={{ background: `url(${img}) no-repeat center/100%` }}
            />
            <div className="shortInfo">
              <p className="">{name}</p>
              <div className="addedInfo">
                <p>{`Время: ${date}`}</p>
                <p>{`Место: ${place}`}</p>
                <p className="link" onClick={() => handleGoToClass(id)}>
                  Узнать больше
                  {" "}
                  <i className="fa fa-arrow-right" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
        ))}
        <Button variant="contained" color="success">
          Показать все
        </Button>
      </div>
    </div>
  );
};
