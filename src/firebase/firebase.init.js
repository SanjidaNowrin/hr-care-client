import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseAuth = () => {
  initializeApp(firebaseConfig);
};

export default firebaseAuth;
