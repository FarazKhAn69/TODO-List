import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();
    // const { onLogin } = props
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSignup(event) {
        event.preventDefault();

        const { email, password } = formData;
        


        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                return data;
                // Do something here, such as redirecting to the login page or showing a success message


            })

            .catch(error => {
                console.error('Error:', error);
                // Handle the error, such as showing an error message to the user
                return error.message;
            })

            .then(result => {
                if (result === 'User successfully Signup') {
                    // User signed up successfully
                    // Do something here, such as redirecting to the login page or showing a success message
                    alert(result);
                    navigate('/'); // Navigate to the "/" path after successful signup

                } else {
                    // User signup failed
                    // Show an error message to the user
                    alert(result);
                }
            });
    }

    return (
        <div className="form-card">
            <h1 className="login-title"> Signup </h1>
            <p className="login-detail"> Please enter your Email and Password</p>

            <form onSubmit={handleSignup}>

                <input className="login-name"
                    type="email"
                    name="email"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Email@test.com"
                    required />


                <input className="login-pass"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required />

                <button className='signup-btnn' type="submit">Signup</button>

            </form>


            {/* <p className="signup-del" > Already have an account?
                <button onClick={onLogin} className="signup-log">Login</button >
            </p> */}



        </div>
    )

}


