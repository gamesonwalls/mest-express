import React,{useState} from 'react';

import Login from '../Login'

function Home() {

  const [city,setCity]=useState('Accra,Ghana')
  const [temperature,setTemperatur]=useState('27°C');
  const [weatherIcon,setWeatherIcon]=useState('https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png')
  const [date,setDate]=useState('06-10-2020');
  // const [userSearch,setuserSearch]=useState('Search with a City or Country')
  return (
    <div className="">
    
<div className="jumbotron " style={{backgroundImage: `url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg')`,
backgroundSize: "cover",
backgroundRepeat: "no-repeat",
height: '100vh',overflow:'hidden'}}>

          <div className="col-md-8">
               <h1 style={{color:'white'}}>Weather App</h1>
              

               <div className="col-md-12">
                       <div className="col-md-4"></div>

                        <div className="col-md-4">
                                <div id="city_country" style={{textAlign:'center',color:'white'}}>{city}</div>
                                <div id="dates" style={{textAlign:'center',color:'white'}}>{date}</div>

                                <div className="col-md-2"></div>


                                <div className="col-md-8">
                                    <span id="weatherIcon" className="img-responsive centre-block"><img alt="weather icon" src={weatherIcon} /></span>
                                    <div id="temperature" style={{fontSize:57,color:'white'}}>{temperature}</div>
                                </div>
                                <div className="col-md-2"></div>
                                  
                        </div>
                              
                        <div className="col-md-4"></div>

               </div>

                <form className="col-md-12" >
                    <div className="input-group">
                        <input type="text" className="form-control" id="search"  style={{height: 56}} placeholder="Search for..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="submit" style={{height: 56}}>Go!</button>
                        </span>
                    </div>
                </form>

          </div> 

          <div className="col-md-4">
                <Login/>
            
          </div> 

        </div>
      
    </div>
  );
}

export default Home;
