import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import React,{useState , useEffect} from 'react';
import colorScheme from "../../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import { Doughnut } from 'react-chartjs-2';
import Moment from 'react-moment';
import Modal from 'react-modal';
import axios from 'axios';
import 'moment-timezone';


ChartJs.register(
  Tooltip, Title, ArcElement, Legend
)
const UserTimelineModal = ({ID,isShow,onHide}) => {


    const[roleID , setRoleID] = useState('');
    
    const[display , setDisplay] = useState(0);
    
    const[therapisTakenBookingCount , setTherapisTakenBookingCount] = useState('');
    const[therapistRejectedBookingCount , setTherapistRejectedBookingCount] = useState('')

    const[therapistBookings , setTherapistBookings] = useState([]);


    const [therapistRevenue , setTherapistRevenue] = useState('');

    const[startingDate , setStartingDate] = useState('');
    const[endingDate , setEndingDate] = useState('');
  


    
    function handleDisplay(val){

          setTimeout(() => {
            setDisplay(val)
          }, 1000);
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

    function gettingTherapistRevenue(){
      const revenueObj = {
        therapist_id:ID,
        start_date:startingDate,
        end_date:endingDate
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}getTherapistAmountwithdate`,revenueObj)
      .then((res)=>{
        setTherapistRevenue(res.data.total_therapist_amount)
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

    const data ={
       
      datasets: [
        {
          data: [
            therapistRevenue
          ]
          ,
          backgroundColor:[
            // '#7895CB',
            // '#9F91CC',
            // '#9ED2BE',
            // '#6D5D6E',
            '#9E9FA5'
          ]
      },
    ]
    
    ,
    labels: [
  
  
        `From:${startingDate} - To:${endingDate}`,
     
    
        
    ]
    
    
    
  }
  
  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#fff', // Set the desired label text color
        },
      },
    },
  };

    


    useEffect(() => {
        SetLocalLogin()

        gettingTherapistBookings()
        gettingTakenTherapistBookingCount()
        gettingRejectedTherapistBookingCount()
    }, [])
    
  return (
  <Modal isOpen={isShow} className="content-wrapper  user_modal">
  <div className="usermodal_height"  style={{ background: colorScheme.body_bg_color }}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1> Therapist Timeline</h1>
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
              <h3 className="timeline-header text-white">Therapist Info</h3>
              {
                display !== 1 ? null:
              <div className="timeline-body">
               <div className="row">
                  <div className="col-lg-12 text-center">
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, vel repellat! Sit delectus asperiores autem sapiente vero earum at est id ea.</p>
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
                <h3 className="timeline-header text-white">Total Orders</h3>
              {
                 display !== 2 ? null:
                <div className="timeline-body">
                 <div className="row">
              
                      <div className="col-lg-6 p-2">
                      <li style={{listStyle:"none"}}>Total taken orders:&nbsp;<b>{therapisTakenBookingCount.count}</b> </li>
                      </div>

                      <div className="col-lg-6 p-2">
                      <li style={{listStyle:"none"}}>Total Rejected orders:&nbsp;<b>{therapistRejectedBookingCount.count}</b> </li>
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
                <h3 className="timeline-header text-white">Booking Information</h3>
                {
                display !== 3 ? null:
                <div className="timeline-body">
          
                {
                  therapistBookings && therapistBookings.length > 0 ?
                 <div className="row">
                  {
                   therapistBookings.map((items,index)=>{
                    return(
                      <div key={index+1} className="col-lg-6">
                      <li className="mb-3" style={{listStyle:"none"}}>Booking No:&nbsp;<b>{index+1}</b></li>
                      <li>Therapist Name:&nbsp;<b>{items.therapist_name}</b> </li>
                      <li>Categories: &nbsp;<b>{items.category_name.map((category)=>{
                        return(
                            <li>{category}</li>
                        )
                      })}</b> </li>
                      <li>Address: &nbsp;&nbsp; {items.address}</li>
                      <li>Price:&nbsp;<b>{items.price}</b> </li>
       
                      <li>Time:&nbsp;<b>{items.time}</b> </li>
                      <li>Duration:&nbsp;<b>{items.duration}</b> </li>
                      <li>Status:&nbsp;<b>{items.status}</b> </li>
                      <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;&nbsp;<b>{items.date}</b></li> 


                      </div>
                    )
                })
              }
                 </div>
                 :
                 <h3 className="text-center">No Bookings Found!</h3>
               }

                </div>
               }
               
              </div>
            </div>

            <div>
              <i className="fas fa-money-bill-wave bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 4 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(4)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Therapist Revenue Chart</h3>
                {
                  display !== 4 ? null:
                <div className="timeline-body">
                  <div className="row"> 
                  <div className="col-lg-4 col-sm-12">
                        <div className="form-group">
                      <label htmlFor="exampleInputPassword2">Starting date*</label>
                      <input type="date"  className="form-control form-control-sm" id="exampleInputPassword2" onChange={(e)=> setStartingDate(e.target.value)} style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                    </div>
                    </div>

                           
                    <div className="col-lg-4 col-sm-12">
                        <div className="form-group">
                      <label htmlFor="exampleInputPassword3">Ending Date*</label>
                      <input type="date" className="form-control form-control-sm" id="exampleInputPassword3" onChange={(e)=> setEndingDate(e.target.value)}    style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                    </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-12 " style={{marginTop:"1.9em"}}>
                    <button className="btn btn-outline-info btn-sm" onClick={gettingTherapistRevenue}>check</button>
                      </div>
                  </div>

                {/* {
                  userWithdrawal.length !== 0 ? */}
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                      <div className="card-body">
                      <div className="chart w-50 d-block mx-auto">
                      <Doughnut  data={data} options={options} />
                      </div>
                      </div>
                    </div>

                  </div>
                 </div>
                 {/* :
                 <h3 className="text-center">No Withdrawals!</h3>
               } */}

                </div>
                }
              </div>
            </div>

            {/* <div>
              <i className="fas fa-people-group bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 5 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(5)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Teams</h3>
                {
                    display !== 5 ? null:
                <div className="timeline-body">

                  <h3 className="ml-2 text-center text-danger"> <b>"Team One"</b></h3>
                {
                  userTeamOne.length !== 0 ?
                 <div className="row p-3">
                  {
                    userTeamOne.map((items,index)=>{
                      return(
                        <div key={index+1} className="col-lg-4">
                      <li className="m-3 text-warning" style={{listStyle:"none", fontSize:"1.5em"}}>User# <b>{index+1}</b> </li>
                      <li>Username:&nbsp;<b>{items.username}</b> </li>
                      <li>First Name:&nbsp;<b>{items.firstname}</b> </li>
                      <li>Last Name:&nbsp;<b>{items.lastname}</b> </li>

                      
                      <li>Referral Code:&nbsp;<b>{items.referal_code}</b> </li>
                      <li>Level:&nbsp;<b>{items.level}</b> </li>
                      <li>Email:&nbsp;<b>{items.email}</b></li>
                      <li>Phone:&nbsp;<b>{items.phone}</b></li>
                      <li>Cnic:&nbsp;<b>{items.cnic}</b> </li>

                      <li>Question:&nbsp;<b>{items.question}</b></li>
                      <li>Answer:&nbsp;<b>{items.answer}</b> </li>

                      <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;<b>{items.Idate}</b></li> 

                      <li style={{listStyle:"none"}}> <i className="fas fa-clock"/>&nbsp;&nbsp;&nbsp;<b><Moment date={items.updated_at} format="hh:mm:ss"/></b></li>
                      </div>
                    )
                })
              }

                 </div>
                 :
                 <h3 className="text-center">No Team Found!</h3>
          
               }


                </div>
                }
              </div>
            </div> */}
     
      

    
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
  )
}

export default UserTimelineModal