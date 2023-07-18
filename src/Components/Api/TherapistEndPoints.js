import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';



function getAllTherapists(){
 return   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_therapists`)     
}

function getAllAvailableTherapists(formattedDate){
  const dateObj ={
    date :formattedDate
  }
    return axios.post(`${process.env.REACT_APP_BASE_URL}fetchbookings_withdate`,dateObj)

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
      if(res.data.status === '200'){
        toast.info("Therapist Registered", {theme:"dark"})
        }
        console.log(res.data)
   
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



const TherapistEndPoint = {
  getAllTherapists,
  getAllAvailableTherapists,
  getAvailableTherapistsByDate,
  useRegTherapist,
  useAvailableTherapistsByDate
}

export default TherapistEndPoint;