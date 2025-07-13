import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
export default function Navigation() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#e3f2fd', marginBottom: 15 }}
    >
      <div className="container-fluid">
        <div className="navbar-brand">LibSVM</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/SVC">
                SVC
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/SVC/OneClass">
                One-class SVC
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/SVR">
                SVR
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/benchmarks">
                Benchmarks
              </NavLink>
            </li>
          </ul>
          <a href="https://github.com/mljs/libsvm">
            <FaGithub
              className="nav-item"
              size={32}
              style={{ marginRight: 15 }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
