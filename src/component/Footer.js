import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="d-flex align-items-center justify-content-end p-2 footer">
      <div><Link to='https://gamebadlo.com' target="_blank">
        {date} &#169; <strong>Gamebadlo | About us</strong>
        </Link></div>
      
    </div>
  );
};

export default Footer;
