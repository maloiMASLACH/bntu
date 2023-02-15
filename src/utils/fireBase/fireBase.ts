import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { ClassDto, UserDto } from "../../types";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGE_SENDLER_ID,
};

class Firebase {
  auth: app.auth.Auth;

  db: app.database.Database;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser!.updatePassword(password);

  unit = (unitID: string) => this.db.ref(`units/${unitID}`);

  units = () => this.db.ref("units");

  users = () => this.db.ref(`users`);

  user = (uid: string) => this.db.ref(`users/${uid}/userData`);

  setUser = (uid: string, userData: UserDto) =>
    this.db.ref(`users/${uid}`).update({ userData });

  setAdmin = (uid: string) => this.db.ref(`users/${uid}/userData/isAdmin`);

  createClass = (id: string, classData: ClassDto) =>
    this.db.ref(`class/${id}`).update({ classData });

  classes = () => this.db.ref(`class`);

  class = (id: string) => this.db.ref(`class/${id}/classData`);

  classUsers = (id: string) => this.db.ref(`class/${id}/users`);

  userClasses = (uid: string) => this.db.ref(`users/${uid}/classes`);

  registerToClass = async (classId: string, userId: string) => {
    await this.db.ref(`class/${classId}/users/${userId}`).set(userId);
    await this.db.ref(`users/${userId}/classes/${classId}`).set(classId);
  };

  unregisterToClass = async (classId: string, userId: string) => {
    await this.db.ref(`class/${classId}/users/${userId}`).remove();
    await this.db.ref(`users/${userId}/classes/${classId}`).remove();
  };
}

export default Firebase;
