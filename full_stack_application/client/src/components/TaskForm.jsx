import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Please enter a task title!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", { 
        title, 
        category, 
        dueDate 
      });
      
      setTitle("");
      setCategory("Work");
      setDueDate("");
      setMessage("Task added successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error adding task: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Task</h2>
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}
      
      <form className="card p-3 mb-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <input 
              className="form-control" 
              placeholder="Task title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <select 
              className="form-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <input 
              type="date" 
              className="form-control" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;