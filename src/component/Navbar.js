import { useState } from "react";
import logo from "../assets/logo-dark.webp"
import { Link, NavLink, useNavigate , useLocation } from "react-router-dom";
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";

const Navbar = () => {

  // this state veriable in usef for open dropdown on hover
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Open and close hamburger menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate()
  const { pathname } = useLocation();

  // // function on dropdown menu
  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  // handle hamburger menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
 
// logout user and redirect to login page
  const onLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div className="d-flex align-items-center w-100 justify-content-between p-2 header">
      <div><Link to='/'><img src={logo} height='60px' alt="Gamebadlo logo" /></Link></div>

      <nav className={isMobileMenuOpen ? "" : "navbar"}>
        <ul className={isMobileMenuOpen ? "open" : "navbar-menu"}>
          <li className="navbar-item"><NavLink to='/' end>Insights</NavLink></li>
          <li className="navbar-item"><NavLink to='game-management'>Game Management</NavLink></li>
          <li
            className="navbar-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to='#' className={({ isActive})=>pathname.startsWith("/usermanagement") ? 'active': null}>User Management</NavLink>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul className="dropdown-items">
                  <li className="dropdown-item"><NavLink to='usermanagement/list-player' onClick={!isMobileMenuOpen ? handleMouseLeave:null}>List Players</NavLink></li>
                  <li className="dropdown-item"><NavLink to='usermanagement/daily-login-report' onClick={!isMobileMenuOpen ? handleMouseLeave:null}>Daily Login Report</NavLink></li>
                </ul>
              </div>
            )}
          </li>
          <li className="navbar-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to='#' className={({ isActive})=>pathname.startsWith("/version") ? 'active': null}>Version & Maintenance</NavLink>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul className="dropdown-items">
                  <li className="dropdown-item"><NavLink to='version/create-new-version' onClick={!isMobileMenuOpen ? handleMouseLeave:null}>Create new Version</NavLink></li>
                  <li className="dropdown-item"><NavLink to='version/list-version' onClick={!isMobileMenuOpen ? handleMouseLeave:null}>List Version</NavLink></li>
                </ul>
              </div>
            )}</li>
          <li className="navbar-item"><NavLink to='broadcastmanagement'>Broadcast Management</NavLink></li>
          <li><button className="logOutButton" onClick={onLogOut}>Logout</button></li>
        </ul>
      </nav>
      
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className="bar" style={{ fontSize: '35px', color: '#595959' }}>{!isMobileMenuOpen?<FaBars /> : <IoMdClose />}</div>
      </div>
    </div>
  );
};

export default Navbar;
