import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TodoDelete from '../components/TodoDelete';
import { useSelector } from 'react-redux';

const TodoList = () => {
  const [item, setItem] = useState('');
  const [todos, setTodos] = useState([]);

  const userId = useSelector(state => state.id); // Retrieve the logged-in user's userId from Redux

  useEffect(() => {
    // Fetch todos when the component mounts
    fetch(`/todos/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:',);
        setTodos(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [userId]);

  const itemEvent = (e) => {
    setItem(e.target.value);
  };

  const handleAddTodo = () => {
    if (item.trim() === '') {
      // Ignore adding empty todos
      return;
    }

    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        list: item,
        userId: userId
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:',);
        setItem('');

        // Fetch updated todos after creating a new todo
        fetch(`/todos/${userId}`)
          .then(response => response.json())
          .then(data => {
            console.log('Success:',);
            setTodos(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='main-div'>
      <div className='center-div'>
        <br />
        <h1 className='todo-name'>Todo List</h1>
        <input
          className='todo-input'
          type='text'
          value={item}
          onChange={itemEvent}
          placeholder='Add an Item'
        />
        <Button className='newBtn' onClick={handleAddTodo}>
          <AddIcon />
        </Button>
        <br />

        <ol>
          {todos?.map(todo => (
            <TodoDelete key={todo._id} text={todo.list} todoId={todo._id} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
