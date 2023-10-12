import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";

const Layout = () => {
  return (
    <div className="d-flex flex-column justify-content-between layout">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
};

export default Layout;
