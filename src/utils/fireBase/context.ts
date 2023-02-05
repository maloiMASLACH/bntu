import React from 'react';
import Firebase from './fireBase';

const firebaseType = new Firebase();

const FirebaseContext = React.createContext<typeof firebaseType>(firebaseType);

export default FirebaseContext;
