import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore, initializeFirestore } from 'firebase/firestore';
// import { Auth, getAuth, initializeAuth } from 'firebase/auth';
// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

let firebaseApp: FirebaseApp;
// let fireAuth: Auth;
let fireStore: Firestore;
// let fireStorage: FirebaseStorage;

if (getApps().length < 1) {
  firebaseApp = initializeApp(firebaseConfig);
  fireStore = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });
  // fireAuth = initializeAuth(firebaseApp, {
  //   persistence: {
  //     type: 'LOCAL',
  //   },
  // });
} else {
  firebaseApp = getApp();
  // fireAuth = getAuth();
  fireStore = getFirestore();
}

// Initialize Firebase
export const app = firebaseApp;
export const db = fireStore;
// export const auth = fireAuth;
