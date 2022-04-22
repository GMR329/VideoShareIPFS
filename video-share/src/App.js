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

 /*
Authors:Bryce Manley,Pranav Rajan , and Garreth Rice

Discription:
With this Program the user will be able to upload a video file, have that video file  hosted and pinnned to ipfs, The user will be able to enter the url
 of oother videos they are able to fetch and watch, as well as have information posted about the video they are watching. such as file size, the video url, and file name. 
 The user is able to watch multiple videos at the same time. from our site or from others.

 This is the main component of the application. It is the first component that is rendered. It handles all IPFS operations
and renders the video player. and all layouts. We are utilizing react.js for the frontend, and ipfs/infura for all networking. Givin more time 
we would have used orbitDB for the database, but given orbitdb is still in alpha, and the documentation is significantly worse than ipfs it would not
be feasable to have that done in a semester. There has been some research  done into orbitdb which is noted in dome of the text files attached to the 
project.


 */






 //creates ipfs client for this we are using infura api 
 //much time wass spent trying to not use infura and use default 
 //ipfs node but the documentation with ipfs in still in alpha stages
 //so we would have to start rolling back features to do that
 const client = create('https://ipfs.infura.io:5001/api/v0');


 function App() {

//creates getters ant setters esentally
   const [z, setZ]=useState([]);
   const [uploadedVideos,setUploadedVideos]=useState([]);
   const [embeddedVideos, setEmbeddedVideos]=useState([]);
   const[file,setFile]=useState(null);
   const[fileName,setFileName]=useState("");
   const[fileType,setFileType]=useState("");
   const[fileSize,setFileSize]=useState("");
   const[url,setURL]=useState("");
   const [dropdown,setDropdown]=useState("");
   const[searchURL,setSearchURL]=useState("");
  const[textField,setTextField]=useState("");

  function getFileFromComputer(e) {
//this is the code that allows the user to upload their file
    var localFile=e.target.files[0];
  setFileName(localFile.name);
  setFileType(localFile.type);
  setFileSize(localFile.size);
  //console.log(localFile.type);

  const fileReader = new window.FileReader();
  //openes the file reader
  fileReader.readAsArrayBuffer(localFile);
  fileReader.onloadend = () => {
    setFile(Buffer(fileReader.result));
    //the dafault file reader.result does not putput in a format that is readable to ipfs or infura
    //so we need to convert it to a buffer
   // console.log("This is data in file : ", Buffer(fileReader.result));
  }


  e.preventDefault();
  }
async function uploadButtonHandler(event){
  event.preventDefault();
  try {
    //checks if the file is a video if it is not ask for a video
    if((fileType.toLowerCase()).includes("video")){

      //most important line in the program the .add is an ipfs/infura api call 
      //which hosts the file using ipfs. It calls client of that add api call 
      //in this case the client is esentally a server run by infure but hopefully we can eventually 
      //make that be ipfs running on a local node the await keyword is spacific to js 
      //it waits for the function to finish before moving on esentally 
      //the function returns a address or cid to the file
       const uploadedFile = await client.add(file);


       //this is the link that is generated if we were
       var fullLink='https://ipfs.infura.io/ipfs/'+uploadedFile.path;

      // used to display information about the video file
       var videoData= {
          link:fullLink,
          name:fileName

       };

       //this is causing a councole error needs to be fixed evautually
       setUploadedVideos(old => [...old, videoData]);
       
      setURL(fullLink);
      //console.log(url);

          }
          else{
alert("Please Upload a Video File");
          }



  } catch (err) {
    console.log(err.message);
  }
}



//
  function embedVideo(){

    setEmbeddedVideos(oldArray => [...oldArray, textField]);

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
   const fetchDivStyle={
     display: "flex",
     flexDirection: "row",
     alignItems:"center",
     justifyContent:"center"

   };
   const innerFetchDivStyle={
     display: "flex",
     flexDirection: "column",
     alignItems:"center",
     justifyContent:"center"

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


      <div className='fetchDiv' style={fetchDivStyle}>
       <div style={innerFetchDivStyle}>
         <span style={secondHeaderStyle}>Enter URL of Video To Fetch</span>

        <input style ={{width:"400px"}} type="text"  onChange={e => setTextField(e.target.value)}  />


        <button style={buttonStyle}className='Fetch Video' type="submit" onClick={()=>embedVideo()} >Embed</button>
        </div>
        <div style= {innerFetchDivStyle}>
        <span style={secondHeaderStyle}>Videos You Have Aldready Uploaded</span>
        <select onChange={(e)=>setDropdown(e.target.value)} >
        <option value={"Select Video to Embed"}>Select Video To Embed</option>
           {
             uploadedVideos.map(elem =>  <option value={elem.link}>{elem.name}</option>)
           }

           </select>




           <button onClick ={()=>   setEmbeddedVideos(oldArr => [...oldArr, dropdown])  }style={buttonStyle}className='Embed Video' type="submit" >Embed </button>
        </div>
        </div>

        {embeddedVideos.map(elem =>  <ReactPlayer controls={true} url={elem}/>)}


       </div>

    );

}
export default App;
