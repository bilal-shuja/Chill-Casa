import UserTimelineModal from '../UserTimeline/UserTimelineModal';
import QuerySelect from './WithdrawalSelection.js';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import {Modal} from 'pretty-modal';
import Moment from 'react-moment';
import axios from 'axios';
import 'moment-timezone';


const WithdrawalSheet = () => {
  const [withdrawalData , setWithdrawalData] = useState([])
  const[widthDrawalSum , setWidthdrawalSum] = useState('');

  const [withdrawalDate , setWithdrawalDate] = useState('');
  const[withdrawalStatus , setWithdrawalStatus] = useState('All');
  const[withdrawalAcc , setWithdrawalAcc] = useState('');
  const[withdrawalPhone , setWithdrawalPhone] = useState('');
  const[withdrawalUsername , setWithdrawalUsername] = useState('');

  const[appWithdrawalDate ,setAppWithdrawalDate] = useState('')
  const[roleID , setRoleID] = useState('');
    
  const[receID , setReceID] = useState('');
  const[hostMessage , setHostMessage] = useState('');
  const[senderID , setSenderID] = useState('');

  const[queryOne , setQueryOne] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [ID , setID] = useState('');
  const[userID , setUserID] = useState('');
  const[showLength, setShowLength] = useState(30);

  const[index , setIndex] = useState('')


  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id);
        setSenderID(parseUserObj.id)
      }
  
    } catch {
      return null;
    }
  }


  function gettingWithdrawal(){
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_withdrawl_request`)
    .then((res)=>{
      setWithdrawalData(res.data.data)
    })
    .catch((error)=>{
      return error
    })
  }
        // select the remaining rows
    const remainingWithdrawalUsers = withdrawalData.slice(showLength);


  function withdrawalReq(id,userID,amount){
    const withdrawalObj = {
      id:id
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}approve_withdrawal`,withdrawalObj)
    .then((res)=>{
      toast.info(`Withdrawal ${res.data.message}`,{theme:"dark"});
      geneNotificationOnWithdrawalStatus(userID,amount,res.data.message)
      
    })
    .catch((error)=>{
      if(error.status === 401){
      toast.warn(error.data.message,{theme:"dark"});

      }
      else{
        toast.warn("Something went wrong",{theme:"dark"});
      }
  
    })
  }
function approveWithdrawalByDate(){
  const withdrawalDateObj = {
    date:appWithdrawalDate,
    status:"approved"
  }

  axios.post(`${process.env.REACT_APP_BASE_URL}approve_withdrawl_status_withdate`,withdrawalDateObj)
  .then((res)=>{
   
      toast.info(res.data.message,{theme:"dark"});
  })
  .catch((error)=>{
    toast.warn(error.data.message,{theme:"dark"});
  })
  
}

function gettingWithdrawalSum(){
  
  // const newDeposits = depoTemArr.length > 0 && depoTemArr.filter((item)=> item.status !=="rejected")

  if(withdrawalStatus ==='approved' || withdrawalStatus ==='unapproved' ){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.status  === withdrawalStatus).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }
  else if( (withdrawalAcc !== '' && withdrawalStatus === 'All') || ( withdrawalAcc !== '' && withdrawalDate === ' ')){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.account_number === withdrawalAcc).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }
  else if( ( withdrawalDate !== '' && withdrawalStatus === 'All') || ( withdrawalDate !== '' && withdrawalAcc === ' ')){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.Idate === withdrawalDate).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }

  else{
    const getWithdrawalSum = withdrawalData.reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }

 
}


function removeUserFromWithdrawalSheet() {
  setWithdrawalData((prevState) => {
    const tasks = [...prevState];
    tasks.splice(index, 1);
    return tasks;
  });
}


   
function withdrawalRejection(){
const withdrawalObj = {
  status:"rejected"
}
  axios.post(`${process.env.REACT_APP_BASE_URL}reject_withdrawl_status_byid/${ID}`,withdrawalObj)
  .then((res)=>{
    if(res.data.status === '200'){
      toast.info(`Withdrawal Rejected!`,{theme:"dark"});
      geneNotification();
      removeUserFromWithdrawalSheet();
    }
    else{
      toast.info(`${res.data.message}`,{theme:"dark"});

    }

  })
  .catch((error)=>{
    if(error.status === "401"){
    toast.warn(error.data.message,{theme:"dark"});

    } 
    toast.warn("Something went wrong",{theme:"dark"});
  })
  

}


