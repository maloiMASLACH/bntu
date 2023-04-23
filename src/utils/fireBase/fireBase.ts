import {
  FirebaseStorage,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import app from "firebase/compat/app";
// import storage from "firebase/compat/storage";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/database";
import { ClassDto, UnitDto, UserDto } from "../../types";

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

  storage: FirebaseStorage;

  db: app.database.Database;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.storage = getStorage();
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

  updateUnit = (id: string, classData: UnitDto) =>
    this.db.ref(`units/${id}`).update(classData);

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

  deleteClass = async (classId: string) =>
    this.db.ref(`class/${classId}`).remove();

  places = () => this.db.ref(`places`);

  createPlace = (building: string, auditory: string) =>
    this.db
      .ref(`places/k${building}a${auditory}`)
      .update({ id: `k${building}a${auditory}`, building, auditory });

  registerToClass = async (classId: string, userId: string) => {
    await this.db.ref(`class/${classId}/users/${userId}`).set(userId);
    await this.db.ref(`users/${userId}/classes/${classId}`).set(classId);
  };

  unregisterToClass = async (classId: string, userId: string) => {
    await this.db.ref(`class/${classId}/users/${userId}`).remove();
    await this.db.ref(`users/${userId}/classes/${classId}`).remove();
  };

  getFile = async (fileFolder: string, id: string) => getDownloadURL(ref(this.storage, `${fileFolder}/${id}`));

  uploadFile = async (fileFolder: string, file: File, id: string) => {
    let url;

    const storageRef = await ref(this.storage, `${fileFolder}/${id}`);
    await uploadBytes(storageRef, file).then(async (snapshot) => {
      url = await getDownloadURL(ref(this.storage, snapshot.ref.fullPath));
    });

    return url;
  };

  deleteFile = async (fileFolder: string, id: string) => {
    const storageRef = await ref(this.storage, `${fileFolder}/${id}`);
    await deleteObject(storageRef);
  };
}

export default Firebase;
