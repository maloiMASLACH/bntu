import React, { useContext, useEffect, useState } from "react";
import "./class.styles.css";
import { FirebaseContext } from "../../../../utils";
import { ClassProfileProps } from "./class.model";
import { ClassDto } from "../../../../types";
import { ClassBlock } from "../../../../shared";

export const ClassProfileBlock: React.FC<ClassProfileProps> = ({ classId }) => {
  const firebase = useContext(FirebaseContext);
  const [classData, setClassData] = useState<ClassDto>();

  useEffect(() => {
    firebase
      .class(classId!)
      .once("value", (snapshot) => setClassData(snapshot.val()));
  }, []);

  return (
    <div className="profileClass">
      {classData && <ClassBlock key={classData.id} classData={classData} />}
    </div>
  );
};
