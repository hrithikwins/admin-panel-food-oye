import React from 'react';
import {Link} from 'react-router-dom';

export const Navbar = () => (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">User Management</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-user" className="nav-link">Add New User</Link>
                </li>
            </ul>
        </div>
    </nav>
)