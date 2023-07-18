import fetchDataFromLocalStorage from '../Api/LocalStorageEndPoint.js';
import React,{useState , useEffect , useRef } from "react";
import ticketEndPoints from '../Api/HelpCenterPoints.js';
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import {useQuery} from 'react-query';
import axios from 'axios';

const HelpChatCenter = () => {
  
  // Getting users information from Help center screen:

  const location = useLocation();
  const ID = location.state.ID
  const userID = location.state.userID;
  const userName = location.state.userName;
  const title = location.state.userTitle;
  const ticketStatus = location.state.ticketStatus;
  const body = location.state.userBody;
  const date = location.state.userDate;    

  const[getTicketReplys , setTicketReplys] = useState([]);
  const[ticketReply , setTicketReply] = useState('');
  const[loading , setLoading] = useState(false);
  const [adminID , setAdminID] = useState('');
  const[memName , setMemName] = useState('');

  const {mutate:replyingOnTicket} = ticketEndPoints.useReplyOnTicket();

  // Getting admin information from local storage:

  // const SetLocalLogin = async () => {
  //   try {
  //     let userObj = await localStorage.getItem('user');
  //     let parseUserObj = JSON.parse(userObj)
  
  //     if (parseUserObj !== null) {
  //       setAdminID(parseUserObj.id);
  //       setMemName(parseUserObj.username)
  //     }

  //   } catch {
  //     return null;
  //   }
  // }

 useQuery('localStorageData', fetchDataFromLocalStorage,{
  onSuccess:(res)=>{
    setAdminID(res.id);
    setMemName(res.username)

 },
 onError: (err) => {
  return err;
}
 });


//  Function which reply's the user ticket by the host's side:

  function replyingTicket(){
    setLoading(true)
    const sendingTicketObj={
      ticket_id:ID,
      sender_id:"1122",
      sender_type:"Admin",
      body:ticketReply
    }
    setTicketReplys(p =>[...p , sendingTicketObj])
    replyingOnTicket(sendingTicketObj,
      {
        onMutate: () => {
          setLoading(true);
        },
        onSettled: () => {
          setLoading(false);
        }
      }
      )
      setTicketReply('')

  }

  // Function fetching specific user reply in ticket section:
  
  
   useQuery(['ownReply_Ticket',ID], _=> ticketEndPoints.gettingOwnReplyOnTicket(ID),{
    onSuccess:(data)=>{
      setTicketReplys(data.data.Reply)
   },
   onError: (err) => {
    return err;
  }
}

)


 
//  function gettingRelpyTicket(){
//     const ticketID={
//       ticket_id:ID
//     }   
//     axios.post(`${process.env.REACT_APP_BASE_URL}fetch_reply_by_ticketid`,ticketID)
//     .then((res)=>{
//       setTicketReplys(res.data.Reply)
//     })
//     .catch((error)=>{
//       return error;
//     })
//   }

  // Function of generating notification to that specific user for replying to the ticket:

  function geneNotification(){
    const notifiObj ={
      receiver_id:userID,
      body:ticketReply,
      title:"Ticket Reply"
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}post_notification`,notifiObj)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.info("Notified to User",{theme:"dark"});
      }
      else{
        toast.info(`${res.data.message}`,{theme:"dark"});
  
      }
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});
  
    })
  }


  // Function for getting to the current message in the chat section:

  function useChatScroll(newMessage){
    const ref = useRef();
    useEffect(() => {
     if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
     } 
    }, [newMessage])
    return ref;
  }

  
  const ref = useChatScroll(getTicketReplys)

// Function, when the conversation between  user & host gets done this function will close that ticket:

function closeTicket(ID){
const statusObj ={
  status:"closed"
}
  axios.post(`${process.env.REACT_APP_BASE_URL}update_ticket_status_byid/${ID}`,statusObj)
  .then((res)=>{
    toast.info("This ticket is closed !",{theme:"dark"})
  })
.catch((error)=>{
  if(error.status === 401){
    toast.warn(error.data.message , {theme:"dark"})
  }
  else{
    toast.warn("Something went wrong" , {theme:"dark"})

  }
})
  }
  useEffect(() => {
    // gettingRelpyTicket()
    // SetLocalLogin()
  }, [])




  
  

  return (
    <>
<div className="scroll-view-two scrollbar-secondary-inbox">

      <div className="content-wrapper" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header" >
          <div className="container-fluid ">
            <div className="row mb-2 mt-5">
              <div className="col-sm-9">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  <div className="d-flex">
                    <i className="fas fa-life-ring" />
                    &nbsp;&nbsp;
                    <h4>
                      <strong>{title}</strong>
                    </h4>
                    &nbsp;&nbsp; (#{ID})
                  </div>
                  {
                    ticketStatus === "closed"? <h3 className="mt-4">This ticket is closed
                    <i className="fa-light fa-octagon-exclamation"></i>
                    </h3>:
                  <button className="btn btn-outline-success" onClick={()=> closeTicket(ID)}>Close Ticket</button>
                  }
                </h1>
              </div>
              <div className="col-sm-3">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">
                    <Link
                      to="/HelpCenter"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      <i className="fas fa-circle-arrow-left fa-2x" />
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="border-line mx-auto" />
      

        
<div  className="content mt-3" >
  <div className="container">
      <div ref={ref} className="scroll-view-two scrollbar-secondary-two">
          <div  className="col-lg-8 col-sm-8">

          {/* User Area */}
          <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
            <div className="card-header">
              <div className="card-tools">
                <button type="button" className="btn btn-tool user-date-box rounded text-white mr-2" data-card-widget="" title="Remove">
                {date}
                </button>
              </div>
              <div className="d-flex">
              <h3 className="card-title">
                 <strong>{userName}</strong> 
              </h3>&nbsp;&nbsp;
              <div className="user-box rounded">User</div>
              </div>
      
            </div>
            <div className="card-body">
                {
                  body
                }
            </div>
          </div>
                  
          </div>

      
           {/* Staff Area */}
            {
            getTicketReplys.map((items,index)=>{
              return(
                <>
                <div key={index} className={items.sender_type === "Admin"?"col-lg-8 col-sm-8 float-right":"col-lg-8 col-sm-8 float-left"} >
                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
             <div className="card-header">
               <div className="card-tools">
                 <button type="button" className={items.sender_type === "Admin"?"btn btn-tool staff-date-box rounded text-white mr-2":"btn btn-tool user-date-box rounded text-white mr-2"} data-card-widget="" title="Remove">
                 {items.Idate}
                 </button>
               </div>
               <div className="d-flex">
               <h3 className="card-title">
                  <strong>{items.sender_type === "Admin"?"Admin":items.sender_type}</strong> 
               </h3>&nbsp;&nbsp;
               <div className={items.sender_type ==="Admin"?"staff-box rounded":"user-box rounded"}>{items.sender_type ==="Admin"?"Staff":"User"}</div>
               </div>
       
             </div>
             <div className="card-body">
             {items.body}
             </div>

           </div>
           </div>
            </>
              )
            })
           }

        </div>
        
    {/* Reply box section*/}
    {
      
      ticketStatus === "closed"? null:
            
        <div className="col-lg-11 col-sm-12 mx-auto">
        <div className="text-box">
        <textarea className="form-control type-message rounded p-4" placeholder="Type your message here..." value={ticketReply} onChange={(e)=>{setTicketReply(e.target.value)}} rows={5}  style={{ background: colorScheme.body_bg_color , color: colorScheme.card_txt_color  }} />
       
        <button onClick={replyingTicket} className="btn btn-outline-info d-block col-2 float-right text-box-btn">
          {
            loading === true? "Loading...":"Send"
          }
        </button>
        </div>
        </div>

    } 
    
  </div>
</div>

    </div>
      </div>
    </>
  );
};

export default HelpChatCenter;
