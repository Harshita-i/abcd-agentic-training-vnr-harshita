import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskStats = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="container mt-4">Loading statistics...</div>;
  }

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Category statistics
  const categoryStats = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2>Task Statistics</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Overall Progress</h5>
            <div className="alert alert-info text-center">
              <h4>Completed: {completed} / {total}</h4>
              <p>Pending: {pending}</p>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${completionRate}%` }}
                >
                  {completionRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Tasks by Category</h5>
            {Object.keys(categoryStats).length > 0 ? (
              <ul className="list-group">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <li key={category} className="list-group-item d-flex justify-content-between">
                    <span>{category}</span>
                    <span className="badge bg-primary">{count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No tasks to categorize yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;