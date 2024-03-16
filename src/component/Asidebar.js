
import Accordion from "./Accordion";
import { useState } from "react";
import { items } from "../utilities/module";
// import logo from "../assets/logo-dark.webp"
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import {getToggleState} from "../redux/selectors"

const Asidebar = () => {
  const menuState = useSelector(getToggleState)
  const [isActive, setIsActive] = useState("");  

  return (
    <>
      {menuState && <div className="" style={{backgroundColor: '#fdf7ee', border:'1px solid rgb(213 206 196)'}}>
      
        {items.map((item, index) => (
          <Accordion
            key={index}
            items={item}
            isActive={isActive === item.name}
            setAct={() => {
              setIsActive((pre) => (pre === item.name ? null : item.name));
            }}
          />
        ))}
      </div>}
      
    </>
  );
};

export default Asidebar;
