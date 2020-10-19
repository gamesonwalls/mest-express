import React from 'react';
import $ from "jquery";
//import axios from 'axios'
import user from '../user.json'

function Login(props) {


  console.log(props)
  //isLogin
  //setisLogin

 // userName
  //setuserName

  function userLogin(e){
      e.preventDefault();
    let username= document.getElementById('username').value
    let pasword= document.getElementById('password').value
 
      let strinDt=validateUserCredential(username,pasword)

      if(strinDt===true){
                props.setisLogin(true)
                props.setuserName(username)
                //$.noConflict();
                props.setVisible(false)  
      }else{
        $("#checker").fadeIn(100).delay(3000).fadeOut(2000)
      }  

  }

  function validateUserCredential(username,password){

    let users= JSON.parse(localStorage.getItem('users'));
          let checker= users.some((arrVal)=> { 
              return username === arrVal.username && password ===arrVal.password; 
          });
          return checker;
   
  }

  return (
 
    
      
      <div className="">
        <div className="">
          <div className="card">
            
            <div className="card-body">
                  <form style={{padding: 21}} onSubmit={userLogin}>
                    <div className="">
                    <div id="checker" className="col-md-12" style={{display:'none'}} >
                          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">Username or password mismatch</span>
                        </button>
                    </div>
                    <label>Username</label>
                      <input type="text" className="form-control" id="username" placeholder="username"/>
                      
                    </div>
                    <div className="">
                      <label >Password</label>
                      <input type="password" className="form-control" id="password" placeholder="password"/>
                    </div>
                   
                    <div className="form-group" style={{marginTop:10,marginBottom:'3em'}}>
                      <input type="submit" value="Login" className="col-md-12 btn float-right login_btn"/>
                    </div>
                  </form>
            </div>
            
          </div>
        </div>

      </div>
  );
}

export default Login;
