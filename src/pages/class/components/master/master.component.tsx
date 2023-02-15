import React, { useContext, useEffect, useState } from "react";
import { UserDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import "./master.styles.css";
import { ClassMasterProps } from "./master.model";

export const ClassMasterBlock: React.FC<ClassMasterProps> = ({ masterId }) => {
  const firebase = useContext(FirebaseContext);

  const [masterData, setMasterData] = useState<UserDto>();

  useEffect(() => {
    firebase
      .user(masterId)
      .once("value", (snapshot) => setMasterData(snapshot.val()));
  }, []);

  return (
    <p className="masterInfo">
      {masterData && (
        <>
          <div
            className="masterAvatar"
            style={{
              background: masterData?.avatar
                ? `url(${masterData?.avatar}) no-repeat center/100%`
                : "grey",
            }}
          />
          {`${masterData?.firstName} ${masterData?.lastName}`}
        </>
      )}
    </p>
  );
};
