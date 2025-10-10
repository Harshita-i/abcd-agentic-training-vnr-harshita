// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path ? 'nav-link active' : 'nav-link';
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//       <div className="container-fluid">
//         {/* ToDo name on the left */}
//         <Link className="navbar-brand fw-bold fs-3" to="">
//           <i className="fas fa-tasks me-2"></i>
//           ToDo App
//         </Link>

//         {/* Mobile toggle button */}
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-bs-toggle="collapse" 
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navigation tabs on the right */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className={isActive('/form')} to="form">
//                 <i className="fas fa-plus-circle me-2"></i>
//                 Form
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className={isActive('/list')} to="list">
//                 <i className="fas fa-list me-2"></i>
//                 List
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className={isActive('/status')} to="status">
//                 <i className="fas fa-chart-bar me-2"></i>
//                 Status
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="">
          ToDo App
        </Link>
        
        <div className="navbar-nav ms-auto d-flex flex-row">
          <Link className="nav-link me-3" to="">
            Home
          </Link>
          <Link className="nav-link me-3" to="form">
            Form
          </Link>
          <Link className="nav-link me-3" to="list">
            List
          </Link>
          <Link className="nav-link" to="status">
            Status
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;