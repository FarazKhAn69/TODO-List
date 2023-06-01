import React, { useState } from "react";

async function updatePassword(email, newPassword) {
  try {
    const response = await fetch('/forgetauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newPassword })
    });

    const result = await response.text();
    console.log(result); // Password updated successfully
    alert(result);
  } catch (err) {
    console.error(err);
    
  }
};

export default function Forget(props) {
  const { onForgetClick } = props;

  const [email, setEmail] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');




  const handleForgetPassword = async (e) => {
    e.preventDefault();
    
        updatePassword(newPassword);
    };    
  
    // TODO: Validate email format
    // TODO: Handle error response from server
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    
    
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  
  const handleConfirmEmail = (e) => {
    e.preventDefault();
    updatePassword(email);
        setShowChangePassword(true);
    }
    

  return (
    <div className="form-card">
      <h1 className="login-title"> Forget Password </h1>
      <p className="login-detail">
        Please enter your Email to confirm Password
      </p>
      {showChangePassword ? (
        <form onSubmit={handleForgetPassword}>
          <input
            className="reset-pass"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <input type="submit" value="Reset Password" className="submit-button" />
        </form>
      ) : (
        <form >
          <input 
            className="login-name"
            type="email"
            name="email"
            placeholder="Email@test.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button onClick={handleConfirmEmail} className="confirm-mail" >Confirm email</button>

        </form>
      )}

      <p className="login-account">
        Back to Login?
        <button onClick={onForgetClick} className="signup-btn">
          {" "}
          Login
        </button>
      </p>
    </div>
  );
}
