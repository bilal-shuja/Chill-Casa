import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';


function getAllCategories(){
  return  axios.post(`${process.env.REACT_APP_BASE_URL}fetch_category`)
  }


  function therapistCategoryForm(formdata){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_category`, formdata)
    .then((res)=>{
      toast.info("Service Submitted!", {theme:"dark"})      
    })
    .catch((error)=>{
  
      toast.warn("Something went wrong",{theme:"dark"})
   
  })
  
  }

  
  function updateTherapistCategoryForm({formdata,ID}){
    axios.post(`${process.env.REACT_APP_BASE_URL}update_category/${ID}`, formdata)
    .then((res)=>{
      toast.info("Service Updated!", {theme:"dark"})      
    })
    .catch((error)=>{
  
      toast.warn("Something went wrong",{theme:"dark"})
   
  })
  
  }

  function deleteTherapistCategory({id,removeTherapistCategorySheet}){
    axios.post(`${process.env.REACT_APP_BASE_URL}delete_category/${id}`)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.error("Service Removed", {theme:"dark"})
        removeTherapistCategorySheet()
        }
       
    })
    .catch((error)=>{
  
      toast.warn("Something went wrong",{theme:"dark"})
   
  })
  }


  const useTherapistCategory = ()=>{
    return useMutation(therapistCategoryForm)
}
const useUpdateTherapistCategory = ()=>{
  return useMutation(updateTherapistCategoryForm)
}

const useDeleteTherapistCategory = ()=>{
  return useMutation(deleteTherapistCategory)
}


  const therapistCategoryEndPoint = {
    getAllCategories,
    useDeleteTherapistCategory,
    useUpdateTherapistCategory,
    useTherapistCategory
  }

  export default therapistCategoryEndPoint;