import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';


  const TaskList = () => {
    //tasks represents the array of documents(tasks) retrieved from the MongoDB database
  const [tasks, setTasks] = useState([]);
  const [taskFromFrontEnd, setTaskFromFrontEnd] = useState('');

        //The purpose of using 'useEffect' in this scenario is to fetch tasks from the backend API
        //and update the component's state with the retrieved data when the component mount(aka initially renders)
        //It ensures that the tasks are automatically fetched and displayed in the component without requiring manual intervention.
        useEffect(() => {
            fetchTasks();
          }, []);

          //Read
          const fetchTasks = async () => {
            try {
              const response = await axios.get('http://localhost:3006/task');
              setTasks(response.data);
            } catch (error) {
              console.log(error);
            }
          };
        
          //Create
          const createTask = async () => {
            try {
              console.log('fire!')
              const response = await axios.post('http://localhost:3006/task/createTask', { taskFromFrontEnd });
              console.log(response.data);
              fetchTasks(); // Refresh the task list after creating a new task
              setTaskFromFrontEnd(''); // Reset the input field after creating the task
            } catch (error) {
              console.log(error);
            }
          };

          //Delete
          const deleteTask = async (taskIdentifier) => {
            try {
              await axios.delete(`http://localhost:3006/task/deleteTask/${taskIdentifier}`);
              fetchTasks(); // Refresh the task list after deleting the task
            } catch (error) {
              console.log(error);
            }
          };
  return (
  <div>
  <h1>Tasks</h1>
  <ul className = 'text-center bg-blue-500'>
     {/* When mapping over the 'tasks' array in the JSX code, 'task._id' is used to access the unique identifier property ('_id')
    The 'key' prop is a special attribute in React that helps it keep track of individual elements in a list.
    Since '_id' is unique for each task, it ensures that each list item has a unique key, which helps React efficiently update and re-render only the necessary components when the task list changes.
    So, when the user clicks on an icon, it will have the document's unique '_id' associated with it, that will get passed to the deleteTask() function as an argument
    and then thanks to the help of req.params, we will be able to use that as part of the path, extract it on the backend and use that to know which document to delete from the database on the backend */}
    {tasks.map((task) => (
      <li key={task._id}><FaCheckCircle onClick={() => deleteTask(task._id)} />{task.title}</li>
    ))}
  </ul>

  <input
    type="text"
    value={taskFromFrontEnd}
    onChange={(e) => setTaskFromFrontEnd(e.target.value)}
    placeholder="Enter task title"
  />
  <button onClick={createTask}>Create Task</button>
</div>
);

  }
export default TaskList






    // Outer container for full screen color
  //   <div className = 'w-full h-screen bg-blue-400 flex justify-center items-center'>
  //       {/* Inner container to handle centering/aligning of input fields */}
  //       <div className="flex flex-col justify-evenly w-[500px] h-[500px] bg-red-600">
  //           <input className="w-64 h-10 px-2 border border-gray-300 rounded" type="text" value = {boxVal} placeholder="Input 1" />

  //           <form onSubmit = {handleSubmit}>
  //           <input className="w-64 h-10 px-2 border border-gray-300 rounded" type="text" placeholder="Input 2" />
  //           <input className="w-64 h-10 px-2 border border-gray-300 rounded" type="text" placeholder="Input 3" />
  //           </form>
    
  //           <button onClick = {handleClick} className="w-64 h-10 px-2 border border-gray-300 rounded">
               
  //               click me!!!!
                
  //           </button>
  //       </div>
  //   </div>
  // 