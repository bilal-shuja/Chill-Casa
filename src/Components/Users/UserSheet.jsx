import UserTimelineModal from '../UserTimeline/UserTimelineModal';
import ConfirmQuery from '../ConfirmQuery/ConfirmQueryModal';
import usersEndPoint from '../Api/UserEndPoint.js';
import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from 'read-more-react';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
import {useQuery} from 'react-query';
import axios from 'axios';



const UserSheet = () => {

  const {mutate:postAdminComments} = usersEndPoint.useAdminComment();


    const[users , setUsers] = useState([]);

    // Hooks for Normal Search:
    const[firstName , setFirstName] = useState('');
    const[lastName , setLastName] = useState('');
    const[email , setEmail] = useState('');

    // Hooks for Advance Search:
    const[userDate , setUserDate] = useState('');
    const[userPhone, setUserPhone] = useState('');
    const[clientType, setClientType] = useState('');


    const[pages, setPages] = useState(1);
    const[count, setCount] = useState('');
    const [filteredCount, setFilteredCount] = useState(0);


    const[userID , setUserID] = useState('');
    const[adminComments , setAdminComments] = useState('');




    const resultsPerPage = 10;
    // function for getting page next:
      const handleNextPage = () => {
        setPages((prevPage) => prevPage + 1);
      };
    // function for getting previous page:
      const handlePrevPage = () => {
        setPages((prevPage) => Math.max(prevPage - 1, 1));
      };


    useQuery(['all_users',pages],_=> usersEndPoint.getAllUsers(pages),{
      onSuccess:(data)=>{
        setUsers(data.data.Users);
        setCount(data.data.total_users)

     },
     onError: (err) => {
      return err;
    }
  }
   )



   const totalResults = count|| 0;
   const startResult = (pages - 1) * resultsPerPage + 1;
   const endResult = Math.min(pages * resultsPerPage, totalResults);


  




    function suspendUser(id){
      const suspendUserObj = {
        user_id:id,
        status:1
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}post_blocked_user`,suspendUserObj)
      .then((res)=>{
        if(res.data.status === "200"){
             toast.error("User Suspended!" , {theme:"dark"})
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

    function submitAdminComments(){
      const adminCommentObj = {
        user_id:userID,
        see_note:adminComments
      }
      postAdminComments(adminCommentObj)
      setAdminComments(" ")

    }


 


 const filteredData = users.length > 0 && 
 firstName !== "" && lastName === "" && email === "" && userDate ==='' &&  userPhone === '' && clientType === ''?  users.filter((items)=> items.firstname === firstName) 
:
 firstName === "" && lastName !== "" && email === "" && userDate ==='' &&  userPhone === '' && clientType === ''?  users.filter((items)=> items.lastname === lastName) 
:
firstName === "" && lastName === "" && email !== "" && userDate ==='' &&  userPhone === '' && clientType === ''?  users.filter((items)=> items.email === email) 
:
firstName === "" && lastName === "" && email === "" && userDate !=='' &&  userPhone === '' && clientType === ''?  users.filter((items)=> items.Idate === userDate) 
:     
firstName === "" && lastName === "" && email === "" && userPhone !== '' && userDate ==='' && clientType===''  ?  users.filter((items)=> items.phone_number === userPhone) 
:        
firstName === "" && lastName === "" && email === "" && userDate ==='' &&  userPhone === '' && clientType !==''  ? users.filter((items)=> items.type_of_client === clientType)
: users 


useEffect(() => {
  setFilteredCount(filteredData.length);
}, [filteredData])

function UserList ({items,index}){
  const [isShow,setShow] = useState(false)
  const [isShowUserModal,setShowUserModal] = useState(false)

  function onHide(){
    setShowUserModal(false)
  }


  function onActionBack (val){
   setShow(false)
   if(val === "Yes"){

     suspendUser(items.id)
  }
   else{
     
    return null;
   }

  }

  return(
    <>

    <tr key={index} style={{ color: colorScheme.card_txt_color }}>
    {/* <td>{filteredData.length - index}</td> */}
    <td>{items.id}</td>
    <td>{items.firstname}</td>
    <td >{items.lastname}</td>
    <td>{items.email}</td>
    <td>{items.phone_number}</td>
    <td>
         <ReadMoreReact
               text={
                    items.residence_address
                }
                min={10}
                ideal={20}
                max={50}
              readMoreText="Read more..."
            /> 
    </td>
    <td>{items.type_of_client}</td>    
    <td>{items.Idate}</td>
    
  <td>

  <div className="d-flex justify-content-center">
    <>
    
  <Link className="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="update user" to="/UpdateUserForm" state={{ID:items.id}}>
      <i className="fa fa-pen"></i>
    </Link>&nbsp;&nbsp;


    <Link className="btn btn-outline-info btn-sm"  data-bs-toggle="tooltip" data-bs-placement="left" title="user profile"  to={`/UserProfile/${items.id}`} state={{ID:items.id}}>
      <i className="fa fa-user"></i>
    </Link>&nbsp;&nbsp; 
    </>

  &nbsp;&nbsp;
    {/* <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal"
    data-bs-placement="left" title="admin comments"
    onClick={()=>{setUserID(items.id)}}
    >
    <i className="fa-solid fa-paperclip"></i>
  </button> */}

    
  </div>

  </td>
  </tr>

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

  </>
  )

}


  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Client List
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
                    <h5>Client List</h5>
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                         
                        {/* Normal Search */}
                         <h5 className="mt-3">Normal Search:</h5>
                        <div className="row p-2">
                        <div className="col-sm-4">
                          <label htmlFor="" className="form-label "> Search with Firstname:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Firstname..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setFirstName(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-4">
                        <label htmlFor="" className="form-label "> Search with Lastname:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Lastname..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setLastName(e.target.value)}
                              />
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="" className="form-label "> Search with Email:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Email..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setEmail(e.target.value)}
                              />
                        </div>
                    </div>


                    </div>
                  {/* Normal Search */}
                         
                         
                         
                         
                         {/* Advanced Search */}
                         <h5>Advance Search:</h5>
                        <div className="row p-2">
                        <div className="col-sm-4">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="date" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setUserDate(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-4">
                        <label htmlFor="" className="form-label "> Search with Phone:</label>
                            <div className="form-group">
                              <input type="number" className="form-control" placeholder="Search by Phone..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setUserPhone(e.target.value)}
                              />
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="" className="form-label "> Search Client Type:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Client Type..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setClientType(e.target.value)}
                              />
                        </div>
                    </div>

                    </div>
                  {/* Advanced Search */}
                  

                  </div>
                  <div className="card-body table-responsive p-2">

                        {
                         users && users.length > 0?
                          <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              {/* <th>ID</th> */}
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Home Address</th>
                              <th>Client Type</th>
                              <th>Joined Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                
                                  {filteredData.map((items,index)=>{
                                    return(

                                      <UserList items={items} index={index}  /> 
                                      
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

                      <button className="btn btn-outline-light btn-sm" onClick={handlePrevPage} disabled={pages === 1}>
                        <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-outline-light btn-sm" onClick={handleNextPage} disabled={totalResults <= endResult}>
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <p >Showing {startResult} - {endResult} of {filteredCount} results - total :&nbsp;&nbsp;{count}</p>
                        
                            </div>
                          </div>

                
                {/*Query Modal Start  */}
                
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog" >
                <div className="modal-content" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:colorScheme.card_txt_color}}>Write Comments</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"  style={{color:colorScheme.card_txt_color}}>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea type="text" className="form-control" value={adminComments} placeholder="Writer your comments here..." row={6} style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}} onChange={(e)=>setAdminComments(e.target.value)}/>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-info btn-sm" onClick={submitAdminComments}>Submit</button>
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
export default UserSheet
