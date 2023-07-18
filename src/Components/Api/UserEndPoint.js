import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';


function getAllUsers(){
    const getUsers =   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_users`)
       return getUsers;
  }


  const usersEndPoint = {
    getAllUsers
  }

  export default usersEndPoint;