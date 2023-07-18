import UserTimelineModal from '../UserTimeline/UserTimelineModal';
import ConfirmQuery from '../ConfirmQuery/ConfirmQueryModal';
import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';


const MemberSheet = () => {
  const[members , setMembers] = useState([]);
  const[memDate , setMemDate] = useState('');
  const[memPhone , setMemPhone] = useState('');
  const[userName, setUsername] = useState('');
  const[referalCode , setReferalCode] = useState('');
  const[roleID , setRoleID] = useState('');

  const[receID , setReceID] = useState('');
  const[hostMessage , setHostMessage] = useState('');
  const[senderID , setSenderID] = useState('');

  
  // Getting admin information from local storage:
  
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id)
        setSenderID(parseUserObj.id)
      }

    } catch {
      return null;
    }
  }

  // Function fetching all company members:

    function gettingMembers(){
      axios.post(`${process.env.REACT_APP_BASE_URL}fetchallusers`)
      .then((res)=>{
        setMembers(res.data.Users)
      })
      .catch((error)=>{
        return null;
      })
    }

    // Filter against host/members roles(like which member can view who's data or not):

    const newMemberSheet = members.length > 0 && members.filter((items)=>                    
                        
    Number(roleID) === 2 ? items.role_id !== "1" && items.role_id !== "2"&& items.role_id === "6"  && items.role_id !== "5" :
    Number(roleID) === 3 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id === "6" && items.role_id !== "5" && items.role_id !== "3" :
    Number(roleID) === 4 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id === "6" &&  items.role_id !== "5" && items.role_id !== "3" && items.role_id !== "4" :
    items.role_id !=="5"
  
)




// Function for deleting member permanently( which is not in used right now):

    function deleteMembers(id){
        axios.post(`${process.env.REACT_APP_BASE_URL}deleteuserwithid/${id}`)
        .then((res)=>{
            toast.error("Member deleted" , {theme:"dark"})
            setTimeout(() => {
              window.location.reload(true)
            }, 3000);
            })
        .catch((res)=>{
          toast.warn("Something went wrong" , {theme:"dark"})
        })
    }


  // Function that generates query from hosts/members(admin/manager/staff) and submitted to super admin:
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


    // Child function for member sheet:
