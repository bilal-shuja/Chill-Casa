import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import {toast} from "react-toastify";
import axios from 'axios';


function gettingTicketData(){
    const getTicket = axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_tickets`)
    return getTicket;
}


function gettingOwnReplyOnTicket(ID){
    const ticketID={
        ticket_id:ID
      }   
  const ownReplyTicket = axios.post(`${process.env.REACT_APP_BASE_URL}fetch_reply_by_ticketid`,ticketID)
  return ownReplyTicket;

}


function replyingOnTicket(sendingTicketObj){
 const replyOnTick =  axios.post(`${process.env.REACT_APP_BASE_URL}post_reply`,sendingTicketObj)
    .then((res)=>{
      toast.info("Message Send!",{theme:"dark"})
    })
    .catch((error)=>{
      if(error.status === 401){
        toast.warn(error.data.message,{theme:"dark"})
      }
      else{
        toast.warn("Something went wrong",{theme:"dark"})
      }
    })

    return replyOnTick;
}


const useReplyOnTicket = ()=>{
  return  useMutation(replyingOnTicket)
}

const ticketEndPoints ={
    gettingTicketData,
    gettingOwnReplyOnTicket,
    useReplyOnTicket
}


export default ticketEndPoints;