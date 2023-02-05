import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UnitDto } from "../../types";
import { FirebaseContext } from "../../utils";
import { ShortInfo, UnitImg } from "./components";
import "./unit.styles.css";

export const UnitPage: React.FC = () => {
  const { unit } = useParams();
  const firebase = useContext(FirebaseContext);

  const [unitData, setUnitData] = useState<UnitDto>();

  useEffect(() => {
    firebase.unit(`${unit}`).once("value", (snapshot) => {
      setUnitData(snapshot.val());
    });
  }, []);

  return (
    <div className="unitPageWrapper">
      {unitData && (
        <div className="unitPageShortInfo">
          <ShortInfo unitData={unitData} />
          <UnitImg src={unitData.mainImg} />
        </div>
      )}
    </div>
  );
};
