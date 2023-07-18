import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';



function sendNotificationSubmission(formdata){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_category_notification`, formdata)
    .then((res)=>{
      if(res.data.status === '200'){
       toast.info("Notfication Send!", {theme:"dark"})
        }
   
    })
  .catch((error)=>{
    if(error.response.data.status === '401'){
      toast.warn(error.response.data.message,{theme:"dark"})
    }
    else{
      toast.warn("Something went wrong",{theme:"dark"})
    }
   
    })
}

const useNotificationSubmission = () =>{
    return useMutation(sendNotificationSubmission)
   }

const SendNotificationSubmissionEndPoint = {
    useNotificationSubmission
  }


  export default SendNotificationSubmissionEndPoint;