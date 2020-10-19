import React,{useState,useEffect} from 'react';

import Login from '../Login'
import axios from 'axios'
import { Modal } from 'antd';
import user from '../user.json'

// var fs =require('fs');
let storageArray=[]

function Home() {

  const [location,setLocation]=useState(null)
  const [isLogin,setisLogin]=useState(false)
  const [isLoading,setisLoading]=useState(true)
  const [userName,setuserName]=useState(null)
  const [countries,setCountries]=useState([null])
 
  const [temperature,setTemperatur]=useState(null);
  const [weatherIcon,setWeatherIcon]=useState(null)
  const [date,setDate]=useState(null);

  const [searchResults,setsearchResults]=useState([])

  const [visible,setVisible]=useState(false);
  const [visible2,setVisible2]=useState(false);
  const [visible3,setVisible3]=useState(false);

  // const [userSearch,setuserSearch]=useState('Search with a City or Country')
 

  useEffect(() => {

   setTimeout(function(){
      apiWeather()
     // apiCountries()
   },2000)
   
   
  }, []);

  
  function apiWeather(){

    setisLoading(true)
    const apiKey='ec7d0fcad25a0ade0cc1fb7d61dd869b';

    navigator.geolocation.getCurrentPosition(position=> {

      let queryWord= `${position['coords'].latitude},${position['coords'].longitude}`;
      
    
   console.log("queryWord",queryWord)
    
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${queryWord}`, {
        
      })
      .then(function (response) {
        console.log("Weather Page",response.data);
        setWeatherIcon(`${response.data['current'].weather_icons[0]}`)
        setTemperatur(`${response.data['current'].temperature}°C`);
        setLocation(`${response.data['location'].name} , ${response.data['location'].country}`);
        setDate(`${response.data['location'].localtime}`)
        setisLoading(false)
       // localStorage.clear('userSearchResults');


       
        
      })
      .catch(function (error) {
        console.log(error);
      })

      
    })
     
  }



  function apiWeatherSearch(queryWord){

    setisLoading(true)
    const apiKey='ec7d0fcad25a0ade0cc1fb7d61dd869b';
    
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${queryWord}`, {
        
      })
      .then(function (response) {
        console.log("Weather Page",response.data);
        setWeatherIcon(`${response.data['current'].weather_icons[0]}`)
        setTemperatur(`${response.data['current'].temperature}°C`);
        setLocation(`${response.data['location'].name} , ${response.data['location'].country}`);
        setDate(`${response.data['location'].localtime}`)
        setisLoading(false)

       

       
        

        if(isLogin===true){
       
          storageArray.push({
            weatherIcon:`${response.data['current'].weather_icons[0]}`,
            temperature:`${response.data['current'].temperature}°C`,
            location:`${response.data['location'].name} , ${response.data['location'].country}`,
            date:`${response.data['location'].localtime}`
          })

          localStorage.setItem('userSearchResults',JSON.stringify(storageArray))
          searchUserResult()
         // 

        }

        let userSearchVar= JSON.parse(localStorage.getItem('userSearchResults'))
        console.log("userSearchVar",userSearchVar)

        
      })
      .catch(function (error) {
        console.log(error);
      })
  }

function searchUserResult(){

 

  if(isLogin===true){
    let userSearchVar= JSON.parse(localStorage.getItem('userSearchResults'))

    let OnlyFive= userSearchVar.slice(Math.max(userSearchVar.length - 5, 0))
    // console.log("arr",OnlyFive)
  
  
    let getData= OnlyFive.map((r,index)=>{
       return <tr key={index}>
              <th scope="row">{index}</th>
              <td>{r.location}</td>
              <td>{r.date}</td>
              <td><img src={r.weatherIcon} alt="weaIcon"/></td>
              <td>{r.temperature}</td>
            </tr>
     })
  
     setsearchResults(getData)
  }
 
}
  function apiCountries(){
    
        axios.get(`https://restcountries.eu/rest/v2/all`)
          .then(function (response) {
              console.log("response countries",response.data)
                let collector= response.data.map((r,index)=>{
                    return <option key={index} value={r.name}>{r.name}</option>
                })
                setCountries(collector)

              
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    // function seachWeatherCountry(e){
    //   let search=e.target.value;
    //   apiWeather(search)
    // }

  function handleOk_Cancel() {
   
    setVisible(false)
    setVisible2(false)
    setVisible3(false)
  };

  
 function showModal() {
    setVisible(true)
  };

  function showModal2() {
    setVisible2(true)
  };
  function showModal3() {
    setVisible3(true)
  };

function searchWeather(e){
    e.preventDefault()
   let searchWord= document.getElementById('search').value;
   //Controlling initial user search
 

   //calling api with user search
   apiWeatherSearch(searchWord)
}

function signUpUser(e){
  e.preventDefault()

  let username= document.getElementById('username').value;
  let password= document.getElementById('password').value;
  let conf_password= document.getElementById('conf_password').value;

  if(password===conf_password){
  let user=[]
    user.push( {
      username:username,
      password:password
      }
    )

    localStorage.setItem('users',JSON.stringify(user))
      alert('Sign Up successful')

      let users= JSON.parse(localStorage.getItem('users'));
      console.log("users in system",users)
    //let updatedJSONData = JSON.stringify(user)

  }else{
    alert('password mismatch')
  }
 

}
  return (
  
  
  <div className="">
   
    <nav  className="navbar navbar-default" style={{backgroundColor:'rgba(0, 0, 0, 0.08)',borderColor:'rgba(0, 0, 0, 0.08)',padding: 0,margin:0}}>
  <div  className="container-fluid">



    <div  className="navbar-header">
      <button type="button"  className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span  className="sr-only">Toggle navigation</span>
        <span  className="icon-bar"></span>
        <span  className="icon-bar"></span>
        <span  className="icon-bar"></span>
      </button>
      <a><img  className=""  src="https://img.pngio.com/cloud-cloudy-sun-sunny-weather-icon-weather-icons-png-512_512.png" alt="wea" style={{color:"white",height:90}}/><span style={{fontSize:20}}>SL Weather</span></a>
    </div>

  
    <div  className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    
      {isLogin===false &&  
      <ul  className="nav navbar-nav navbar-right">
        <li><a style={{color:'white'}}>Not Logged in</a></li>
        <li  className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sign In <span  className="caret"></span></a>
          <ul  className="dropdown-menu">
            <li><a onClick={showModal}>Sign In</a></li>
            <li><a onClick={showModal3}>Sign Up</a></li>
            
          </ul>
        </li>
      </ul>
      } 

      {isLogin===true && 
        <ul  className="nav navbar-nav navbar-right">
            <li><a style={{color:'white'}}>Welcome {userName}</a></li>
            <li  className="dropdown">
              <a   className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span  className="caret"></span></a>
              <ul  className="dropdown-menu">
                <li><a onClick={showModal2}>My Search</a></li>
                <li><a >Logout</a></li>
              
                
              </ul>
            </li>
       </ul>
      }
    </div>
  </div>
</nav>
    
<div className=" " >


        {isLoading===true && 
          <div className="col-md-12">
               <img src="https://cdn.dribbble.com/users/17619/screenshots/2666659/loader.gif" style={{width:80,marginTop:80}} className="img-responsive center-block" alt="loading"/>
               <p style={{color:'white',textAlign:'center'}}>Loading</p>

          </div>}


          {isLoading===false && 
          <div className="col-md-12">
               <h1 style={{color:'white'}} className="text-center">Weather App</h1>

               
               <div className="col-md-12">
                       <div className="col-md-4"></div>

                        <div className="col-md-4">
                                <div id="city_country" style={{textAlign:'center',color:'white'}}>{location}</div>
                                <div id="dates" style={{textAlign:'center',color:'white'}}>{date}</div>

                                <div className="col-md-2"></div>


                                <div className="col-md-8">
                                    <div id="weatherIcon"><img alt="weather icon"  className="img-responsive center-block" src={weatherIcon} /></div>
                                    <div id="temperature" style={{fontSize:57,color:'white',textAlign:'center'}}>{temperature}</div>
                                </div>
                                <div className="col-md-2"></div>
                                  
                        </div>
                              
                        <div className="col-md-4"></div>

               </div>

                <form className="col-md-12" onSubmit={searchWeather}>
                    <div className="input-group">
                        <input type="text" className="form-control" id="search"  style={{height: 56}} placeholder="Search for..." required/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="submit" style={{height: 56}}>Go!</button>
                        </span>
                    </div>
                </form>

          </div>}


         

        </div>



            <Modal
                title="Sign In"
                visible={visible}
                onOk={handleOk_Cancel}
                onCancel={handleOk_Cancel}
                  footer={[
              <div></div>
            ]}>
              
              <Login setVisible={setVisible} setisLogin={setisLogin} setuserName={setuserName}/>

            </Modal>


              <Modal
                title="My Search"
                visible={visible2}
                onOk={handleOk_Cancel}
                onCancel={handleOk_Cancel}
                  footer={[
              <div></div>
              ]}
              >

                
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Location</th>
                    <th scope="col">Time</th>
                    <th scope="col">Weather Icon</th>
                    <th scope="col">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults}
                  
                </tbody>
              </table>
            </Modal>


            <Modal
                title="Sign Up"
                visible={visible3}
                onOk={handleOk_Cancel}
                onCancel={handleOk_Cancel}
                  footer={[
              <div></div>
              ]}
              >
              <div className="" style={{overflow: 'hidden'}}>
              <form onSubmit={signUpUser}>
                  <div className="col-md-12">
                    <label>Username</label>
                      <input type="text" className="form-control" id="username" placeholder="username"/>
                      
                    </div>

                    <div className="col-md-12">
                    <label>Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password"/>
                      
                    </div>

                    <div className="col-md-12">
                    <label>Confirm Password</label>
                      <input type="password" className="form-control" id="conf_password" placeholder="Confirm Password"/>
                      
                    </div>
                    <div className="col-md-12">
                    <button type="submit" className=" col-md-12btn btn-success">Sign Up</button>
                    </div>
              </form>
              </div>

              </Modal>
      
    </div>
  );
}

export default Home;
