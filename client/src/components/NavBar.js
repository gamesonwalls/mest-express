import { Badge } from 'antd';
import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

import  {useLogin} from './context/LoginContext';

function NavBar() {
    const {isLogin,userName,handleLogout}=useLogin()

    console.log("isLogin State from Navbar",isLogin)
    return(
     <div className="">
                <nav  className="navbar navbar-default" style={{padding: 0,backgroundColor:'white'}}>
          <div  className="container-fluid">



            <div  className="navbar-header">
              <button type="button"  className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span  className="sr-only">Toggle navigation</span>
                <span  className="icon-bar"></span>
                <span  className="icon-bar"></span>
                <span  className="icon-bar"></span>
              </button>
            </div>

          
            <div  className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            
              {isLogin===false &&  
              <ul  className="nav navbar-nav navbar-right">
                <li><a style={{color:'black'}}>Not Logged in</a></li>
                <li  className="">
                   <Link to="/Login" style={{color:'black'}}>Sign In</Link>
                </li>
              </ul>
              } 

              {isLogin===true && 
                <ul  className="nav navbar-nav navbar-right">
                    <li><a style={{color:'black'}}><span className="badge badge-secondary">Welcome</span> {userName}</a></li>
                    <li  className="dropdown">
                      <a   className="dropdown-toggle"  style={{color:'black'}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span  className="caret"></span></a>
                      <ul  className="dropdown-menu">
                       
                        <li><a onClick={handleLogout}>Logout</a></li>
                      
                        
                      </ul>
                    </li>
              </ul>
              }
            </div>
          </div>
        </nav>
    </div>
    )

}
export default NavBar;

