import React from "react";
import { UnitImgProps } from "./short-infomodel";
import "./short-info.styles.css";

export const ShortInfo: React.FC<UnitImgProps> = ({ unitData }) => {
  return (
    <div className="unitShortInfoWrapper">
      <h1>{unitData.name}</h1>
      <h2>{unitData.fullName}</h2>
      <p className="unitInfoDescription">{unitData.description}</p>
    </div>
  );
};
