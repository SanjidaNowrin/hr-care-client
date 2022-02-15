import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuth from "./../firebase/firebase.init";

firebaseAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth();
  // google sign in
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const destination = location?.state?.from || "/home";
        navigate(destination);
        // save user to the database
        saveUserInfo(user.email, user.displayName,user.photoURL, "PUT");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };


  // Register New User
  // Register New User
  const registerUser = (name, email, password,photo, location, navigate) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        verifyEmail();
        // save user to the database
        saveUserInfo(email, name,photo, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:photo
        }).then(() => {
        }).catch((error) => {
        });
        const destanition = location?.state?.from || '/';
        navigate(destanition)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage)
      })
      .finally(() => setIsLoading(false));
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
    });
  };

  // Email password login
  const passwordLoginUser = (email, password, location, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destanition = location?.state?.from || "/";
        navigate(destanition);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  // Observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

//logout 
const logOut = () => {
  setIsLoading(true);
  signOut(auth)
      .then(() => {
          // Sign-out successful.
      })
      .catch((error) => {
          // An error happened.
      })
      .finally(() => setIsLoading(false));
};

  //save user to database
  const saveUserInfo = (email, displayName,photoURL, method) => {
    const user = { email, displayName, photoURL };
    fetch("https://murmuring-falls-58867.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  return {
    user,
    googleSignIn,
    logOut,
    passwordLoginUser,
    registerUser,
    isLoading,
    error,
  };
};

export default useFirebase;
