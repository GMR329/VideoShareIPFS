import React, {
  useState
} from 'react';
import {
  Buffer
} from 'buffer';
import {
  create
} from "ipfs-http-client";
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



const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create('http://localhost:3000')



//connect deamon to API server


//const client = create('https://ipfs.infura.io:5001/api/v0');
//const client = create() // (the default in Node.js)

//eventually we want to stop using infura api and make it al localhost ipfs node




function App() {
  const [z, setZ] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [embeddedVideos, setEmbeddedVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [url, setURL] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [searchURL, setSearchURL] = useState("");
  const [textField, setTextField] = useState("");

  function getFileFromComputer(e) {

    var localFile = e.target.files[0];
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
      // const buf = buffer.Buffer(fileReader.result)
      setFile(Buffer(fileReader.result));
      console.log("This is data in file : ", Buffer(fileReader.result));
      console.log("absolute path : ", );
    }


    e.preventDefault();
  }
  async function uploadButtonHandler(event) {
    event.preventDefault();
    try {
      if ((fileType.toLowerCase()).includes("video")) {


        console.log("Uploading file to IPFS", fileType);

        // const uploadedFile = await ipfs.add(fileType);
       const [fileUrl, updateFileUrl] = useState(``)
        const file1 = e.target.files[0]
       const uploadedFile = await ipfs.add(file1)
          const url = `ipfs://${added.path}`
          //updateFileUrl(url)

         // console.log('Error uploading file: ', )
        }
        console.log("This is the uploaded file : ", uploadedFile);
        //this is where we actually add it to ipfs 
        console.info(uploadedFile);

        var fullLink = 'https://ipfs.io/ipfs/' + uploadedFile.path;
        var fullLink = uploadedFile.path;


        var videoData = {
          //   link:fullLink,
          name: fileName

        };
        setUploadedVideos(old => [...old, videoData]);
        // setURL(fullLink);
        console.log(url);

      } else {
        alert("Please Upload a Video File");
      }



    } catch (err) {
      console.log(err.message);
    }
  }




  function embedVideo() {

    setEmbeddedVideos(oldArray => [...oldArray, textField]);

  }

  const buttonStyle = {
    backgroundColor: "gray",
    color: "black",
    fontSize: "25px",
    fontFamily: "Montserrat",
    padding: "5px",
    marginLeft: "80px",
    marginRight: "80px",
    border: '7px solid darkred',

    padding: "10px"

  };
  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };
  const innerDivStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
  const fileInputStyle = {
    backgroundColor: "gray",
    color: "black",
    fontSize: "20px",
    fontFamily: "Montserrat",
    padding: "5px",
    marginLeft: "80px",
    marginRight: "80px",
    border: '8px solid darkred',
    padding: "10px"


  };
  const formStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "80px",
    marginRight: "80px",


  };

  const TitleStyle = {
    fontSize: "50px",

    padding: "10px",
    color: "black",
    fontFamily: "Montserrat",


  };
  const fetchDivStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"

  };
  const innerFetchDivStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"

  };


  const uploadInfoStyle = {

    padding: "10px",
    marginLeft: "80px",
    marginRight: "80px",

  };
  const secondHeaderStyle = {
    fontSize: "30px",
    padding: "10px",
    marginLeft: "80px",
    marginRight: "80px",

  }

  const bottomFormStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "0px"

  };
  const fetchVideoStyle = {
    backgroundColor: "black",
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "20px",
    padding: "5px",
    marginLeft: "80px",
    marginRight: "80px",
    border: '5px solid darkred'

  }



  return (

      <
      div style = {
        divStyle
      } >
      <
      span style = {
        TitleStyle
      } > Upload and Embed Video By IPFS < /span> <
      form style = {
        formStyle
      } >

      <
      input style = {
        fileInputStyle
      }
      type = "file"
      onChange = {
        getFileFromComputer
      }
      /> <
      button style = {
        buttonStyle
      }
      className = 'uploadFileButton'
      type = "submit"
      onClick = {
        uploadButtonHandler
      } > Upload file < /button>

      <
      /form>

      <
      h3 style = {
        {
          color: "black"
        }
      } > This Is Info Of The File You Selected: < /h3> <
      div style = {
        innerDivStyle
      } >
      <
      h4 style = {
        uploadInfoStyle
      } > File Name: {
        fileName
      } < /h4> <
      h4 style = {
        uploadInfoStyle
      } > File Type: {
        fileType
      } < /h4> <
      h4 style = {
        uploadInfoStyle
      } > File Size: {
        fileSize
      } < /h4> <
      h5 style = {
        uploadInfoStyle
      } > URl of Uploaded File: {
        url
      } < /h5> <
      /div>


      <
      div className = 'fetchDiv'
      style = {
        fetchDivStyle
      } >
      <
      div style = {
        innerFetchDivStyle
      } >
      <
      span style = {
        secondHeaderStyle
      } > Enter URL of Video To Fetch < /span>

      <
      input style = {
        {
          width: "400px"
        }
      }
      type = "text"
      onChange = {
        e => setTextField(e.target.value)
      }
      />


      <
      button style = {
        buttonStyle
      }
      className = 'Fetch Video'
      type = "submit"
      onClick = {
        () => embedVideo()
      } > Embed < /button> <
      /div> <
      div style = {
        innerFetchDivStyle
      } >
      <
      span style = {
        secondHeaderStyle
      } > Videos You Have Aldready Uploaded < /span> <
      select onChange = {
        (e) => setDropdown(e.target.value)
      } >
      <
      option value = {
        "Select Video to Embed"
      } > Select Video To Embed < /option> {
        uploadedVideos.map(elem => < option value = {
              elem.link
            } > {
              elem.name
            } < /option>)
          }

          <
          /select>




          <
          button onClick = {
            () => setEmbeddedVideos(oldArr => [...oldArr, dropdown])
          }
        style = {
          buttonStyle
        }
        className = 'Embed Video'
        type = "submit" > Embed < /button> <
          /div> <
          /div>

        {
          embeddedVideos.map(elem => < ReactPlayer controls = {
              true
            }
            url = {
              elem
            }
            />)} <
            button onClick = {
              () => console.log(dropdown)
            } > test < /button>


            <
            /div>

          );

        }
        export default App;