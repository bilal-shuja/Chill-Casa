import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';


function getAllCategories(){
    const getCategories =   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_category`)
       return getCategories;
  }


  function therapistCategoryForm(formdata){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_category`, formdata)
    .then((res)=>{
      toast.info("Category Submitted!", {theme:"dark"})
      
    })
    .catch((error)=>{
      console.log(error)
      if(error.data.status === "401"){
      toast.warn(error.data.message,{theme:"dark"})
    }
    else{
      toast.warn("Something went wrong",{theme:"dark"})
    }
   
  })
  
  }


  const useTherapistCategory = ()=>{
    return useMutation(therapistCategoryForm)
}


  const therapistCategoryEndPoint = {
    getAllCategories,
    useTherapistCategory
  }

  export default therapistCategoryEndPoint;