import React from "react";
import { UnitImgProps } from "./unit-img.model";
import "./unit-img.styles.css";

export const UnitImg: React.FC<UnitImgProps> = ({ src }) => {
  return (
    <div
      className="unitImgWrapper"
      style={{ background: `url(${src}) no-repeat center/100%` }}
    />
  );
};
