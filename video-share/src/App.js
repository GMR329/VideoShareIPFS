import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { create } from "ipfs-http-client";

const client = create('https://ipfs.infura.io:5001/api/v0');


function App() {
  const[file,setFile]=useState(null);
  const[fileName,setFileName]=useState("");
  const[fileType,setFileType]=useState("");
  const[fileSize,setFileSize]=useState("");
  const[url,setURL]=useState("");
  const[searchURL,setSearchURL]=useState("");
 const[textField,setTextField]=useState("");

  function getFileFromComputer(e) {
    
    var localFile=e.target.files[0];

  setFileName(localFile.name);
  setFileType(localFile.type);
  setFileSize(localFile.size);

  //  console.log(selectedFile);
  //  setFileName(selectedFile.name);
  //  setFileType(selectedFile.type);
  const fileReader = new window.FileReader();
  fileReader.readAsArrayBuffer(localFile);
  fileReader.onloadend = () => {
    setFile(Buffer(fileReader.result));
    console.log("This is data in file : ", Buffer(fileReader.result));
  }

  
  e.preventDefault(); 

  }

async function uploadButtonHandler(event){
  event.preventDefault();
  try {
    const uploadedFile = await client.add(file);
      var fullLink='https://ipfs.infura.io/ipfs/'+uploadedFile.path;
     setURL(fullLink);
     console.log(url);
        
  } catch (err) {
    console.log(err.message);
  }

}
  
  function print(){
    console.log(textField);
    window.open(textField);


  }
    

  
    return (
      <div >
        <form>
          <input type="file"  onChange={getFileFromComputer}  />
          <button type="submit" onClick={uploadButtonHandler} >Upload file</button>
          
        </form>
        <h3>This Is Info Of The File You Selected: </h3>
        <h4> File Name: {fileName} </h4>
        <h4> File Type: {fileType}</h4>
        <h4> File Size: {fileSize}</h4>
        <h5> URl of Uploaded File: {url}</h5>
       <form>
       <input type="text"  onChange={e => setTextField(e.target.value)}  />
        <button type="submit" onClick={()=>print()} >Fetch Video</button>
       </form>
     

      </div>
    
    );
  
}


export default App;
