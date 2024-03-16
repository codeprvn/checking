import { NavLink } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowDown  } from "react-icons/io";
import { useDispatch } from 'react-redux';
import {toggleMenu} from '../redux/actions';

const Accordion = ({ items, isActive, setAct }) => {
  const mobileWindow = window.innerWidth < 992;
  const dispatch = useDispatch();  
  const handleToggleMenu =()=>{
    mobileWindow && dispatch(toggleMenu())
 }

  return (
    <div className="accordion-item mt-2">
      <div
        className={"accordion-title d-flex justify-content-between p-2"}
        onClick={setAct}
      >
        <div>{items?.name}</div>
        <div style={{marginLeft: '20px'}}>{isActive ?<IoIosArrowDown /> : <IoIosArrowForward /> }</div>
      </div>
      {isActive && (
        <div className="accordion-content">
          <ul>
            {items?.subModule.map((link, index) => (
              <li key={index} onClick={handleToggleMenu}>
                <NavLink to={link.route}>{link?.subname}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
