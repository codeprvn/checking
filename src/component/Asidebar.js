
import Accordion from "./Accordion";
import { useState, useEffect } from "react";
import { items } from "../utilities/module";
import { Link, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import {getToggleState} from "../redux/selectors"

const Asidebar = () => {
  const location =useLocation()
  const menuState = useSelector(getToggleState)
  const [isActive, setIsActive] = useState("");  

  useEffect(()=>{
    let activeRoute = items.find((item) => item.subModule.map(route => route.route).includes(location.pathname));
   setIsActive(activeRoute?.name)
  }, [location.pathname]);

  return (
    <>
      <div className={`asideBar ${menuState ? "open1" : "close"}`} >
      
        {items.map((item, index) => (
          <Accordion
            key={index}
            items={item}
            isActive={isActive === item.name}
            setAct={() => {
              setIsActive((pre) => ( pre === item.name ? null : item.name));
            }}
          />
        ))}
      </div>
      
    </>
  );
};

export default Asidebar;
