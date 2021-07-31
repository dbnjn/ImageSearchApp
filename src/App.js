
import React,{useState} from "react";
import './App.css';
import ImageDisplayComp from "./ImgComp";

import Navbar from "./navbar/navbar"

function App() {

const[imgData,setImgData]=useState(null)



const handleCallback = (childData) =>{
  setImgData(childData)
}


  return (
    <div className="App">
    <Navbar parentCallback={handleCallback}/>
     <ImageDisplayComp imgdata={imgData}  />
    </div>
  );
}

export default App;
