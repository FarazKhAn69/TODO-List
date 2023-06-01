import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


const TodoDelete = (props) => {
  // console.log("tododelete props",props)
  const [line, setLine] = useState(false);
const navigate = useNavigate();

  const handleDelete = () => {
    fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoId: props.todoId,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);

        // Perform any necessary actions after deleting the todo
        // For example, update the UI or fetch the updated todo list
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cutIt = () => {
    setLine(true);
    // console.log("Deleting todo with ID:", todoId); // Add console.log statement

    handleDelete(); // Use props.todoId here
  };

  const handleEdit = () => {
    navigate('/update',{state:{todoId:props.todoId}}); // Navigate to the TodoUpdate component
  };

  return (
    <div className="todo_style">

<span onClick={cutIt}>
        <DeleteIcon className="deleteIcon" />
      </span>

      <span onClick={handleEdit} >
       <EditIcon fontSize="small" 
       sx={{fontSize:5}}
      className="editIcon" 
      />
      </span>
      <li style={{ textDecoration: line ? "line-through" : "none" }}>
        {props.text}
      </li>
    </div>
  );
};

export default TodoDelete;
