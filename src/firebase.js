import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* const firebaseConfig = {
  apiKey: "AIzaSyCslNvRFuYc3pKN0tSr5dlPoJxEcrihqNo",
  authDomain: "readinginterface.firebaseapp.com",
  projectId: "readinginterface",
  storageBucket: "readinginterface.appspot.com",
  messagingSenderId: "761440189198",
  appId: "1:761440189198:web:3278f0c9a03448623cb55f",
}; */

const firebaseConfig = {
  apiKey: "AIzaSyDpE7VoaTpHqpy3p6oF9kGZy_thj-8LHmE",
  authDomain: "backup-reading-interface.firebaseapp.com",
  projectId: "backup-reading-interface",
  storageBucket: "backup-reading-interface.appspot.com",
  messagingSenderId: "915002351110",
  appId: "1:915002351110:web:9880d16d1721e1ea29ad87",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
