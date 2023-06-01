import React, { useState, useContext } from "react"
import { useNavigate ,Link   } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";
import {useDispatch} from "react-redux";
import { saveUserIdAction,  } from '../components/TodoRedux';


export default function Login(props) {
    const {  onForgetClick } = props
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext); // Access the setToken function from the context

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

    
    const dispatch = useDispatch();

    function handleLogin(event) {
        event.preventDefault();

        const { email, password } = formData;
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                if (data.token && data.id) {
                    // Save the token to localStorage or any other storage mechanism
                    localStorage.setItem('token', data.token);
                    // localStorage.setItem('userId',data.id)
                    dispatch(saveUserIdAction(data.id));

                    setToken(data.token);

                    navigate("/home");
                    
                } else if (data.error === 'IncorrectPassword') {
                    alert('Incorrect password. Please try again.');
                } else if (data.error === 'IncorrectEmail') {
                    alert('Incorrect email. Please try again.');
                } else {
                    alert('Unexpected response from the server.');
                }
            })

            .catch((error) => {
                console.error('Error:', error);
                // Handle the error, such as showing an error message to the user
                alert(error.message);
            });
    }
    

    
    return (
        <div className="form-card">
            <h1 className="login-title"> LOGIN </h1>
            <p className="login-detail"> Please enter your Email and Password</p>
            <form onSubmit={handleLogin}>
                <input className="login-name"
                    type="email"
                    name="email"
                    placeholder="Email@test.com"
                    value={formData.email}
                    onChange={handleChange}
                    required>
                </input>

                <input className="login-pass"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required>
                </input>

                <input type="submit" value="Login" className="submit-button" />


            </form>


            <button onClick={() => onForgetClick()} className="forget-btn" > Forget Password? </button>

            <p className="login-account"> Dont have an account? {" "}
            <Link to="/signup"  className="signup-btn">Sign up</Link>
            </p>
            
            
        </div>

    )
}