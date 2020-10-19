import React from 'react';
import $ from "jquery";
//import axios from 'axios'
import users from './user.json'
import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory  } from 'react-router-dom';
import Photo from '../assets/img/pic.jpg'
import Name from '../assets/img/name.png'


function Sidebar(props) {

  //isLogin
  //setisLogin

 // userName
  //setuserName


  return (
 
    
      <div style={{backgroundColor:'#f4f3ef'}}>
            <div className="" >
             <div className="leftColumnBackground" style={{ position: "fixed",padding: "20px",margin: "0px"}}>

                <img src={Photo} className="img-responsive center-block img-circle"
                    style={{
                        height: "171px",
                        width: "12em",
                        marginTop: "4em"
                    }}
                />
                <img src={Name}  className="img-responsive center-block"
                    style={{
                        height: "72px"
                    }}
                />
             </div>

                
            </div>
      
            

      </div>
  );
}

export default Sidebar;
