import React from "react";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import Asidebar  from "./Asidebar"
import Header from "./Header.js";


const Layout = () => {

  return (
    <>
     <div className="">
      {/* <Navbar /> */}
    
      
      <div className="d-flex flex-column layout">
      <Header />
      <div className="d-flex flex-row innerLayout">
      <Asidebar />
      <div className="d-flex flex-column innerLayout">
      <Content />
      <Footer />
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Layout;
