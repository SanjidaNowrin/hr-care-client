import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuth from "./../firebase/firebase.init";

firebaseAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const auth = getAuth();
  // google sign in
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        // save user to the database
        saveUserInfo(user?.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/home";
        navigate(destination);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error.message);
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  // Register New User
  // Register New User
  const registerUser = (email, name, password, photo, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        verifyEmail();
        // save user to the database
        saveUserInfo(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => { })
          .catch((error) => { });
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
  const tokenStringify = {
    "type": "service_account",
    "project_id": "hr-care-6befb",
    "private_key_id": "da8ac53668fed602c12dbdc0e28e19f6ac8ade3e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDgBCPyQifVPY1Y\nQL+J3/x6LBk2GXYqWRp+4yefM5h8KHousne4phOVRCQZ/bmFGvI84rn9zyVvULer\nnzSU2CffNq+2CUhcR/GEieJu1fmo2O+/DkzKkp3JB6XNHXS6ImewujVq91YKgXyX\nDtv5iPJcFjLoFxCo2C1pHzn+gMvUzp9wHoAZPrKEhpdqnZ2DWW9JeCYSPwWxAGIt\nOC+D8CF7y4mNJDah6RBIXxzV1+4rHMBsQLGeh/tDuaoOZWx6k57PimPu4rL01AFb\nmmeJ+UBIyp8B7MDZfkqxxRzUkKV4F5n0F3hsQw3slgstMBQhoCOcLYFMiHs/m+O5\n8ap7Df89AgMBAAECggEAXfjeq22dEBL2DCN9NfVEEGwXV15u92zRdJENufcG7G5+\ncsBjAI6KgH9JNa39+RxIqcnig9o1tfCCW/g5ModKkpR6OT7DoBJ9+j9tQVl5lZ8L\nU3ZIOGIw1nfi0Zydrsdn//bdGbYP3fBbt3KATLlqEb8uM7YZQvsMcaCrz1twJiCO\nTO+JLui15sKaaUmb4LdRqti5vw/Xwj0SW+jN7y2i5vz7RapeFEvbhoejNTkh5H5j\n5/0i6vgJTvovIEOMOek9LPFGSvoAcOPdMpQ9CqcxmVRMeHu/sNtFEo/MvIkjVv1/\n4kNlAfaGFEneap8Go+VUWMIphawOKzYbz1q24/2hcQKBgQDxlLd1G/W4tZRncwHP\n5DNwqtI0JmhtBLrbZjeR9RtslnRDzQmEWFtWrwQ+3RPBOuz/GDN9ZQKSIt9ZIskB\n89UMIs6SxECKcBANu99Bn/2dDx1hD7orLv35012YkLsRsBp0o1A6J8pxnBW8MI5M\n9d9JWlhJIOK9UKNpm0b6LG8iEwKBgQDtYwoqek5oBxww+VJgzQtgvvTdxcG/udJj\nywhrkoW5It/WPrE2+Wq225aYbFdY8wPDNK4Cpc74pqZDHbiIfytq8uv8HDdNLiAo\nAgzfOqh/33JDTWn4N2rE4HHgvyRuRacwkP/KkKVhn7n6sR5SJnbqJGvmfSq3Recq\ni9CV36gDbwKBgQDGvXzLqAvXP/JtxIxaFbdH2hAB/RLtlPWQJyBSQB2mkIPnf1dz\n/ChwQJ0yhjeJQMvV9HfvkdiylmO99cL9izXavQvKbA9YlGZwlf1OBKvkuJmHzyNu\nAUPJcdxO9cof/AtXpz8KCNAf9LNg1WVL5P4jX2LADoDaE+vLpoWWrFVk5wKBgQDp\nOoYxZ8sC8AFlqH+kNbB5FAQ2o+YQvbwUadVTAzk4xSfQMfYhAfozwBj8lm1XKiPH\nNUnFtixcJjdx95BnIzKAOD1cjEhVHv1e8Wy+Ib6NK/byYuu7gI748V9RJdrgMLTr\nxXpbBbRG7wxlXoFgywPIVZJheRZvzFErfwSnS3+iJwKBgQCWezO/q5/4rn+0w5ku\nUkcn+xug1j7+z8EOXYpIFMA2AHzpzPpYFFHQwqPboXY66jMhXbp9vNPfmNMbt2sG\nzP1bGTDDx3PFbp93gfbQE8U23eKtt9kLcpedleBNgA4DW0B4sY+7VgJMnak7SHFl\nFCLazj2T3hlAELxwNEloQBrBtA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-l2azm@hr-care-6befb.iam.gserviceaccount.com",
    "client_id": "113434742827574299445",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l2azm%40hr-care-6befb.iam.gserviceaccount.com"
  }

  // Observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
          localStorage.setItem("firebase", JSON.stringify(tokenStringify))
        });
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
  const saveUserInfo = (email, displayName, method) => {
    const user = { name: displayName, email };
    console.log(user);
    fetch("https://ancient-thicket-61342.herokuapp.com/user", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  //makeadmin
  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.result[0]?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [user]);
  console.log(isAdmin);
  return {
    token,
    user,
    isLoading,
    error,
    isAdmin,
    googleSignIn,
    logOut,
    passwordLoginUser,
    registerUser,
  };
};

export default useFirebase;
