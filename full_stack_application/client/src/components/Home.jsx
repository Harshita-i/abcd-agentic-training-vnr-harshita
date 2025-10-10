import React from 'react';

const Home = () => {
  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Hero Section */}
      <div className="row justify-content-center py-5">
        <div className="col-lg-8 text-center">
          <div className="hero-content">
            <h1 className="display-4 fw-bold text-primary mb-4">
              <i className="fas fa-tasks me-3"></i>
              Welcome to Your Smart ToDo List
            </h1>
            <p className="lead text-muted mb-4">
              Organize your life, boost your productivity, and achieve your goals with our intuitive task management system.
            </p>
            <div className="d-flex justify-content-center gap-3 mb-5">
              <span className="badge bg-primary fs-6 px-3 py-2">
                <i className="fas fa-check me-2"></i>Easy to Use
              </span>
              <span className="badge bg-success fs-6 px-3 py-2">
                <i className="fas fa-sync me-2"></i>Real-time Updates
              </span>
              <span className="badge bg-info fs-6 px-3 py-2">
                <i className="fas fa-chart-line me-2"></i>Progress Tracking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row justify-content-center py-4">
        <div className="col-lg-10">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-plus-circle fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title fw-bold">Add Tasks</h5>
                  <p className="card-text text-muted">
                    Quickly add new tasks with our simple and intuitive form. Never forget what you need to do!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-list-check fa-3x text-success"></i>
                  </div>
                  <h5 className="card-title fw-bold">Track Progress</h5>
                  <p className="card-text text-muted">
                    Monitor your task completion status and see your productivity metrics at a glance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-chart-pie fa-3x text-info"></i>
                  </div>
                  <h5 className="card-title fw-bold">View Statistics</h5>
                  <p className="card-text text-muted">
                    Get insights into your task completion patterns and improve your workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="row justify-content-center py-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="text-center mb-4 fw-bold text-dark">
                <i className="fas fa-rocket me-2 text-primary"></i>
                Getting Started is Easy!
              </h3>
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <span className="fw-bold fs-4">1</span>
                  </div>
                  <h6 className="fw-bold">Click "Form"</h6>
                  <p className="text-muted small">Navigate to the form tab to start adding your tasks</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="step-number bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <span className="fw-bold fs-4">2</span>
                  </div>
                  <h6 className="fw-bold">Add Tasks</h6>
                  <p className="text-muted small">Fill in your task details and submit</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="step-number bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <span className="fw-bold fs-4">3</span>
                  </div>
                  <h6 className="fw-bold">Track & Complete</h6>
                  <p className="text-muted small">View your tasks and mark them as complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row justify-content-center py-4 mb-5">
        <div className="col-lg-6 text-center">
          <div className="bg-gradient p-4 rounded-3" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <h4 className="text-white mb-3">Ready to boost your productivity?</h4>
            <p className="text-white opacity-75 mb-3">Start organizing your tasks today and see the difference!</p>
            <i className="fas fa-arrow-up fa-2x text-white opacity-75"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;