import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from 'read-more-react';
import Moment from 'react-moment';
import Modal from 'react-modal';
import 'moment-timezone';
import axios from 'axios';

const UserTimelineModal = ({ID,isShow,onHide}) => {
    const[userInfo , setUserInfo] = useState('');
    const[userDepo , setUserDepo] = useState([]);
    const[userWithdrawal , setUserWithdrawal] = useState([]);

    const[userTeamOne , setUserTeamOne] = useState([]);
    const[userTeamTwo , setUserTeamTwo] = useState([]);
    const[userTeamThree , setUserTeamThree] = useState([]);
    const[userTeamFour , setUserTeamFour] = useState([]);
    const[userTeamFive , setUserTeamFive] = useState([]);
    const[userTeamSix , setUserTeamSix] = useState([]);

    
    const[getReferral, setReferral] = useState([])
    const[userTotal , setUserTotal] = useState('');
    const[roleID , setRoleID] = useState('');
    
    const[display , setDisplay] = useState(0);
    
    const[therapisTakenBookingCount , setTherapisTakenBookingCount] = useState('');
    const[therapistRejectedBookingCount , setTherapistRejectedBookingCount] = useState('')

    const[therapistBookings , setTherapistBookings] = useState([]);

    const[users , setUsers] = useState('');

    const[lastBooking, setLastBooking] = useState('');
    const[lastBookingStatusCode , setLastBookingStatusCode] = useState('');

    const[bookingCounts , setBookingCounts] = useState('');
    const[reviewsCounts , setReviewCounts] = useState('');

    const[prevAndBooking , setPrevBooking] = useState([]);

    
    function handleDisplay(val){

          setTimeout(() => {
            setDisplay(val)
          }, 1000);
    }


    function gettingUsers(){
      axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
      .then((res)=>{
        setUsers(res.data.data)
      })
      .catch((err)=>{
        return err;
      })
    }


    function gettingLastBooking(){
        const userObj = {
            user_id :ID
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}getLastBookingDate`,userObj)
        .then((res)=>{
            if(res.data.status === "200"){
                setLastBooking(res.data.last_booking_date)
                setLastBookingStatusCode(res.data.status)
            }
        })
        .catch((err)=>{
        if(err.response.status === 401){
            setLastBooking(err.response.data.message)
            setLastBookingStatusCode(err.response.status)

        }
        })
    }


    function gettingBookingCounts(){
        const userObj = {
            user_id :ID
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}getBookingCount`,userObj)
        .then((res)=>{
            setBookingCounts(res.data.booking_count)
        })
        .catch((err)=>{
            return err;
        })
    }

    function gettingReviewsCount(){
        const userObj = {
            user_id :ID
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}getRatingsAndReviewsByUserId`,userObj)
        .then((res)=>{
            setReviewCounts(res.data.RatingsAndReviewsCount)
        })
        .catch((err)=>{
            return err;
        })

    }



    function gettingTakenTherapistBookingCount(){
      const bookingStatusObj = {
        status: "taken",
        therapist_id:ID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}getBookingCountByStatus`,bookingStatusObj)
      .then((res)=>{
        setTherapistRejectedBookingCount(res.data)
      })
      .catch((err)=>{
        return err;
      })
    }

    function gettingRejectedTherapistBookingCount(){
      const bookingStatusObj = {
        status: "rejected",
        therapist_id:ID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}getBookingCountByStatus`,bookingStatusObj)
      .then((res)=>{
        setTherapisTakenBookingCount(res.data)
      })
      .catch((err)=>{
        return err;
      })
    }

    function gettingTherapistBookings(){
      const bookingObj = {
        therapist_id:ID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}getBookingsByTherapistId`,bookingObj)
      .then((res)=>{
        setTherapistBookings(res.data.Bookings)
      })
      .catch((err)=>{
        return err;
      })
    }

    function gettingPreviousAndUpcomingBookings(){
      const bookingObj = {
        user_id:ID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}fetch_bookings_userid`,bookingObj)
      .then((res)=>{
        setPrevBooking(res.data.Bookings)
      })
      .catch((err)=>{
        return err;
      })
      
    }



    
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id)
      }

    } catch {
      return null;
    }
  }

    


    useEffect(() => {
        SetLocalLogin()

        gettingUsers()
        gettingLastBooking()
        gettingBookingCounts()
        gettingReviewsCount()

        gettingTherapistBookings()
        gettingTakenTherapistBookingCount()
        gettingRejectedTherapistBookingCount()
        gettingPreviousAndUpcomingBookings()
    }, [])
  return (
    <>
      <Modal isOpen={isShow} className="content-wrapper  user_modal">
  <div className="usermodal_height"  style={{ background: colorScheme.body_bg_color }}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1> User Timeline</h1>
        </div>  
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              <a className="text-white"
              style={{cursor:"pointer"}}
              onClick={onHide}
              >
              <i class="fas fa-circle-arrow-left fa-2x"></i>
              </a>
              </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <div className="scroll-view-two scrollbar-secondary-two">

  <section className="content usermodal_Content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="timeline">

              <div>
              <i className="fas fa-user bg-white" />
              {/* UserInfo Card */}
              
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !==1 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(1)}><i className="fa-solid fa-arrow-down fa-1x"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up fa-1x"></i></span>

              }
              <h3 className="timeline-header text-white">User's Activation</h3>
              {
                display !== 1 ? null:
              <div className="timeline-body">
               <div className="row">
                  <div className="col-lg-12 text-center">
                    <h4>Last Active: <br /><Moment date={users.updated_at} format="YYYY/MM/DD"/></h4>
                  </div>

               </div>
    

              </div>
    
              }
            </div>
      
              {/* UserInfo Card */}

            </div>
                  
            <div>
              <i className="fas fa-money-bill-transfer bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 2 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(2)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Latest Booking</h3>
              {
                 display !== 2 ? null:
                <div className="timeline-body">
                 <div className="row">
                 <div className="col-lg-12 text-center">
                    {
                        lastBookingStatusCode === "200"?
                        <h4>Last Booking: <br /><Moment date={lastBooking} format="YYYY/MM/DD"/></h4>
                        :
                        <h4>No Dates Found</h4>
                    }   
           
                  </div>
                </div>
                </div>

                }
              </div>
            </div>
            





            <div>
              <i className="fas fa-briefcase bg-white" />
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 3 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(3)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Total Bookings</h3>
                {
                display !== 3 ? null:
                <div className="timeline-body">
                <div className="row">
                <div className="col-lg-12 text-center">
                    {
                        <h4>Total Bookings:{bookingCounts}</h4>

                    }
                </div>
                </div>

                </div>
               }
               
              </div>
            </div>

            <div>
              <i className="fas fa-star bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 4 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(4)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Total Reviews</h3>
                {
                  display !== 4 ? null:
                <div className="timeline-body">
                   <div className="timeline-body">
                <div className="row">
                <div className="col-lg-12 text-center">
                    {
                        <h4>Total Reviews:{reviewsCounts}</h4>

                    }
                </div>
                </div>

                </div>

                </div>
                }
              </div>
            </div>

            <div>
              <i className="fas fa-people-group bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 5 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(5)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Previous & Upcoming Bookings</h3>
                {
                    display !== 5 ? null:
                <div className="timeline-body">
                {
                 prevAndBooking &&  prevAndBooking.length > 0 ?
                 <div className="row p-3">
                  {
                    prevAndBooking.map((items,index)=>{
                      return(
                        <div key={index+1} className="col-lg-4">
                      <li className="m-3 text-warning" style={{listStyle:"none", fontSize:"1.5em"}}>Booking# <b>{index+1}</b> </li>
                      <li>Username:&nbsp;<b>{items.username}</b> </li>
                      <li>Therapist Name:&nbsp;<b>{items.therapist_name}</b> </li>
                      <li>Time:&nbsp;<b>{items.time}</b> </li>

                      <li>Price:&nbsp;<b>{items.price}</b> </li>
                      <li>Address:&nbsp;<b> <ReadMoreReact
                                  text={
                                      items.address
                                  }
                                  min={10}
                                  ideal={20}
                                  max={50}
                                  readMoreText="...Read More"
                                />   
                                </b> 
                      </li>

                      <li>Duration:&nbsp;<b>{items.duration}</b> </li>
                     {
                        items.status === "In_progress" ?
                        <li>Status:&nbsp;<b  className="text-primary">{items.status}</b> </li>
                        :
                        items.status === "Completed" ?
                        <li  >Status:&nbsp;<b className="text-success">{items.status}</b> </li>
                        :
                        <li  >Status:&nbsp;<b className="text-warning">{items.status}</b> </li>


                                          
                      }
                      <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;<b>{items.Idate}</b></li> 

                      <li style={{listStyle:"none"}}> <i className="fas fa-clock"/>&nbsp;&nbsp;&nbsp;<b><Moment date={items.updated_at} format="hh:mm:ss"/></b></li>
                      </div>
                    )
                })
              }

                 </div>
                 :
                 <h3 className="text-center">No Booking Found!</h3>
          
               }


                </div>
                }
              </div>
            </div>
     
      

    
            <div>
              <i className="fas fa-multiply bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


 </div>
 

 </div> 
    </Modal>
    </>
  )
}

export default UserTimelineModal