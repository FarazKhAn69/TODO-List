import { useState } from "react";

export function useAppLogic() {
  const [showSignup, setShowSignup] = useState(false);
  const [showForget, setShowForget] = useState(false);

  function handleSignupClick() {
    setShowSignup(true);
  }

  function handleSignupSubmit() {
    setShowSignup(false);
  }

  function handleForgetClick() {
    setShowForget(true);
  }

  function handleForgetClose() {
    setShowForget(false);
  }

  return {
    showSignup,
    showForget,
    handleSignupClick,
    handleSignupSubmit,
    handleForgetClick,
    handleForgetClose
  };
}
