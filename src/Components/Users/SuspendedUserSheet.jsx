import React,{useState , useEffect} from 'react';
import colorScheme from "../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
const SuspendedUserSheet = () => {
    const[users , setUsers] = useState([]);
    const[userDate , setUserDate] = useState('');
    const[userPhone , setUserPhone] = useState('');
    const[roleID , setRoleID] = useState('');
    const[senderID , setSenderID] = useState('');


        
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

      
    function gettingSuspendedUsers(){
        const suspendUserObj ={
            status: 1
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}fetch_blockeduser_bystatus`,suspendUserObj)
        .then((res)=>{
          setUsers(res.data.Data)
        })
        .catch((error)=>{
          return null;
        })
      }

      function retrieveSuspendUser(id){
        const suspendUserObj = {
          user_id:id,
          status:0
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}post_blocked_user`,suspendUserObj)
        .then((res)=>{
          if(res.data.status === "200"){
               toast.info("User Retrieved!" , {theme:"dark"})
            setTimeout(() => {
              window.location.reload(true)
            }, 3000);
          }
          else{
            toast.warn(res.data.message , {theme:"dark"})
          }
          })
        .catch((res)=>{
          toast.warn("Something went wrong" , {theme:"dark"})
        })
  
      }
      
useEffect(() => {
    gettingSuspendedUsers();
    SetLocalLogin()
  }, [])


    const filteredData = users.length > 0 && userDate !=='' &&  userPhone === '' ?  users.filter((items)=> items.Idate === userDate) 
    :     userDate ==='' &&  userPhone !== '' ? users.filter((items)=> items.phone === userPhone) 
    : users
  return (
    <>
        <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Suspended Users
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Suspended Users Sheet</h5>
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
                                  onChange={(e)=> setUserDate(e.target.value)}
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
                                onChange={(e)=> setUserPhone(e.target.value)}
                              />
                        </div>
                    </div>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-2">

                        {
                          users.length !== 0?

                          <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Last Name</th>
                              <th>Referal Code</th>
                              <th>Email</th>
                              <th>Username</th>
                              <th>Question</th>
                              <th>Answer</th>
                              <th>Phone</th>
                              <th>CNIC</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                
                          {filteredData.map((items,index)=>{

                                    return(
                                      <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                      <td>{filteredData.length - index}</td>
                                      <td>{items.id}</td>
                                      <td>{items.firstname}</td>
                                      <td >{items.lastname}</td>
                                      <td>{items.referal_code}</td>
                                      <td>{items.email}</td>
                                      <td>{items.username}</td>
                                      <td>{items.question}</td>
                                      <td>{items.answer}</td>
                                      <td>{items.phone}</td>
                                      <td>{items.cnic}</td>
                                      
                                      <td>{items.Idate}</td>
                                      <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                                      
                                    <td>

                                    <div className="d-flex justify-content-center">
                                    {
                                      roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6"? null:
                                      <>
                                    {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateUserForm" state={{ID:items.id}}>
                                        <i className="fa fa-pen"></i>
                                      </Link>&nbsp;&nbsp;
                                      
                                      
                                      <Link className="btn btn-outline-primary btn-sm" to="/TimeLine" state={{ID:items.id, target:"/UserSheet"}}>
                                        <i className="fa-solid fa-timeline"></i>
                                      </Link>

                                      &nbsp;&nbsp; */}

                                      <button className="btn btn-outline-info btn-sm" onClick={()=>retrieveSuspendUser(items.id)}>
                                        <i className="fa fa-user-plus"></i>
                                      </button> 
                                      {/* &nbsp;&nbsp;

                                    <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                                        <i className="fa fa-trash"></i>
                                      </button> */}
                                      </>
                                    }

                                    &nbsp;&nbsp;
                                    {
                                    //   roleID === "1" || roleID === "6"? null:
                                    //   <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal"
                                    //   onClick={()=>{setReceID(items.id)}}
                                    //   >
                                    //   Query
                                    // </button>

                                    }
                                      
                                    </div>

                                    </td>
                                    </tr>
                                    )


                                  })}
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
                
              {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
            </div> */}
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

export default SuspendedUserSheet