import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import TodoList from "../components/Todo"

export default function Home() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    function handleLogout() {
        // Remove the token from localStorage or any other storage mechanism
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    }

    return (
        <div>
                <TodoList />
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    );
}
