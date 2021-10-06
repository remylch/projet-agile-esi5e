import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginImage from "../images/login_image.svg";

function Login() {
  const signup = () => {};

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
              name="email"
              id="email"
              type="email"
              className="text-black mb-10 bg-neutral100 w-3/5 h-10 p-3 focus:outline-none"
            />
            <label htmlFor="password" className="text-neutral300 mb-4 w-full">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              className="text-black mb-10 bg-neutral100 h-10 p-3 w-3/5 focus:outline-none"
            />
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5">
                {" "}
                <button className="btn-inline">Log in</button>
                <button onClick={signup} className="btn-outline">
                  Sign up
                </button>
              </div>
              <button className="btn-google self-start">
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