function MemberList ({items , index}){
  const[isShow,setShow] = useState(false);
  const [isShowUserModal,setShowUserModal] = useState(false)

  function onHide(){
    setShowUserModal(false)
  }


  function onActionBack (val){
    setShow(false)
    if(val === "Yes"){
  
      suspendUser()
   }
    else{
      
     return null;
    }
  
   }

  //  Function for suspending user/members (only access by super admin): 

   function suspendUser(){
    const suspendUserObj = {
      user_id:items.id,
      status:1
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}post_blocked_user`,suspendUserObj)
    .then((res)=>{
      if(res.data.status === "200"){
           toast.error("Member Suspended!" , {theme:"dark"})
        setTimeout(() => {
          window.location.reload(true)
        }, 3000);
      }
      else{
        toast.warn(res.data.message , {theme:"dark"})
      }
      })
    .catch((error)=>{
      toast.warn("Something went wrong" , {theme:"dark"})
    })
  
  }

  return(
    <tr key={index} style={{ color: colorScheme.card_txt_color }}>
      <td>{newMemberSheet.length-index}</td>
    <td>{items.id}</td>
    <td>{items.username}</td>
    <td>{items.firstname}</td>
    <td>{items.lastname}</td>
    <td >{items.email}</td>
    <td>{items.referal_code}</td>
    <td>{items.question}</td>
    <td>{items.answer}</td>
    <td>{items.phone}</td>
    {
      items.role_id === "1"?
      <td>Super Admin</td>
      :
      items.role_id === "2"?
      <td>Admin</td>
      :
      items.role_id === "6"?
      <td>Assist Admin</td>
      :
      items.role_id === "3"?
      <td>Manager</td>
      :
      items.role_id === "4"?
      <td>Staff</td>
      :
      items.role_id=== "5" || items.role_id !== null || undefined || " "?
      <td>User</td>
      :
      null
    }
    <td><Moment date={items.updated_at} format="YYYY/MM/DD"/></td>
    <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
    {
roleID === "2"|| roleID === "3"|| roleID === "4" ? null:
    <td>
   <div className="d-flex justify-content-center">
        <Link  className="btn btn-outline-info btn-sm" to="/UpdateMemberForm" state={{ID:items.id}}>
          <i className="fa fa-pen"></i>
        </Link>&nbsp;&nbsp;

        <button className="btn btn-outline-primary btn-sm" onClick={()=>{setShowUserModal(true)}}>
          <i className="fa-solid fa-timeline"></i>
        </button>&nbsp;&nbsp;
        {/* <Link className="btn btn-outline-primary btn-sm" to="/TimeLine" state={{ID:items.id, target:"/MemberSheet"}}>
          <i className="fa-solid fa-timeline"></i>
        </Link> */}
        

    <button className="btn btn-outline-danger btn-sm" onClick={()=>{setShow(true)}}>
        <i className="fa fa-user-minus"></i>
    </button> 

          <ConfirmQuery
          isShow={isShow}
          body={`Are you sure you want to suspend ${items.username}`}
          action={onActionBack}
          />

          {
          isShowUserModal === true &&
          <UserTimelineModal
          ID = {items.id}
          isShow = {isShowUserModal}
          onHide={onHide}
        />
        }
    {/* <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
        <i className="fa fa-trash"></i>
      </button>
      &nbsp;&nbsp; */}
      
      {
        roleID === "1" || roleID === "6"? null:
        <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal"
        onClick={()=>{setReceID(items.id)}}
        >
        Query
      </button>

      }
     </div>
    </td>
}
  </tr>
  )
}
  


useEffect(() => {
    gettingMembers();
    SetLocalLogin();
}, [])



  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Members
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
        
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Members Sheet</h5>   
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                        <div className="row p-2">
                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setMemDate(e.target.value)}
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
                                onChange={(e)=> setMemPhone(e.target.value)}
                              />
                        </div>
                    </div>

                    
                    <div className="col-sm-3">
                        <label htmlFor="" className="form-label "> Search with Username:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Username..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setUsername(e.target.value)}
                              />
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="" className="form-label "> Search with Refer Code:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search with Refer Code..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setReferalCode(e.target.value)}
                              />
                        </div>
                    </div>
                    
                    </div>

         
                    
                  </div>
                  <div className="card-body table-responsive p-2">
                    {
                        members.length !==0?

                   <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Username</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Referral Code</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Date</th>
                          <th>Time</th>
                          {
                          roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6" ?  null:
                          <th>Actions</th>
                        }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                           memDate !=='' &&  memPhone === '' ?

                           newMemberSheet.filter((items)=> items.Idate === memDate).map((items,index)=>{
                            return(
                              <MemberList items={items} index={index}/>
                          
                            )
                          })
                          :
                          memDate ==='' &&  memPhone !== '' ?
                        
                          newMemberSheet.filter((items)=> items.phone === memPhone).map((items,index)=>{
                            return(
                              <MemberList items={items} index={index}/>
                            )
                            })
                          :
                          memDate ==='' &&  memPhone === '' && userName !== ''?
                        
                          newMemberSheet.filter((items)=> items.username === userName).map((items,index)=>{
                            return(
                              <MemberList items={items} index={index}/>
                            )
                            })
                          :

                          memDate ==='' &&  memPhone === '' && userName === '' &&  referalCode !== '' ?
                        
                          newMemberSheet.filter((items)=> items.referal_code === referalCode).map((items,index)=>{
                            return(
                              <MemberList items={items} index={index}/>
                            )
                            })
                          :
                          
                          newMemberSheet.map((items,index)=>{
                          return(
                            <MemberList items={items} index={index}/>
                          )
                          })
                        
                        }

                      </tbody>
                    </table>
                     :
                     <div className="text-center">
                     <h2>No Record Found</h2>
                     </div>
                    }
                  </div>
                </div>

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

export default MemberSheet