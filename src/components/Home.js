import React,{useState,useEffect,useContext} from 'react';

import Login from './Login'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Modal } from 'antd';
import $ from "jquery";
import { AiFillFacebook as Facebook, AiFillTwitterSquare as Twitter,AiFillLinkedin as LinkedIn } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import ThemeContext from './context/ThemeContext';
import LoginContext from './context/LoginContext';

import RightSidebar from './RightSidebar';
import NavBar from './NavBar';
// var fs =require('fs');
let storageArray=[]

function closeBootsrapModal(){
  // $("#myModal").modal('hide')
   $('#myModal').hide();
   $(".modal-backdrop").css("position","initial")
}

function Home() {



  const [location,setLocation]=useState(null)
  const [isLogin,setisLogin]=useState(false)
  const [isLoading,setisLoading]=useState(true)
  const [userName,setuserName]=useState(null)
  const [visible,setVisible]=useState(false);
  const [visible2,setVisible2]=useState(false);
  const [visible3,setVisible3]=useState(false);
  const [articles,setArticles]=useState([])


  // const [userSearch,setuserSearch]=useState('Search with a City or Country')
 
  const { dark } = useContext(ThemeContext);


  useEffect(() => {
    setisLoading(true)
    getAllPosts()
   setTimeout(function(){
      setisLoading(false)
   },2000)
   
   
  }, []);

 
  
  function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

  function urlCleaner(title){
   return title.replace(/\s+/g, '-').toLowerCase();
  }
  function getAllPosts(){
   
    axios.get('http://localhost:5000/api/getAllPosts/')
    .then(response => {
        // console.log(response.data[0].content["blocks"][0].text);
       

       let returnData= response.data.map((r,index)=>{

         let descriptionTrunc=truncateString(r.content["blocks"][0].text,120);
         let cleanedUrl=urlCleaner(r.post_title)
        //  let titleUrl='/'+truncateString(r.content["blocks"][0].post_title,60);

            return  <div id={"Article"+index} key={index}>
                      <h1>
                      <Link  to={{
                                pathname: cleanedUrl,
                                state: {
                                  data: r
                                }
                              }}>
                      {r.post_title}
                      </Link>
                      
                      </h1>
                      <div id="textcontent">{descriptionTrunc}</div>
                        <hr style={{width: 134,position: 'absolute'}}/>
                            <div>
                            <div><b>Share it</b></div>
                                <Facebook style={{fontSize:'3em'}}className={`icon ${!dark ? 'facebook' : ''}`}/>
                                <Twitter style={{fontSize:'3em'}}className={`icon ${!dark ? 'twitter' : ''}`}/>
                                <LinkedIn style={{fontSize:'3em'}}className={`icon ${!dark ? 'linkedin' : ''}`}/>
                            </div>
                        
                        <hr/>
                  </div>
        })
       setArticles(returnData)
     

      }).catch(function (error) {
      console.log(error)

      });
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
  
  <div>
         
         <div className="col-md-3">
         <Sidebar/>
         </div>
        

        

      <div className="col-md-9"> 
        <NavBar/>
      
        <div className=" " >


                {isLoading===true && 
                  <div className="col-md-12">
                      
                    <img src="https://cdn.dribbble.com/users/17619/screenshots/2666659/loader.gif" style={{width:80,marginTop:80}} className="img-responsive center-block" alt="loading"/>


                  </div>
                }


                  {isLoading===false && 

                    <div>
                    <div className="col-md-9">
                       
                        {articles} 
                       
                        
                    </div>
                    
                    <div className="col-md-3">
                     <RightSidebar/>
                        
                    </div>

                    </div>
                    
                  }


                

                </div>

              

                  
                      

                   
                  
           
            
              
      </div>
          
  </div>
  );
}

export default Home;
