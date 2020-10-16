import React, { useState } from 'react';
import Pic from '../img/pic.jpg'
import Logo from '../img/name_logo.png'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NavBar from './NavBar'

function Dashboard() {
  const [editorContent,setEditorContent]=useState(EditorState.createEmpty())
  function postArticle(e){
    e.preventDefault()
  }

  function onContentStateChange(e){
    setEditorContent(e)
    console.log(e)
  }
  
 function savePost(e){
    e.preventDefault
  }
    return(
        <div style={{backgroundColor:'#f4f3ef',height:'100vh'}} id="textcontent">
        <NavBar/>
        
        <div className="col-md-3" style={{padding:0}}>
         </div>
        <div className="col-md-6" style={{padding:0}}>
        <div className="">
            <div className="card card-user">
              <div className="card-header">
                <h5 className="card-title">Add a Post</h5>
              </div>
              <div className="card-body">
                <form onClick={savePost}>
                
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Post Title</label>
                        <input type="text" className="form-control" placeholder="Title here"/>
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
                          
                         
                        />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="update ml-auto mr-auto text-center" >
                      <button type="submit" className="btn btn-primary btn-round">Update Profile</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        
        </div>
        <div className="col-md-3" style={{padding:0}}>
        
        </div>

      </div>
    )

}
export default Dashboard;