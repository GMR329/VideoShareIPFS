import React, {
  useState
} from 'react';
import {
  Buffer
} from 'buffer';
// import {
//   create
// } from "ipfs-http-client";
import {
  scryRenderedComponentsWithType
} from 'react-dom/test-utils';
import {
  Alert
} from 'react-alert'
import {
  saveAs
} from "file-saver";
import axios from 'axios'
import fileDownload from 'js-file-download'
import VideoPlayer from "react-video-js-player";
import ReactPlayer from 'react-player';
//important import for ipfs functunality 
//import { create} from 'interface-ipfs-core'
//import * as IPFS from 'ipfs-core'
// const IPFS = require('ipfs')
import {create,map} from 'ipfs'
//import {files} from 'ipfs'



//const IPFS = require('ipfs-core')


const all = require('it-all')










// const ipfsClient = require('ipfs-http-client');
// const ipfs = await IPFS.create()


//connect deamon to API server


//const client = create('https://ipfs.infura.io:5001/api/v0');
//const client = create() // (the default in Node.js)

//eventually we want to stop using infura api and make it al localhost ipfs node



//Consider

function App() {
  const [z, setZ]=useState([]);
  const [uploadedVideos,setUploadedVideos]=useState([]);
  const [embeddedVideos, setEmbeddedVideos]=useState([]);
  const[file,setFile]=useState(null); 
  const[fileName,setFileName]=useState("");
  const[fileType,setFileType]=useState("");
  const[fileSize,setFileSize]=useState("");
  const[cid,setCID]=useState("");
  const [dropdown,setDropdown]=useState("");
  const[searchURL,setSearchURL]=useState("");
 const[textField,setTextField]=useState("");
 const [ipfs, setIpfs] = useState(null);
//getter and setter for ipfs

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
  let node = ipfs;

 event.preventDefault();


 

 console.log("anwe",file)

 try {
   if((fileType.toLowerCase()).includes("video")){
    try {

    //const run = async (file) => {
      if (!ipfs) {
node = await create();
setIpfs(node);
      }
      const id = await node.id()
      //  await node.files.write('/' + file.name, file, { create: true })
      


      console.log("ffffffffile",file)
      const result = await node.add(file)


// const rootDirectoryContents = []
// for await (const file of node.files.ls('/')) {
//      rootDirectoryContents.push(file)
//}
      // console.log("rdc",rootDirectoryContents)
      // const directoryStatus = await node.files.stat('/')
      

      //return directoryStatus
  //  }
    console.log("fun::::",result.cid)
    // const text = []

    // for await (const chunk of node.cat(result.cid)) {
    //   text.push(chunk)
    // }
    
const cidd = result.cid
     setCID(cidd.toString())
   console.log("cidd",cid)

   
    }
    catch(e){
      console.log("error",e)
    }

    
    
    //   console.log("root dir", ipfs.files.stat('/'))
    // for (let file1 of file ) {
    //   await ipfs.files.write('/'+ file1.name, file1, {create: true})
    //   console.log("name::" ,'/'+ file1.name)

     // console.log("apaths" ,runin)
    
    
// Store data outside your user directory
//const uploadedFile = await IPFS.create({ file})
     // const uploadedFile = await ipfs.add(file);
      //this is where we actually add it to ipfs 
     /// console.log(file1.path);
  //  }
      var fullLink='https://ipfs.io/ipfs/'+cid;

      var videoData= {
         link:fullLink,
         name:fileName,
         cid:cid

      };
      setUploadedVideos(old => [...old, videoData]);
      setCID(fullLink);

    
   }
         
         else{
alert("Please Upload a Video File");
         }
        
 
       
 } catch (err) {
   console.log(err.message);
 }
}




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
        <h5 style={uploadInfoStyle}> URl of Uploaded File: {cid}</h5>
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