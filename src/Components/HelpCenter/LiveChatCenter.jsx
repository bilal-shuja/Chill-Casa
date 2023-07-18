import { Link, useLocation } from "react-router-dom";
import React, {useState , useEffect} from 'react';
import colorScheme from "../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

const LiveChatCenter = () => {
    const location = useLocation();
    const id = location.state.id;
    const user_ID = location.state.userID;
    const senderName = location.state.senderName;
    const Body = location.state.userBody;
    const date = location.state.userDate;

    const [adminID , setAdminID] = useState('');
    const [admin_Email , setAdminEmail] = useState('');
    const[memName , setMemName] = useState('');
    const[loading , setLoading] = useState(false);
    const[liveChatMessage , sendLiveChatMessage] = useState('');
    const[chatList , setChatList] = useState([]);

    const SetLocalLogin = async () => {
        try {
          let userObj = await localStorage.getItem('user');
          let parseUserObj = JSON.parse(userObj)
          
          if (parseUserObj !== null) {
              setAdminID(parseUserObj.id);
            setMemName(parseUserObj.username);
            setAdminEmail(parseUserObj.email);
          }
    
        } catch {
          return null;
        }
      }

      function sendLiveChat(){
        setLoading(true)
        const sendObj ={
            sender_id:adminID,
            receiver_id:"1001",
            user_id:user_ID,
            sent_by:"admin",
            sender_name:memName,
            sender_email:admin_Email,
            message:liveChatMessage
        }
        setChatList(p=>[...p,sendObj])

        axios.post(`${process.env.REACT_APP_BASE_URL}sendchat`,sendObj)
        .then((res)=>{
            toast.info("Message Send!",{theme:"dark"});
            setLoading(false)
            sendLiveChatMessage('');

        })
        .catch((error)=>{
            if(error.status === 401){
                toast.warn(error.data.message,{theme:"dark"});
                setLoading(false)
            }
            else{
                toast.warn("Something went wrong",{theme:"dark"});
                setLoading(false)
            }
        })


      }
function gettingLiveChat(){
    const chatID = {
        user_id:user_ID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}chat_list`,chatID)
    .then((res)=>{
        setChatList(res.data.messages)

    })
    .catch((error)=>{
       toast.warn(error, {theme:"dark"})
    })
}


 

useEffect(() => {
        SetLocalLogin()
        gettingLiveChat()
      }, [])
      
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-inbox">
    <div className="content-wrapper "  style={{ background: colorScheme.body_bg_color }}>

    <section className="content-header">
          <div className="container-fluid ">
            <div className="row mb-2 mt-3">
              <div className="col-sm-9">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  <div className="d-flex">
                    <i className="fas fa-life-ring" />
                    &nbsp;&nbsp;
                    <h4>
                      <strong>{senderName === "Admin"?"Admin":senderName} </strong>
                    </h4> &nbsp;&nbsp;
                    {/* <div className="user-box rounded mt-1 mb-2">User</div> */}
                    (#{id})
                  </div>
                </h1>
              </div>
              <div className="col-sm-3">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">
                    <Link
                      to="/LiveChat"
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


        {/* User Area */}

         {/* User Area End*/}


  
  
  <div className="container mt-2">
    <div className="row">
      <div className="scroll-view-two scrollbar-secondary-two mb-4">
      <div className="col-lg-10 col-sm-12">
        {/* User Area */}

        </div>
            
            {/* Staff-area */}
            {
            
            chatList.map((items,index)=>{
                return(
                    <div key={index} className= {items.sent_by === "Admin"? "col-lg-8 col-sm-12 float-right":  "ml-4 col-lg-8 col-sm-12 float-left" }>
                    <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                 <div className="card-header">
                   <div className="card-tools">
                     <button type="button" className={items.sent_by ==="Admin"?"btn btn-tool staff-date-box rounded text-white mr-2":"btn btn-tool user-date-box rounded text-white mr-2"} data-card-widget="" title="Remove">
                     {items.date}
                     </button>
                   </div>
                   <div className="d-flex">
                   <h3 className="card-title">
                      <strong>{items.sent_by ==="Admin"?"Admin":items.sender_name}</strong> 
                   </h3>&nbsp;&nbsp;
                   <div className={items.sent_by ==="Admin"?"staff-box rounded":"user-box rounded"}>{items.sent_by ==="admin"?"Staff":"User"}</div>
                   </div>
           
                 </div>
                 <div className="card-body">
                {items.message}
                 </div>
               </div>
               </div>

                )
            })
        }
              {/* Staff-area-end */}
      
      </div>
      {/* scroll-end */}
          
    <div  className="col-lg-11 col-sm-12 mx-auto mb-2 mt-2">
     <div className="text-box ">
    <textarea className="form-control type-message round p-4" value={liveChatMessage} onChange={(e)=>{sendLiveChatMessage(e.target.value)}}placeholder="Type your message here..." rows={5} style={{ background: colorScheme.body_bg_color , color: colorScheme.card_txt_color  }}/>

    <button onClick={sendLiveChat} className="btn btn-outline-info d-block col-2 mt-3 float-right text-box-btn">
        {
          loading === true?"...Loading":"Send"
        }
    </button>
    </div>   

    </div>
      
       
    </div>
  </div>
    </div>
     
        </div>

    </>
  )
}

export default LiveChatCenter