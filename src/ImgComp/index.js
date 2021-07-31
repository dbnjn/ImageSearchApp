
import React,{useState,useEffect} from "react"
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import {BaseUrl,API_KEY} from "../apis";




const ImageDisplayComp=(props)=>{



const [images,setImages]=useState([]);
const [isValue,setIsValue]=useState(true)

useEffect(() => {
  
 const getApiData=async()=>{

     try {
        const apiData = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1`);
       
        if(apiData !=="" && apiData!== null && apiData!== undefined){
            setImages(apiData.data.photos)
            setIsValue(false)
        }
        
      
     } catch (error) {
       return error;  
     }
    
 }   

 getApiData();
}, [])

if(isValue){
    return(
        <>
        
        <CircularProgress/>
        </>
    )
}else{
    return (
        <>
      {props.imgdata===null ? 
     <div className="image-gallery">
           
     {images?.photo?.map((value)=>{
        
         return(
             <div>
                <img src={`${BaseUrl}/${value.server}/${value.id}_${value.secret}_w.jpg`} alt=""/>
             </div>
         )
     })}
            
        </div>:   <div className="image-gallery">
        <div>
                <img src={`${BaseUrl}/${props.imgdata.server}/${props.imgdata.id}_${props.imgdata.secret}_w.jpg`} alt=""/>
             </div>
        </div> 
    }
      
        </>
    )
}




}
export default ImageDisplayComp;