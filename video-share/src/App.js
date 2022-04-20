import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { create } from "ipfs-http-client";
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Alert } from 'react-alert'
import { saveAs } from "file-saver";
import axios from 'axios'
import fileDownload from 'js-file-download'
import VideoPlayer from "react-video-js-player";
import ReactPlayer from 'react-player';

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const client = create('https://ipfs.infura.io:5001/api/v0');



async function main () {
  // Create IPFS instance
  const ipfsOptions = { repo : './ipfs', }
  const ipfs = await IPFS.create(ipfsOptions)

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs)
  }


function App() {
<<<<<<< HEAD
  main();
  const[file,setFile]=useState(null);
=======
  const [z, setZ]=useState([]);
  const[file,setFile]=useState(null); 
>>>>>>> 2920f455d388f9b8ae4cea79a8fcdbee2557e654
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
  console.log(localFile.type);

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
    if((fileType.toLowerCase()).includes("video")){
     
       
      const uploadedFile = await client.add(file);
      var fullLink='https://ipfs.infura.io/ipfs/'+uploadedFile.path;
     setURL(fullLink);
     console.log(url);
     
          }
          else{
alert("Please Upload a Video File");

          }
         
  
        
  } catch (err) {
    console.log(err.message);
  }

}
  
   

 function print(){
 
   setZ(oldArray => [...oldArray, textField]);

 }


  const buttonStyle = {
  backgroundColor: "gray",
  color:"black",
  fontSize:"25px",
  fontFamily:"Montserrat",
  padding:"5px",
  marginLeft:"80px",
  marginRight:"80px",
  border: '7px solid darkred',
 
  padding:"10px"

  
  };

  const divStyle={
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"center"

  };
  const innerDivStyle={
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",



  }
  const fileInputStyle={
    backgroundColor: "gray",
    color:"black",
    fontSize:"20px",
    fontFamily:"Montserrat",
    padding:"5px",
    marginLeft:"80px",
    marginRight:"80px",
    border: '8px solid darkred',
    padding:"10px"

    

  };
  const formStyle={
  display: "flex",
  flexDirection:"row",
  alignItems:"center",
  marginLeft:"80px",
  marginRight:"80px",


  };
  const TitleStyle={
  fontSize:"50px",
  
  padding:"10px",
  color:"black",
  fontFamily:"Montserrat",




  };
const uploadInfoStyle={

  padding:"10px",
  marginLeft:"80px",
  marginRight:"80px",
  


};
const secondHeaderStyle={
  fontSize:"30px",
  padding:"10px",
  marginLeft:"80px",
  marginRight:"80px",


}
    
const bottomFormStyle={
  display: "flex",
  flexDirection:"column",
  margin:"0px"

};
const fetchVideoStyle={
  backgroundColor: "black",
  color:"white",
  fontFamily:"Montserrat",
  fontSize:"20px",
  padding:"5px",
  marginLeft:"80px",
  marginRight:"80px",
  border: '5px solid darkred'


}

function test(){

  alert(z);
}

  
    return (

      <div style={divStyle}>
        <span style={TitleStyle} >Upload and Embed Video By IPFS</span>
        <form style={formStyle}>
          <input style={fileInputStyle} type="file"  onChange={getFileFromComputer}  />
          <button style={buttonStyle}className='uploadFileButton' type="submit" onClick={uploadButtonHandler} >Upload file</button>
          
        </form>
        <h3 style={  {color:"black"}}>This Is Info Of The File You Selected: </h3>
        <div style={innerDivStyle}> 
        <h4 style={uploadInfoStyle}>  File Name: {fileName} </h4>
        <h4  style={uploadInfoStyle}> File Type: {fileType}</h4>
        <h4 style={uploadInfoStyle}> File Size: {fileSize}</h4>
        <h5 style={uploadInfoStyle}> URl of Uploaded File: {url}</h5>
        </div>

      
        <span style={secondHeaderStyle}>Enter URL of Video To Fetch</span>
    
       <input style ={{width:"400px"}} type="text"  onChange={e => setTextField(e.target.value)}  />
       <button style={buttonStyle}className='Fetch Video' type="submit" onClick={()=>print()} >Fetch File</button>

    

       {z.map(elem =>  <ReactPlayer controls={true} url={elem}/>)}
    
     
    
      </div>
    
    );
  
}


export default App;
