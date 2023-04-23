import React, { useContext, useEffect, useState } from "react";
import { UserDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import "./master.styles.css";
import { ClassMasterProps } from "./master.model";

export const ClassMasterBlock: React.FC<ClassMasterProps> = ({ masterId }) => {
  const firebase = useContext(FirebaseContext);

  const [masterData, setMasterData] = useState<UserDto>();
  const [avatarImg, setAvatar] = useState('');

  useEffect(() => {
    firebase
      .user(masterId)
      .once("value", (snapshot) => setMasterData(snapshot.val()))
      .then(() => firebase.getFile('avatar', `${masterId}`))
      .then((avatar) => setAvatar(avatar));
  }, []);

  return (
    <p className="masterInfo">
      {masterData && (
        <>
          <div className="shortInfo">
            <div
              className="masterAvatar"
              style={{
                background: avatarImg
                  ? `url(${avatarImg}) no-repeat center/100%`
                  : "grey",
              }}
            />
            {`${masterData?.firstName} ${masterData?.lastName}`}
          </div>
          {`${masterData?.number}`}
        </>
      )}
    </p>
  );
};
