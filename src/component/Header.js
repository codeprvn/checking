import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toggleMenu} from '../redux/actions';
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {getToggleState} from "../redux/selectors"
import logo from "../assets/logo-dark.webp"


const Header = () => {
  const menuState = useSelector(getToggleState)

  const dispatch = useDispatch();  

  const handleToggleMenu =()=>{
     dispatch(toggleMenu())
  }

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    
      const handleLogout = () => {
        localStorage.removeItem('token')
    navigate('/login')
      };

       useEffect(() => {
    if( window.innerWidth < 992 && menuState){
    handleToggleMenu();
  }

  }, []);

  return (
    <header className='d-flex justify-content-between align-items-center' style={{ height: '80px',  padding: '0 20px', backgroundColor: '#fdf7ee', border:'1px solid rgb(213 206 196)' }}>
    <div className="hamburger" onClick={handleToggleMenu}>
        <div className="bar" style={{ fontSize: '35px', color: '#595959' }}>{<FaBars /> }</div>
      </div>
      <div><Link to='/'><img src={logo} height='80px' alt="Gamebadlo logo" /></Link></div>
    <div className='rounded-circle mx-3'>
      {/* You can replace the following icon with your profile icon */}
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACUCAMAAABRNbASAAAAMFBMVEXm5uazs7OwsLDp6enCwsLj4+Pb29vV1dW3t7e+vr7g4ODS0tLGxsbPz8+6urrY2Nh7II9uAAADuUlEQVR4nO2by7aDMAhFYzDW+Pz/v73a3r6sVgIBOsgZOdwLCRAIzhUVFRUVFRUVFRUVFRUVZRE8ZE3yqa4f6jjFGIexCb/DB9D1deu9r65aP+rLj/BBN7TVP9hdvmp7a65VTfQbsn++wdp44Iat0Z5009iZHo5Le4T25LNiG7+iXfHa3oQOQn3KdvU9C7huwrAtdLVTN1733d3e6bTZkHa70kXlqILyNxvbwZDCpksHTRrbQjeq/dgwJbItdLMSHZwH309NnQ5cSEdb3U7FdCTDLXQqaZbgcTfTKbDBhcS2aFagS4xxL6aT/6+hpVrOB3G4jmi4Be4ibTriWb1K/L9CUsp/1yTM5oDsclXVSmcJ+nmo5INJx2CrLrJs0HDghNsAMNPPgwLcT1uOAyftc5zf2jayUZh1IMTjHCeUiGcIRhD2g3huZcDJVyWRDFeJ13Opl/0Xw0X5SphcbMq73KJIvUOM8mzk25cf5O8Q9Kth1crbbiDD+SjNxkiu8nA9A068I8GAky6ZnEvuaj4l/lc5KUI8ty6moxrOKzQ3qalfJX1RuyVKXWGa4RQ8zlGPhNdAW0TLrkqDiI5Qqqsch1WE/+pr+XrpTocetmrbbYVr0n6sRhH8Qjen0EXlQTo0CXMcrYnhkw6dJzT97S50X0Ij32+FNZ3SLHMrpNeJl797AlzB3qpF33fVGDj1Jy83oR5JWJzVGx1iDqb4aGMjRO2k9mbjQ+H8OmER5W5CxDqF8fSRzjuJhnBw/lsN4U6dzs7nEAW73WnFwJnFOUwYNkpfDjXPmcxOREBkV5OSyeGmr0bFJvJ2bRVMUNdXo6IJ25YQnp7vsyF71158Qr0n7IjO4sfix4dKXc2n0vpgqm6HXNUwoYOQPBJWKwCgT2+8+lplKwI6Wju9VSjtwni463Um2UE6uOZ4DQ1jvF6syQlurlNb1Vu8KHFsAcLMMdoTr26yk/X1lANtpavqbNsHEJp+MVkesDtfnHP4Hrg+Zia70vnIPhoQRs6b5RMNDSeywIX6bgkl76exIa7AQsd4I4/lqyLteW6f39X2+QgbuvJme+C1Q9IFDRpmJkjE8wPeerx31CQ89ANn5PgjMx5uJgu9PlqFvKOZ2O1Gd85Gf/bIpzuzHWuPhUt3cgtiLQDx6b7evumv4zLpSzjm7MPl0ZemD+UhUF59CXd6CfWY7uh2y9qbygU3HcCZ/9RV+/HELDVstDu5IG5yZ9dusPsFj1u1t3JiHn8f2nveac300Od/5e1f5tWjdvoDQUktIwJm2KgAAAAASUVORK5CYII="
       alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', cursor:'pointer'}} onClick={toggleDropdown}  />
       {showDropdown && (
          <div style={{ width:'150px', position: 'absolute', top: '80px', right: '0', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: '999' }}>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
              <li style={{ padding: '10px 20px', cursor: 'pointer' }}>Profile</li>
              <li style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
    </div>
  </header>
  )
}

export default Header