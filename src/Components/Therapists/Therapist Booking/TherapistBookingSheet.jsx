import TherapistEndPoint from '../../Api/TherapistEndPoints.js';
import colorScheme from "../../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import ReadMoreReact from 'read-more-react';
// import {toast} from "react-toastify";
import {Link} from 'react-router-dom';
import {useQuery} from 'react-query';
import { format } from 'date-fns';
import axios from 'axios';
// import Moment from 'react-moment';
// import 'moment-timezone';
const TherapistBookingSheet = () => {


    // Hook's for getting therapits availability:
    const[availableTherapists , setAvailableTherapists] = useState([]);
    const[checkStatus , setCheckStatus] = useState(false)


    // Hook's for search filter:
    const[date , setDate] = useState('');
    const[email , setEmail] = useState('');
    const[userName, setUsername] = useState('');
    
    //Hook for getting date 
    const[checkByDate, setCheckByDate] = useState('')

    // Hook for showing specific length in table:
    const[showLength, setShowLength] = useState(10);

    // function for showing specific length in table:
    const remainingThreapistCount = availableTherapists && availableTherapists.length > 0 ? "Loading...": availableTherapists? availableTherapists.slice(showLength) : [];
    
    // Hooks for getting current date & format:
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');



    // function for getting therapists against current date:
    useQuery(['all_available_therapits',formattedDate], _=> TherapistEndPoint.getAllAvailableTherapists(formattedDate),
    {
      refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            setAvailableTherapists(data.data.bookings)
       },
       onError: (err) => {
        return err;
      }
    })



    // function for getting therapist specific date: 
    const  checkTherapistByDate = () => {
      const dateObj ={
        date :checkByDate
      }
            axios.post(`${process.env.REACT_APP_BASE_URL}fetchbookings_withdate`,dateObj)
         .then((res)=>{
          setAvailableTherapists(res.data.bookings)
          setCheckStatus(true)
         })
         .catch((err)=>{
          return err
         })
    
    
    }
    

    useEffect(() => {
        const formatted = format(currentDate, 'yyyy-MM-dd');
          setFormattedDate(formatted);
    }, [currentDate])




    
// Filter function against different inputs(e.g. date,email,username):

const filterTherapistData =  availableTherapists && availableTherapists.length > 0 &&  date !=='' &&  email === ''  && userName === ''? availableTherapists.filter((items)=> items.Idate === date)
:email !== "" &&  date ==='' && userName === "" ? availableTherapists.filter((items)=> items.email === email)
:userName !== "" && date === "" && email === ""? availableTherapists.filter((items)=> items.therapist_name === userName)
: availableTherapists

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Therapists
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
                       {/* <div className="col-lg-3 ">
                          <div className="form-group">
                                  <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} onChange={(e)=>setCheckByDate(e.target.value)}/>
                          </div>
                          <div className="col-lg-3">
                          <button onClick={()=> approveDepoByDate()} className="btn btn-sm btn-outline-info">
                            Check 
                          </button>
                          </div>
                  
                          </div> */}
              <div className="col-lg-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  
                  <div className="card-header">        
                    <h5>Therapists Sheet</h5>
                    <div className="row">
                        <div className="col-lg-3 col-sm-3">
                        <div className="form-group">
                            <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1"  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} onChange={(e)=>setCheckByDate(e.target.value)}/>
                        </div>
                        </div>

                        <div className="col-lg-3 mt-1">
                          <button onClick={()=> checkTherapistByDate()} className="btn btn-sm  btn-outline-info">
                            Check
                          </button>
                          &nbsp;&nbsp;
                          <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                          </div>
                    </div>
                 
                        
                        <div className="row p-2">


                      {/* <div className="col-sm-6">
                        <label htmlFor="" className="form-label">Search with Email:</label>
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
                  */}
                    <div className="col-sm-4">
                        <label htmlFor="" className="form-label"> Search with Username:</label>
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

                    <div className="col-sm-4">
                          <label htmlFor="" className="form-label">Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setDate(e.target.value)}
                                />
                          </div>
                      </div>

                    </div>

         
                    
                  </div>
                  <div className="card-body table-responsive p-2">

                    {

                (availableTherapists &&  availableTherapists.length > 0 ) ?

                (
                <table className="table  text-nowrap">
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Therapist Name</th>
                        <th>Therapist Category</th>
                        <th>Consumer Name</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                      {
                     filterTherapistData.filter((items, index)=> index <= showLength).map((items,index)=>{
                      return(
                          <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                          <td>{filterTherapistData.length - index}</td>
                          <td>{items.therapist_name}</td>
                          <td>{items.category_title}</td>
                          <td>{items.username}</td>
                          <td>
                          <ReadMoreReact
                                text={
                                 items.address
                                }
                                min={10}
                                ideal={20}
                                max={50}
                                readMoreText="...Read More"
                              />                            
                          </td>
                          <td>{items.price}</td>
                          <td>{items.date}</td>
                          <td>{items.time}</td>
                          <td>{items.duration}</td>
                          <td>{items.status}</td>

                          <td>
                            .....
                          {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateTherapist" state={{ID:items.id}}>
                          <i className="fa fa-pen"></i>
                          </Link> */}
                          </td>
                          </tr>
                      )
                     })
                      
                      }

                    </tbody>
                    
                  </table>
                )
                  
                :

                  (
                    <div className="text-center">
                    <h2>No Record Found</h2>
                    </div>
                  )
                
                    }

                    {remainingThreapistCount && remainingThreapistCount.length > 0 && (
                      // only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )}
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

export default TherapistBookingSheet