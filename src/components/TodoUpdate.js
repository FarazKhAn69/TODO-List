import React, { useState,useEffect,useContext } from "react";
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import ForwardIcon from '@mui/icons-material/Forward';
import { AuthContext } from './AuthContext';

const TodoUpdate = (props) => {
    const location = useLocation()
    const { token } = useContext(AuthContext);

    const [updatedItem, setUpdatedItem] = useState('');
    // console.log("location props", location.state.todoId)
    const navigate = useNavigate();
    const todoId = location.state?.todoId;

    useEffect(() => {
        if (!token) {
          navigate('/');
        }
      }, [token, navigate]);


    const handleUpdateTodo = () => {
        if (updatedItem.trim() === '') {
            // Ignore adding empty todos
            return;
          }

        // console.log('Todo ID:', todoId); // Log the todoId

        fetch(`/update/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                list: updatedItem
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update todo');
                }
                return response.json();
            })
            .then(updatedTodo => {
                console.log('Success:', updatedTodo);
                navigate('/home')
                // Perform any necessary actions after updating the todo
                // For example, update the UI or fetch the updated todo list
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleInputChange = (e) => {
        setUpdatedItem(e.target.value);
    };

    return (
        <div className='main-div'>
            <div className='center-div'>
                <br />
                <h1 className='todo-name'>EDIT TODO</h1>
                <input
                    className='todo-input'
                    type='text'
                    placeholder='Edit an Item'
                    value={updatedItem}
                    onChange={handleInputChange}
                />

                {/* <Button className='update-btn' 
                fontSize="small"
                size="small" 
                endIcon={<EditIcon />} 
                onClick={handleUpdateTodo} 
                 >
                    Update
                </Button> */}


                <Button className='newBtn' onClick={handleUpdateTodo}>  
                    <ForwardIcon />
                  </Button>
                <br />
            </div>
        </div>
    );
};

export default TodoUpdate;
