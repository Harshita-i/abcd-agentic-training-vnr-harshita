// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/tasks");
//       setTasks(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const toggleComplete = async (id, completed) => {
//     try {
//       await axios.put(`http://localhost:5000/api/tasks/${id}`, { 
//         completed: !completed 
//       });
//       fetchTasks(); // Refresh the list
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   if (loading) {
//     return <div className="container mt-4">Loading tasks...</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2>Your Tasks</h2>
//       <div className="card p-3">
//         {tasks.length === 0 ? (
//           <p className="text-muted">No tasks yet. Add some tasks to get started!</p>
//         ) : (
//           <ul className="list-group">
//             {tasks.map((task) => (
//               <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
//                     {task.title}
//                   </strong>
//                   <span className="badge bg-secondary ms-2">{task.category}</span>
//                   {task.dueDate && (
//                     <small className="text-muted ms-2">📅 {task.dueDate}</small>
//                   )}
//                 </div>
//                 <div>
//                   <button
//                     className={`btn btn-sm me-2 ${task.completed ? "btn-success" : "btn-outline-success"}`}
//                     onClick={() => toggleComplete(task._id, task.completed)}
//                   >
//                     {task.completed ? "✓ Done" : "Mark Done"}
//                   </button>
//                   <button 
//                     className="btn btn-sm btn-danger" 
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    dueDate: ''
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { 
        completed: !completed 
      });
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      category: task.category,
      dueDate: task.dueDate || ''
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditForm({ title: '', category: '', dueDate: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, editForm);
      setEditingTask(null);
      setEditForm({ title: '', category: '', dueDate: '' });
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="container mt-4">Loading tasks...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Tasks</h2>
      <div className="card p-3">
        {tasks.length === 0 ? (
          <p className="text-muted">No tasks yet. Add some tasks to get started!</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task._id} className="list-group-item">
                {editingTask === task._id ? (
                  // Edit Mode
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        placeholder="Task title"
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select form-select-sm"
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                      >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        name="dueDate"
                        value={editForm.dueDate}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => handleUpdate(task._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.title}
                      </strong>
                      <span className="badge bg-secondary ms-2">{task.category}</span>
                      {task.dueDate && (
                        <small className="text-muted ms-2">📅 {task.dueDate}</small>
                      )}
                    </div>
                    <div>
                      <button
                        className={`btn btn-sm me-2 ${task.completed ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => toggleComplete(task._id, task.completed)}
                      >
                        {task.completed ? "✓ Done" : "Mark Done"}
                      </button>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => startEdit(task)}
                        disabled={editingTask !== null}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(task._id)}
                        disabled={editingTask !== null}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;