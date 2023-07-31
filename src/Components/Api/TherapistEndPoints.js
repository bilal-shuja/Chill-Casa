import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';



function getAllTherapists(pages){
 return   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_therapists?page=${pages}`)     
}

function getAllAvailableTherapists(formattedDate){
  const dateObj ={
    date :formattedDate
  }
    return axios.post(`${process.env.REACT_APP_BASE_URL}getTimeslotsByDate`,dateObj)

}


const  getAvailableTherapistsByDate = async (checkByDate) => {
  const dateObj ={
    date :checkByDate
  }
  const getAvailableTherapistByDate = await axios.post(`${process.env.REACT_APP_BASE_URL}fetchbookings_withdate`,dateObj)
  return getAvailableTherapistByDate;


}


function regTherapist(formdata){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_therapist`, formdata)
    .then((res)=>{
      console.log(res)
      if(res.data.status === '200'){
        toast.info("Therapist Registered", {theme:"dark"})
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

function chnagetherapistStatus({stateID , therapistStatus}){
const statusObj ={
  status:therapistStatus
}
  axios.post(`${process.env.REACT_APP_BASE_URL}update_therapist_status_byid/${stateID}`, statusObj)
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




const useRegTherapist = ()=>{
    return useMutation(regTherapist)
}

const useAvailableTherapistsByDate = ()=>{
  return useMutation(getAvailableTherapistsByDate)
}

const useTherapistStatus = ()=>{
  return useMutation(chnagetherapistStatus)
}



const TherapistEndPoint = {
  getAllTherapists,
  getAllAvailableTherapists,
  getAvailableTherapistsByDate,
  useRegTherapist,
  useAvailableTherapistsByDate,
  useTherapistStatus
}

export default TherapistEndPoint;