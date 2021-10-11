import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import LoginImage from "../images/login_image.svg";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [googleUser, loading] = useAuthState(auth);

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

  const signinWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider);
  };

  const signIn = () => {};

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    )
      .then((res) => console.log(res))
      .catch((e) => e.message);
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
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5">
                {" "}
                <button className="btn-inline">Log in</button>
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
        <img src={LoginImage} width={500} height={500} />
      </div>
    </div>
  );
}

export default Login;
