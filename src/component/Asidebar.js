import asidLogo from "../assets/titlelogo.png";
import Accordion from "./Accordion";
import { useState } from "react";
import { items } from "../utilities/module";

const Asidebar = () => {
  const [isActive, setIsActive] = useState("");

  return (
    <>
      <div className="asideBar">
        {items.map((item, index) => (
          <Accordion
            key={index}
            items={item}
            isActive={isActive === item.name}
            setAct={() => {
              setIsActive((pre) => (pre == item.name ? null : item.name));
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Asidebar;
