import { NavLink } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowDown  } from "react-icons/io";
// import { CgCardSpades } from "react-icons/cg";

const Accordion = ({ items, isActive, setAct }) => {
  return (
    <div className="accordion-item">
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
              <li key={index}>
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