function geneNotification(){
  const notifiObj ={
    receiver_id:userID,
    body:queryOne,
    title:"Withdrawal_Rejection"
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

  
function geneNotificationOnWithdrawalStatus(userID,amount,message) {
  const notifiObj = {
    receiver_id: userID,
    body: `Your deposit amount $ ${amount} has ${message}`,
    title: `Withdrawal_${message}`,
  };
  axios
    .post(`${process.env.REACT_APP_BASE_URL}post_notification`, notifiObj)
    .then((res) => {

      if (res.data.status === "200") {
        toast.info("Notified to User", { theme: "dark" });
      } else {
        toast.info(`${res.data.message}`, { theme: "dark" });
      }
    })
    .catch((error) => {
      toast.warn("Something went wrong", { theme: "dark" });
    });
}


function submitHostQuery(){
  const hostQueryObj = {
    sender_id:senderID,
    user_id:receID,
    message:hostMessage,
    status:"pending"

  }
  axios.post(`${process.env.REACT_APP_BASE_URL}post_query`,hostQueryObj)
  .then((res)=>{
    if(res.data.status === "200")
    {
      toast.info("Query Submitted",{theme:"dark"})
      setHostMessage('')
    }
    else{
      toast.info(res.data.data[0].message,{theme:"dark"})
    }
  })
  .catch((error)=>{
    toast.warn("Something went wrong" , {theme:"dark"})
  })
}


function WithdrawalSheetFun({items , index}){

  const [isShowUserModal,setShowUserModal] = useState(false)

  function onHide(){
    setShowUserModal(false)
  }
  return(
    <>
    <tr key={index} style={{ color: colorScheme.card_txt_color }}>
    <td>{withdrawalData.length-index}</td>
    <td>{items.user_id}</td>
    <td>{items.username}</td>
    <td>{items.phone}</td>
    <td>{items.wallet_type}</td>
    <td>{items.account_type}</td>
    <td>{items.wallet_address}</td>
    <td>{items.requested_amount}</td>
    {
        items.status === "approved"?
        <td style={{ color: "#64dd17" }}>{items.status}</td>
        :
        <td style={{ color: "#ff1744" }}>{items.status}</td>

      }

    <td>{items.Idate}</td>
    <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>

    {
      roleID === "2"|| roleID === "3"|| roleID === "4"? null:
      <td>
        <div className="d-flex justify-content-center">
          <>
          {
             items.status === "approved"? null:
             <button onClick={()=>withdrawalReq(items.id,items.user_id,items.requested_amount)} className="btn btn-outline-info">
             <i className="fa fa-circle-check"></i>
           </button>
          }
         
          &nbsp;&nbsp;

          <button className="btn btn-outline-primary btn-sm" onClick={()=>{setShowUserModal(true)}}>
        <i className="fa-solid fa-timeline"></i>
        </button>
        
        &nbsp;&nbsp;
        {
         items.status === "approved"?
         null
         :
          <button onClick={() => {
         setIsOpen(true)
         setID(items.id)
         setUserID(items.user_id)
         setIndex(index)
        }} 
         className="btn btn-outline-danger btn-sm"
         data-toggle="tooltip" 
         data-placement="top" 
         title="Withdrawal_Rejection"
         >
           <i className="fa-solid fa-circle-xmark"></i>
         </button>
          }
          </>
          &nbsp;&nbsp;
          {
          roleID === "1" || roleID === "6"? null:
          <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal"
          onClick={()=>{setReceID(items.user_id)}}
          >
          Query
        </button>

        }
        </div>
      </td>
  }
  </tr>



{
  isShowUserModal === true &&
  <UserTimelineModal
  ID = {items.user_id}
  isShow = {isShowUserModal}
  onHide={onHide}
/>
}
</>
  )

}




  useEffect(() => {
    gettingWithdrawal()
    SetLocalLogin()
  }, [])
  

  const FilteredWithdrawList  =  withdrawalDate ==='' &&  withdrawalAcc === '' && (withdrawalStatus ==='approved' || withdrawalStatus ==='unapproved') ?   withdrawalData.length > 0 && withdrawalData.filter((items)=> items.status === withdrawalStatus):
  ( withdrawalAcc !== '' && withdrawalStatus === 'All') || ( withdrawalAcc !== '' && withdrawalDate === ' ')
                        ?
                        withdrawalData.filter((items)=> items.wallet_address === withdrawalAcc):
                        ( withdrawalDate !== '' && withdrawalStatus === 'All') || ( withdrawalDate !== '' && withdrawalAcc === ' ')
                        ?

                        withdrawalData.filter((items)=> items.Idate === withdrawalDate):
                        ( withdrawalPhone !== '' && withdrawalStatus === 'All') || ( withdrawalPhone !== '' && withdrawalAcc === ' ')
                        ?
                        withdrawalData.filter((items)=> items.phone === withdrawalPhone):
                        ( withdrawalUsername !== '' && withdrawalStatus === 'All') || ( withdrawalUsername !== '' && withdrawalAcc === ' ')
                        ?
                        withdrawalData.filter((items)=> items.username === withdrawalUsername):
                        withdrawalData.filter((items,index)=> index <= showLength &&( items.status ==="approved" || items.status === "unapproved"))



  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">
        <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Withdrawals
                </h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className="card" style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h5>Withdrawal Sheet</h5>
                    
                    <div className="row">
                      <div className="col-lg-3">
                      <div className="form-group">
                      <input type="text"  className="form-control form-control-sm" defaultValue={widthDrawalSum}  placeholder="total Amount" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                      </div>
                      </div>
                      <div className="col-lg-3">
                        <button className="btn btn-outline-info btn-sm" onClick={gettingWithdrawalSum}> Total Amount</button>
                      </div>
                    </div>

                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                    {
                roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                  <div className="row float-right deposit-date-row">
                    {/* <div className="col-8">
                      <div className="form-group">
                              <input type="date"  className="form-control form-control-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e)=>setAppWithdrawalDate(e.target.value)}/>
                      </div>
                    
                      </div>
                      <div className="col-4">
                      <button onClick={()=> approveWithdrawalByDate()} className="btn btn-outline-info btn-sm">
                    Approve
                      </button>
                      </div> */}
                    </div>
                }
                  </div>
                  <div className="row p-3">
                  <div className="col-sm-3">
                      <label htmlFor="" className="form-label"> Search with Status:</label>
                    <div className="form-group">
                      <select type="text" className="form-control" 
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=>setWithdrawalStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="approved">approved</option>
                            <option value="unapproved">unapproved</option>
                         </select>
                    </div>
                    </div>
                    <div className="col-sm-3">
                    <label htmlFor="" className="form-label">Filter by Account No /Address:</label>
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search by Account No..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> setWithdrawalAcc(e.target.value)}
                      />
                        </div>
                    </div>

                  <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setWithdrawalDate(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-3">
                <label htmlFor="" className="form-label "> Search with Phone:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Phone..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> setWithdrawalPhone(e.target.value)}
                      />
                 </div>
            </div>

            <div className="col-sm-3">
                <label htmlFor="" className="form-label "> Search with Usrename:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Username..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> setWithdrawalUsername(e.target.value)}
                      />
                 </div>
            </div>

            </div>
                  <div className="card-body table-responsive p-2">
                  <h3>Total Ratio:{FilteredWithdrawList.length}</h3>
                    {
                      withdrawalData.length !==0?
                      <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Account Owner</th>
                          <th>Owner Phone</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account No</th>
                          <th>Req Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Actions</th>
                          
                        </tr>
                      </thead>
                      <tbody className="text-center">




                        {FilteredWithdrawList.map((items,index)=>{
                          return(
                            <WithdrawalSheetFun items={items} index={index}/>
                          )
                        })}
{/*                         
                        {
                          withdrawalDate ==='' &&  withdrawalAcc === '' && (withdrawalStatus ==='approved' || withdrawalStatus ==='unapproved')
                          
                         ?
                         withdrawalData.length > 0 && withdrawalData.filter((items)=> items.status === withdrawalStatus).map((items,index)=>{
                        return(
                          <WithdrawalSheetFun items={items} index={index}/>
                        )
                       
                        })
                        :
                        ( withdrawalAcc !== '' && withdrawalStatus === 'All') || ( withdrawalAcc !== '' && withdrawalDate === ' ')
                        ?
                        withdrawalData.filter((items)=> items.account_number === withdrawalAcc).map((items,index)=>{
                          return(
                            <WithdrawalSheetFun items={items} index={index}/>
                          )
                        })
                        :
                        ( withdrawalDate !== '' && withdrawalStatus === 'All') || ( withdrawalDate !== '' && withdrawalAcc === ' ')
                        ?

                        withdrawalData.filter((items)=> items.Idate === withdrawalDate).map((items,index)=>{
                          return(
                            <WithdrawalSheetFun items={items} index={index}/>
                          )
                        })
                        :
                        ( withdrawalPhone !== '' && withdrawalStatus === 'All') || ( withdrawalPhone !== '' && withdrawalAcc === ' ')
                        ?
                        withdrawalData.filter((items)=> items.phone === withdrawalPhone).map((items,index)=>{
                          return(
                            <WithdrawalSheetFun items={items} index={index}/>
                          )
                        })
                        :
                        ( withdrawalUsername !== '' && withdrawalStatus === 'All') || ( withdrawalUsername !== '' && withdrawalAcc === ' ')
                        ?
                        withdrawalData.filter((items)=> items.username === withdrawalUsername).map((items,index)=>{
                          return(
                            <WithdrawalSheetFun items={items} index={index}/>
                          )
                        })
                        :
                          withdrawalData.filter((items,index)=> index <= showLength &&( items.status ==="approved" || items.status === "unapproved")).map((items,index)=>{
                            return(
                              <WithdrawalSheetFun items={items} index={index}/>
                            )
                          })

                          

                        }
                      */}

                      </tbody>
                    </table>



                      :
                      <div className="text-center">
                      <h2>No Record Found</h2>
                      </div>
                    }

                    {remainingWithdrawalUsers.length > 0 && (
                      // only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )}

                    </div>
                  </div>

                    {/* Rejection Modal */}
                    <Modal 
                    ariaLabelledby="modal1_label"
                    ariaDescribedby="modal1_desc"
                    onClose={() => {setIsOpen(false)}} 
                    open={isOpen}>
                           <div className="card-body">
                            <h5><b>Possible Notes*</b> </h5>
                            <ul>
                              {
                                QuerySelect.map((items)=>{
                                  return(
                                    <div className="custom-control custom-checkbox">
                                    <input 
                                    className="custom-control-input custom-control-input-info"
                                     
                                    type="checkbox" 
                                     
              
                                    id={`customCheckbox${items.id}`}  
                                    
                                    onChange={()=>{
                                      if(queryOne.includes(items.message)){
                                       var new_str = queryOne.replace(items.message,'')
                                        setQueryOne(new_str)
                                      }
                                      else{

                                        setQueryOne(queryOne+" "+items.message)
                                      }
                                    
                                      }}/>
                                    <label htmlFor={`customCheckbox${items.id}`} className="custom-control-label">{items.message}</label>
                                    </div>
                                  )
                            
                                })
                              }
                         

                            </ul>

                           <div className="form-group">
                           <label htmlFor="exampleInputEmail1">Rejection Reason*</label>
                            <textarea
                              type="text" className="form-control " defaultValue={queryOne} id="exampleInputEmail1"  placeholder="Enter Rejection Reason" onChange={(e)=> setQueryOne(e.target.value)} row={6} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color,marginRight:"15em"}}/>
                           </div>
                           <button onClick={()=>{
                            withdrawalRejection()
                          }} className="btn btn-outline-info btn-sm"
                          >Submit</button>
                           </div>
                           </Modal>

                    {/* Rejection Modal */}

                  
            {/*Query Modal Start  */}
                
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog" >
                <div className="modal-content" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:colorScheme.card_txt_color}}>Query Area</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"  style={{color:colorScheme.card_txt_color}}>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea type="text" className="form-control" value={hostMessage} placeholder="Writer your query here..." row={6} style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}} onChange={(e)=>setHostMessage(e.target.value)}/>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-info" onClick={submitHostQuery}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
                {/* Query Modal End */}
                </div>
              </div>
            </div>
        </section>
      </div>
      </div>

    </>
  )
}

export default WithdrawalSheet