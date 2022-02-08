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
        saveUser(user.email, user.displayName, "PUT");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  // const registerUser = (email, password, name, navigate) => {
  //     setIsLoading(true);
  //     createUserWithEmailAndPassword(auth, email, password)
  //         .then((result) => {
  //             verifyEmail();
  //             const user = result.user;

  //             const newUser = { email, displayName: name };
  //             setUser(newUser);

  //             navigate("/home");
  //             // save user to the database
  //             saveUser(email, name, "POST");
  //         })
  //         .catch((error) => {})

  //         .finally(() => setIsLoading(false));
  // };

  // Register New User
  const registerUser = (name, email, password, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        verifyEmail();
        // save user to the database
        saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        const destanition = location?.state?.from || "/";
        navigate(destanition);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

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
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
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
