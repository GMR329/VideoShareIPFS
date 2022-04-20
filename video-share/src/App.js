import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { create } from "ipfs-http-client";

import ReactPlayer from 'react-player';


const client = create('https://ipfs.infura.io:5001/api/v0');



async function main () {
  // Create IPFS instance
  const ipfsOptions = { repo : './ipfs', }
  const ipfs = await IPFS.create(ipfsOptions)

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs)
  }


function App() {

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

      var videoData= {
         link:fullLink,
         name:fileName

      };
      setUploadedVideos(old => [...old, videoData]);
     setURL(fullLink);
     console.log(url);
        
  } catch (err) {
    console.log(err.message);
  }

}
  


 function embedVideo(){
 
   setEmbeddedVideos(oldArray => [...oldArray, textField]);

 }



  }
  const buttonStyle = {
  backgroundColor: "black",
  color:"white",
  fontSize:"25px",
  fontFamily:"Montserrat",
  padding:"5px",
  borderRadius:"10px",
  margin:"20px",
  border: '5px solid rgba(0, 255, 0, .5)',
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
    backgroundColor: "black",
    color:"white",
    fontSize:"20px",
    fontFamily:"Montserrat",
    padding:"5px",
    margin:"20px",
    border: '5px solid rgba(255, 0, 0, .5)',
    padding:"10px"

    

  };

  

  const TitleStyle={
  fontSize:"50px",
  border: '5px solid rgba(0, 0, 255, .5)',
  padding:"10px"


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
  margin:"80px",
  border: '5px solid rgba(0, 0, 255,.6)'


};
const secondHeaderStyle={
  fontSize:"30px",
  border: '5px solid rgba(0, 255, 0, .5)',
  padding:"10px"


}
    



const fetchVideoStyle={
  backgroundColor: "black",
  color:"white",
  fontFamily:"Montserrat",
  fontSize:"20px",
  padding:"5px",
  margin:"20px",
  border: '10px solid rgba(255, 0 0, .5)'


}



  
    return (

      <div style={divStyle}>
        <span style={TitleStyle} >Upload and Embed Video By IPFS</span>
       
          <input style={fileInputStyle} type="file"  onChange={getFileFromComputer}  />
          <button style={buttonStyle}className='uploadFileButton' type="submit" onClick={uploadButtonHandler} >Upload file</button>
          


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
        <button onClick={()=>console.log(dropdown)}>test </button>

     

      </div>
    
    );
  
}


export default App;
