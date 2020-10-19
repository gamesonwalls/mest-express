import React,{useContext, useState,useEffect} from 'react';
import $ from "jquery";
import axios from 'axios'
import users from './user.json'

import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory  } from 'react-router-dom';
import  {useLogin} from './context/LoginContext';

import RightSidebar from './RightSidebar';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Sidebar from './Sidebar'
import { AiFillFacebook as Facebook, AiFillTwitterSquare as Twitter,AiFillLinkedin as LinkedIn } from 'react-icons/ai';
import { IoMdSend as SendIcon } from 'react-icons/io';
import { BiLike as Like,BiDislike as DisLike,BiUser as UserImage } from 'react-icons/bi';


import ThemeContext from './context/ThemeContext';

import  {useCount} from './context/VoteContext';

function Article(props) {

    const history = useHistory()
  const { dark } = useContext(ThemeContext);
 const {  countLike,countDisLike,fireLikes,fireDisLikes} = useCount();

 const [commentToDisplay,setcommentToDisplay]=useState([])
  console.log("Props from Article",props.location.state['data'])
  console.log("data ",props.location.state['data'].content['blocks'][0].text)
  
  useEffect(() => {
    getAllComments()
   
  }, []);
//   var s = my;
// var htmlObject = document.createElement('div');
// htmlObject.innerHTML = s;
// htmlObject.getElementById("myDiv").style.marginTop = something;

//   var parser = new DOMParser();
// var htmlDoc = parser.parseFromString(my, 'text/html');

function saveComment(e){
    e.preventDefault()
    let commentsInfield=document.getElementById('commentsInfield').value;
    axios.post('http://localhost:5000/api/saveComment',{id:props.location.state['data'].id,comment:commentsInfield})
    .then(response => {
        
     console.log("getGroups",response.data)
        if(response.data==='saved'){
            //history.go(0)
           // alert('Comment saved');

            getAllComments()

        }
     }).catch(function (error) {
       console.log(error);
           

     })
}

function getAllComments(){
       

        axios.get('http://localhost:5000/api/getComment',{
            params:{
            id:props.location.state['data'].id
        }
    
        })
        .then(response => {

        let commentToDisplay=response.data.map((r,index)=>{

            return <li key={index}>
                <div class="comment-main-level">
                
                    <div class="comment-avatar"><UserImage style={{fontSize:'4em'}}/></div>
                
                    <div class="comment-box">
                        <div class="comment-head">
                            <h6 class="comment-name"><a href="http://creaticode.com/blog">Anonymous</a></h6>
                            <span></span>
                            <i class="fa fa-reply"></i>
                            <i class="fa fa-heart"></i>
                        </div>
                        <div class="comment-content">
                        {r}
                        </div>
                    </div>
                </div>
            </li>

        })

        setcommentToDisplay(commentToDisplay)
        document.getElementById('commentsInfield').value=''
        
         }).catch(function (error) {
           console.log(error);
               
    
         })
}

  return (
 
    
      <div style={{backgroundColor:'#f4f3ef'}}>
            <div className="col-md-3" >
                 <Sidebar/>
            </div>
      
            <div className="col-md-9 ">
           
  
                        <div className="col-md-9">
                                    <div id="Article">
                                <h1>
                                {props.location.state['data'].post_title}
                                
                                </h1>
                                <div id="textcontent">

                                {props.location.state['data'].content['blocks'][0].text}
                                </div>
                                
                                <span><button className="btn btn-default" onClick={fireLikes}><Like style={{fontSize:'3em'}}/></button>{countLike}</span> <span ><button className="btn btn-default" onClick={fireDisLikes}><DisLike style={{fontSize:'3em'}}/></button>{countDisLike}</span>
                                        <div>
                                        <div><b>Share it</b></div>
                                            <Facebook style={{fontSize:'3em'}} className={`icon ${!dark ? 'facebook' : ''}`}/>
                                            <Twitter style={{fontSize:'3em'}}className={`icon ${!dark ? 'twitter' : ''}`}/>
                                            <LinkedIn style={{fontSize:'3em'}}className={`icon ${!dark ? 'linkedin' : ''}`}/>
                                        </div>
                                    
                                    <hr/>
                        </div>

                          <div className="col-md-12">
                                <h4>Comments</h4>

                     

                                <div className="comments-container">
                                

                                    <ul id="comments-list" class="comments-list">
                                        

                                       {commentToDisplay}
                                        
                                    </ul>
                                </div>
                                
                          
                                <form onSubmit={saveComment}>
                                <div className="col-md-11 card">
                                
                                
                                <textarea  class="form-control textarea" placeholder="Enter Comments here" id="commentsInfield" required style={{border:'none'}}></textarea>

                                </div>
                                <div className="col-md-1 card" style={{height:'4.5em'}}>
                                    <button  style={{background: "none",border: "none",height:'4.5em'}}><SendIcon  style={{fontSize:'3em',marginTop: '0.4em'}} className={`icon ${!dark ? 'sendIcon' : 'sendIcon'}`} /></button>
                                </div>
                                
                                </form> 
                            </div>  
                        </div>
                        
                            
                        <div className="col-md-3">
                            <RightSidebar/>
                        </div>
            </div>
            

      </div>
  );
}

export default Article;
