import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';


function getAllUsers(pages){
    return  axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_users?page=${pages}`) 
  }


  const usersEndPoint = {
    getAllUsers
  }

  export default usersEndPoint;