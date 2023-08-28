import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';


function fetchChillCasaTotalRevenue(){
    return axios.post(`${process.env.REACT_APP_BASE_URL}admin-amount`)
  }

  function fetchTherapistTotalRevenue(){
    return axios.post(`${process.env.REACT_APP_BASE_URL}total_therapist_revenue`)

  }

  function fetchChillCasaExpenses(){
    return axios.post(`${process.env.REACT_APP_BASE_URL}expenses-amount`)

  }

  

  const ReportEndPoints = {

    fetchChillCasaTotalRevenue,
    fetchTherapistTotalRevenue,
    fetchChillCasaExpenses

  }

  export default ReportEndPoints;