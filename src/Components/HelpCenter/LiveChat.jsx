import React,{useState , useEffect} from 'react';
import colorScheme from "../Colors/Styles.js";
import {Link} from 'react-router-dom';
import axios from 'axios';


const LiveChat = () => {
  const [recentLiveChat , setRecentLiveChat] = useState([]);

  function gettingRecentLiveChat(){
    axios.get(`${process.env.REACT_APP_BASE_URL}fetchallchats`)
    .then((res)=>{
      setRecentLiveChat(res.data.messages)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  useEffect(() => {
    gettingRecentLiveChat()
  }, [])
  
  return (
    <>

   <div className="content-wrapper"  style={{ background: colorScheme.body_bg_color }}>
    
  <section className="content-header">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <h1>Inbox</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Inbox</li> */}
          </ol>
        </div>
      </div>
    </div>
  </section>
  <div className="scroll-view-two scrollbar-secondary-two">

  <section className="content mt-4">
  <div className="container" style={{marginBottom:"4em"}}>
    <div className="row">
      <div className="col-lg-8 col-sm-12 ml-4">
        {/* User Area */}
        {
            recentLiveChat.map((items)=>{
                return(
                    <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                    <div className="card-header">
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool user-date-box rounded text-white mr-2" data-card-widget="" title="Remove">
                        {items.date}
                        </button>
                      </div>
                      <div className="d-flex">
                      <h3 className="card-title">
                         <strong>{items.sender_name}</strong> 
                      </h3>&nbsp;&nbsp;
                      <div className="user-box rounded">{items.sent_by}</div>
                      </div>
                    </div>
                    <div className="card-body">
                        {
                          items.message
                        }

                    </div>
                  
                    <Link  to="/LiveChatCenter" 
                         state={{
                          id:items.id,
                          userID: items.user_id,
                          senderName:items.sender_name,
                          userBody:items.Body,
                          userDate:items.date
                        }}
                        
                        className="btn btn-outline-info d-block col-2 m-3">Chat</Link>
                  </div>
                )
            })
        }
    
                

        </div>
            
       

      </div>
              
    </div>
</section>
</div>
</div>

    </>
  )
}

export default LiveChat