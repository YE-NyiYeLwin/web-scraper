import React from 'react';
import { Link } from 'react-router-dom';

const Navbar=()=> {
  return (
    <>
      <div className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{zIndex: 3, width: "300px"}} id="mySidebar">
        <div className="w3-container">
          <img src="https://reactjs.org/logo-og.png" alt='logo' style={{width: "45%",borderRadius:"40px",marginTop:"10px" }} /><br /><br />
          <h4><b>PORTFOLIO</b></h4>
          <p className="w3-text-grey">ReactJs+NodeJs by NYL</p>
        </div>
        <div className="w3-bar-block">
          <Link to="/news"><button className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-th-large fa-fw w3-margin-right"></i>News
          </button></Link>
          <Link to="/youtube"><button className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-user fa-fw w3-margin-right"></i>Youtube
          </button></Link>
          <Link to="/job"><button className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-envelope fa-fw w3-margin-right"></i>Job<br/>
          </button></Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
