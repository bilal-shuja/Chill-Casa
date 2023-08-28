import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';

function getAllUsers(pages){
    return  axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_users?page=${pages}`) 
  }

  function fetchUserWithID(ID){
    return axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
  }


  function fetchAllComments(page){
    return axios.post(`${process.env.REACT_APP_BASE_URL}getAllNotes?page=${page}`)
  }

  function fetchAllUserBookings(pages){
    return axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_bookings?page=${pages}`)
    

  }

  function postAdminComments(adminCommentObj){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_note`,adminCommentObj)
    .then((res)=>{

        toast.info("Comment Submitted",{theme:"dark"})

    })
    .catch((error)=>{
      toast.warn("Something went wrong" , {theme:"dark"})
    })
  }

  function changetherapistStatus({stateID , bookingStatus}){

    const statusObj ={
      status:bookingStatus
    }
      axios.post(`${process.env.REACT_APP_BASE_URL}update_booking_status_byid/${stateID}`, statusObj)
      .then((res)=>{
        if(res.data.status === '200'){
          toast.info("Status Update!", {theme:"dark"})
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

  const useAdminComment = ()=>{
    return useMutation(postAdminComments)
}

const useTherapistBookingStatus = ()=>{
  return useMutation(changetherapistStatus)
}


  const usersEndPoint = {
    getAllUsers,
    fetchAllComments,
    fetchUserWithID,
    fetchAllUserBookings,
    useAdminComment,
    useTherapistBookingStatus
  }

  export default usersEndPoint;