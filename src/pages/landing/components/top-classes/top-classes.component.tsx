/* eslint-disable object-curly-newline */
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../constants";
import { ClassBlock } from "../../../../shared";
import { ClassDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import { ClassesResponseType } from "./top-classes.model";
import "./top-classes.styles.css";

export const TopClasses: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [classes, setClasses] = useState<ClassDto[]>([]);

  const handleGoToClassesList = () => {
    navigate(`../${RouterLinks.Classes}`);
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
        {classes.map((classData) => (
          <ClassBlock key={classData.id} classData={classData} />
        ))}
        <Button
          onClick={handleGoToClassesList}
          variant="contained"
          color="success"
        >
          Показать все
        </Button>
      </div>
    </div>
  );
};
