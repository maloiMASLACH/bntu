import { ActiveUserType } from "../../context";
import Firebase from "../fireBase";

export const fetchURLInfo = async (
  setUser: (el: ActiveUserType) => void,
  firebase: Firebase
) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    let userIsAdmin = false;

    firebase
      .setAdmin(authUser?.uid || "")
      .once("value", (snapshot) => {
        userIsAdmin = snapshot.val();
      })
      .then(() => {
        setUser({
          isAdmin: userIsAdmin,
          userId: authUser?.uid || "",
          userMail: authUser?.email || "",
        });
      });
  });
};
