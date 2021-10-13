import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import LoginImage from "../images/login_image.svg";
import { auth, db, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

function Login() {
  const history = useHistory();

  const [googleUser, loading] = useAuthState(auth);

  const [error, setError] = React.useState("");

  const checkIfUserConnected = () => {
    if (googleUser) history.push("/profile");
  };

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const signinWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", res.user.email));
        const querySnapshot = await getDocs(q);
        console.log("is empty:", querySnapshot.empty);
        if (querySnapshot.empty) {
          await setDoc(doc(db, "users", res.user.uid), {
            exercicesDone: 0,
            level: "Beginner",
            totalGoodAnswer: 0,
            totalMistakes: 0,
            timePassed: 0,
            exercices: [],
            country: "France",
            email: res.user.email,
            username: res.user.displayName,
            isActive: true,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            xp: 0,
          }).catch((e) => e.message);
        } else {
          return;
        }
        toast.success("You are now logged in");
      })
      .catch((e) => console.log(e.message));
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((res) => {
        toast.success("Your account has been successfully created");
      })
      .catch((e) => console.log(e.message));
  };

  const signup = async () => {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    )
      .then(async (res) => {
        await setDoc(doc(db, "users", res.user.uid), {
          exercicesDone: 0,
          level: "Beginner",
          totalGoodAnswer: 0,
          totalMistakes: 0,
          timePassed: 0,
          exercices: [],
          country: "France",
          email: res.user.email,
          username: res.user.displayName,
          isActive: true,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          xp: 0,
        });
      })
      .catch((e) => setError("The email is already taken"));
  };

  checkIfUserConnected();

  return (
    <div className="flex-1 w-full bg-white flex">
      <div className="w-3/5 bg-secondary h-full flex-col flex justify-center">
        <h1 className="text-white font-bold mx-10 text-3xl mb-8">Login</h1>
        <div className="flex h-auto justify-between items-center px-10">
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="text-neutral300 mb-4">
              Email
            </label>
            <input
              placeholder="Email..."
              value={credentials.email}
              name="email"
              id="email"
              type="email"
              className="text-black mb-10 rounded-sm bg-neutral100 w-3/5 h-10 p-3 focus:outline-none"
              onChange={handleChange}
            />
            <label htmlFor="password" className="text-neutral300 mb-4 w-full">
              Password
            </label>
            <input
              placeholder="Password..."
              value={credentials.password}
              name="password"
              id="password"
              type="password"
              className="text-black mb-10 rounded-sm bg-neutral100 h-10 p-3 w-3/5 focus:outline-none"
              onChange={handleChange}
            />
            <h3 className="text-danger">{error.length > 0 && error}</h3>
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5">
                {" "}
                <button className="btn-inline" onClick={signIn}>
                  Log in
                </button>
                <button onClick={signup} className="btn-outline">
                  Sign up
                </button>
              </div>
              <button
                className="btn-google self-start"
                onClick={signinWithGoogle}
              >
                Sign in with Google <FcGoogle className="ml-10 h-10 w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-2/5 items-center justify-center">
        {/* image */}
        <img src={LoginImage} width={500} height={500} alt="login" />
      </div>
    </div>
  );
}

export default Login;
