import React from 'react'
import { NavLink } from "react-router-dom"
const Header = () => {
    return (
        <div className='container-full'>
            <nav className='navbar navbar-expand-lg'
                style={{ backgroundColor: "black" }}>
                <NavLink to="/" className="btn px-md-5" style={{ color: "white" }}>Home</NavLink>
                <NavLink to="/view1" className="btn px-md-5" style={{ color: "white" }}>View Local storage form</NavLink>
                <NavLink to="/view2" className="btn px-md-5" style={{ color: "white" }}>View Firebase storage form</NavLink>
            </nav>
        </div>
    )
}

export default Header
