import React from "react";
import { LandingImg, TopClasses, Units } from "./components";
import "./landing.styles.css";

export const LandingPage: React.FC = () => {
  return (
    <div className="pageWrapper">
      <LandingImg />
      <Units />
      <TopClasses />
    </div>
  );
};
