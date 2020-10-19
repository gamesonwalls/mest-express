import React, { useState,useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NavBar from './NavBar'
import axios from 'axios'

import { BiEdit,BiTrash } from 'react-icons/bi';

import  {useLogin} from './context/LoginContext';

import { useHistory  } from 'react-router-dom';

function Dashboard () {
  let history = useHistory();

  const [editorContent,setEditorContent]=useState(EditorState.createEmpty())
  const [allPosts,setallPosts]=useState([])
  const [editallPosts,seteditallPosts]=useState([])

  const {isLogin}=useLogin()

  useEffect(() => {
    getAllPosts()
  //  setTimeout(function(){
  //     setisLoading(false)
  //  },2000)
    if(isLogin===true){
      
    }else{
      history.push('/Login')
    }
   
  }, []);
  function postArticle(e){
    e.preventDefault()
  }

  function onContentStateChange(e){
    setEditorContent(e)
   // e.preventDefault()
    console.log(e)
  }
  
 function savePost(e){
    e.preventDefault()

    let post_title=document.getElementById('post_title').value;

        axios.post('http://localhost:5000/api/savePost/',{post_title:post_title,content:editorContent})
        .then(response => {
            console.log(response);
            if(response.data==='Updated'){
              alert('')
              getAllPosts()
            }
           

          }).catch(function (error) {
          console.log(error)

          });
  }

  function getAllPosts(){
   
    axios.get('http://localhost:5000/api/getAllPosts/')
    .then(response => {
        console.log(response);
        setallPosts(response.data)

       let returnData= response.data.map((r,index)=>{
            return  <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{r.post_title}</td>
                      <td><button className="btn btn-default"><BiEdit/>Edit</button> <button className="btn btn-danger"><BiTrash/>Delete</button></td>
                    </tr>
        })
        seteditallPosts(returnData)
     

      }).catch(function (error) {
      console.log(error)

      });
  }
  
    return(
        <div style={{backgroundColor:'#f4f3ef',height:'100vh'}} id="textcontent">
        <NavBar/>
    <div className="row" style={{backgroundColor:'#f4f3ef'}}>   
        <div className="col-md-3" style={{padding:0}}>
         </div>
        <div className="col-md-6" style={{padding:0}}>
        <div className="">
            <div className="card card-user">
              <div className="card-header">
                <h5 className="card-title">Add a Post</h5>
              </div>
              <div className="card-body">
                <form onSubmit={savePost}>
                
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Post Title</label>
                        <input type="text" className="form-control" placeholder="Title here" id="post_title" required/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                        <Editor
                            
                            initialEditorState={editorContent}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          image={{previewImage:true,inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'}}
                          onContentStateChange={onContentStateChange}
                          wrapperStyle={{border:'1px solid #eeeeee'}}
                          
                          required
                        />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="update ml-auto mr-auto text-center" >
                      <button type="submit" className="btn btn-primary btn-round">Add Post</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>  

            <div className="card" style={{marginBottom:10,padding:10}}>
            <h2 className="text-center">All Posts</h2>
            <hr/>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Post Title</th>
                    <th scope="col">Action</th>
                   
                  </tr>

                  {editallPosts}
                </thead>
                <tbody>
                 
                 
                </tbody>
              </table>
            </div>
        
        </div>
        <div className="col-md-3" style={{padding:0}}>
        
        </div>
      </div>
      </div>
    )

}
export default Dashboard;