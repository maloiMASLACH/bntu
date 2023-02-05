import React from "react";
import { ActiveUserType } from "./activeUser.model";

export const AuthUserContext = React.createContext<ActiveUserType | null>(null);
