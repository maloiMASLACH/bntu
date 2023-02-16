/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import "./class-block.styles.css";
import { useNavigate } from "react-router-dom";
import { CLassBlockProps } from "./class-block.model";

import { RouterLinks } from "../../constants";

export const ClassBlock: React.FC<CLassBlockProps> = ({
  classData,
  userList,
}) => {
  const navigate = useNavigate();

  const handleGoToClass = () => {
    navigate(`../${RouterLinks.Class}/${classData.id}`);
  };

  return (
    <div className="classBlock">
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
              {!!userList?.length && <p>{`Студентов: ${userList?.length}`}</p>}
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
