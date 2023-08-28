import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';

function fetchTherapistCommentsById(ID){
    const therpistObj ={
        therapist_id: ID
    }
    return axios.post(`${process.env.REACT_APP_BASE_URL}fetch_comments_by_tid`,therpistObj)

}

function UpdateTherapistComments({ID,therapistCommentObj}){
    axios.post(`${process.env.REACT_APP_BASE_URL}update_therapist_comment_byid/${ID}`, therapistCommentObj)
    .then((res)=>{
      toast.info("Comment Updated!", {theme:"dark"})      
    })
    .catch((error)=>{
  
      toast.warn("Something went wrong",{theme:"dark"})
   
  })
}

function delTherapistComments(ID){
    axios.post(`${process.env.REACT_APP_BASE_URL}delete_therapist_comment/${ID}`)
    .then((res)=>{
      toast.error("Comment Deleted!", {theme:"dark"})
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"})
   
  })
}

const useUpdateTherapistComments = ()=>{
    return useMutation(UpdateTherapistComments)
}

const useDelTherapistComments = ()=>{
    return useMutation(delTherapistComments)
}

const therapistCommentEndPoints = {
    fetchTherapistCommentsById,
    useUpdateTherapistComments,
    useDelTherapistComments
}

export default therapistCommentEndPoints;