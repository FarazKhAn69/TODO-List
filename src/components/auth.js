import React from "react";
import { useAppLogic } from "./AppLogic";
import Login from "./Login";
import Signup from "./Signup";
import Forget from "./Forget";

export default function Auth() {
  const {
    showSignup,
    showForget,
    handleSignupClick,
    handleSignupSubmit,
    handleForgetClick,
    handleForgetClose
  } = useAppLogic();

  return (
    <div>
      {showSignup ? (
        <Signup onLogin={handleSignupSubmit} />
      ) : showForget ? (
        <Forget onForgetClick={handleForgetClose} />
      ) : (
        <Login onSignupClick={handleSignupClick} onForgetClick={handleForgetClick} />
      )}
    </div>
  );
}
