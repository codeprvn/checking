import React from "react";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import Asidebar  from "./Asidebar"
import Header from "./Header.js";


const Layout = () => {

  return (
    <>
    
      {/* <Navbar /> */}
    
      
      <div className="d-flex flex-column layout">
      <Header />
      <div className="d-flex flex-row innerLayout">
      <Asidebar />
      <div className="container-fluid d-flex flex-column m-0 p-0">
      <Content />
      <Footer />
      </div>
      </div>
      </div>
    
    </>
  );
};

export default Layout;
