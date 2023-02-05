import React from "react";
import { LandingImg, Units } from "./components";
import "./landing.styles.css";

export const LandingPage: React.FC = () => {
  return (
    <div className="pageWrapper">
      <LandingImg />
      <Units />
    </div>
  );
};
