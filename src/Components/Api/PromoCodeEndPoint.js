import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';

function getAllPromoCodes(){
    const getPromos =   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_promocodes`)
       return getPromos;
  }

  function promoCodeSubmission(formdata){
    axios.post(`${process.env.REACT_APP_BASE_URL}post_promo_code`, formdata)
    .then((res)=>{
      if(res.data.status === '200'){
       toast.info("Promo Code Info Submit!", {theme:"dark"})
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


const usePromoCodeSubmission = () =>{
 return useMutation(promoCodeSubmission)
}


  const PromoCodeEndPoint = {
    getAllPromoCodes,
    usePromoCodeSubmission
  }
  

  export default PromoCodeEndPoint;