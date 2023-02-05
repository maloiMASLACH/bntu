import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../constants";
import { UnitDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import "./unit.styles.css";

export const Units: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [units, setUnits] = useState<UnitDto[]>([]);

  const handleGoToUnit = (id: string) => {
    navigate(`../${RouterLinks.Unit}/${id}`);
  };

  useEffect(() => {
    firebase.units().once("value", (snapshot) => {
      setUnits(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div className="unitsWrapper">
      <h1 className="unitsTitle">Факультеты</h1>
      <div className="unitsList">
        {units.map(({
          name, fullName, logo, id
        }) => (
          <div
            key={id}
            className="unitBLock"
            onClick={() => handleGoToUnit(id)}
          >
            <p className="unitBLockTitle">{name}</p>
            <i className={`${logo} unitIcon`} />
            <p>{fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
