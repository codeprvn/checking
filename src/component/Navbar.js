import { useState } from "react";
import logo from "../assets/logo-dark.webp"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa'

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const onLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div className="d-flex align-items-center w-100 justify-content-between p-2 header">
      <div><Link to='/'><img src={logo} height='60px' /></Link></div>

      <nav className={isMobileMenuOpen ? "" : "navbar"}>
        <ul className={isMobileMenuOpen ? "open" : "navbar-menu"}>
          <li className="navbar-item"><NavLink to='/' end>Insights</NavLink></li>
          <li className="navbar-item"><NavLink to='game-management'>Game Management</NavLink></li>
          <li
            className="navbar-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to='#'>User Management</NavLink>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul className="dropdown-items">
                  <li className="dropdown-item"><NavLink to='usermanagement/list-player'>List Players</NavLink></li>
                  <li className="dropdown-item"><NavLink to='usermanagement/daily-login-report'>Daily Login Report</NavLink></li>
                </ul>
              </div>
            )}
          </li>
          <li className="navbar-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to='#'>Version & Maintenance</NavLink>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul className="dropdown-items">
                  <li className="dropdown-item"><NavLink to='version/create-new-version'>Create new Version</NavLink></li>
                  <li className="dropdown-item"><NavLink to='version/list-version'>List Version</NavLink></li>
                </ul>
              </div>
            )}</li>
          <li className="navbar-item"><NavLink to='broadcastmanagement'>Broadcast Management</NavLink></li>
          <li><button className="logOutButton" onClick={onLogOut}>Logout</button></li>
        </ul>
      </nav>
      
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className="bar" style={{ fontSize: '35px', color: '#595959' }}><FaBars /></div>
      </div>
    </div>
  );
};

export default Navbar;
