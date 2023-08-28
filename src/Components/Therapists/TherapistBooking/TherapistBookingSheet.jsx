import TherapistEndPoint from '../../Api/TherapistEndPoints.js';
import colorScheme from "../../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import ReadMoreReact from 'read-more-react';
import {useQuery} from 'react-query';
import { format } from 'date-fns';
import axios from 'axios';

const TherapistBookingSheet = () => {


    // Hook's for getting therapits availability:
    const[availableTherapists , setAvailableTherapists] = useState([]);
    const[checkStatus , setCheckStatus] = useState(false)


    // Hook's for search filter:
    const[startTime , setStartTime] = useState('');
    const[endTime , setEndTime] = useState('');
    const [combinedTimeSlots, setCombinedTimeSlots] = useState([]);

    const[dateForTimeslot ,setDateForTimeslot] = useState('')
    const[postcode, setPostcode] = useState('');

    // Hooks for pagination:
    const[pages , setPages] = useState(1);
    const[count , setCount] = useState('');

  const [filteredCount, setFilteredCount] = useState(0);

    
    // Hooks for getting current date & format:
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');

    // Time slots array:
    const availableTimeSlots = [
      "12:00am",
      "1:00am",
      "2:00am",
      "3:00am",
      "4:00am",
      "5:00am",
      "6:00am",
      "7:00am",
      "8:00am",
      "9:00am",
      "10:00am",
      "11:00am",
      "12:00pm",
      "1:00pm",
      "2:00pm",
      "3:00pm",
      "4:00pm",
      "5:00pm",
      "6:00pm",
      "7:00pm",
      "8:00pm",
      "9:00pm",
      "10:00pm",
      "11:00pm"
    ];

        // Start time/slot input functions:
        const handleStartTimeSlotChange = (e)=>{
          setStartTime(e.target.value)
        }

        // End time/slot input functions:
        const handleEndTimeSlotChange = (e)=>{
          setEndTime(e.target.value)
        }

  




    const resultsPerPage = 10;
    // function for getting page next:
      const handleNextPage = () => {
        setPages((prevPage) => prevPage + 1);
      };
    // function for getting previous page:
      const handlePrevPage = () => {
        setPages((prevPage) => Math.max(prevPage - 1, 1));
      };
    
      const formtedDateAndPageObj = {
        formattedDate,
        pages
      }

      const totalResults = count|| 0;
      const startResult = (pages - 1) * resultsPerPage + 1;
      const endResult = Math.min(pages * resultsPerPage, totalResults);

    // function for getting therapists against current date:
    useQuery(['all_available_therapits',formtedDateAndPageObj], _=> TherapistEndPoint.getAllAvailableTherapists(formtedDateAndPageObj),
    {
      refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            setAvailableTherapists(data.data.timeslots)
       },
       onError: (err) => {
        return err;
      }
    })



    // function for getting therapist specific date: 
    const  checkTherapistByDate = (e) => {
      const dateObj ={
        date :e.target.value
      }
            axios.post(`${process.env.REACT_APP_BASE_URL}getTimeslotsByDate?page=${pages}`,dateObj)
         .then((res)=>{
          setAvailableTherapists(res.data.timeslots)
          setCount(res.data.total_count)

          setCheckStatus(true)
         })
         .catch((err)=>{
          return err
         })
    
    
    }

    
    // function for getting therapist specific date  & time-slot: 
    const  checkTherapistByDateAndTime = () => {
    // const timeSlotArray = startTime.split(",").map((value)=> value.trim());
    const jsonEncodedTimeSlots =JSON.stringify(combinedTimeSlots)

      const dateAndTimeObj ={
        date : dateForTimeslot,
        time:jsonEncodedTimeSlots
      }

            axios.post(`${process.env.REACT_APP_BASE_URL}getTimeslotsByDateandTime?${pages}`,dateAndTimeObj)
         .then((res)=>{
          setAvailableTherapists(res.data.available_therapists)
          setCount(res.data.total_count)
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

    useEffect(() => {
      if (startTime && endTime) {
        const combinedSlots = [startTime, endTime];
        setCombinedTimeSlots(combinedSlots);
      } else {
        // Clear the combined slots if either startTime or endTime is empty
        setCombinedTimeSlots([]);
      }
  }, [startTime, endTime])




    
// Filter function against different inputs(e.g. date,email,username):

const filterTherapistData =  availableTherapists && availableTherapists.length > 0 && postcode !== "" ? availableTherapists.filter((items)=> items.postcode === postcode)
: availableTherapists

useEffect(() => {
  setFilteredCount(filterTherapistData.length);
}, [filterTherapistData])

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Available Therapists
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
              <div className="col-lg-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  
                  <div className="card-header">        
                    <h5>Available Therapists List</h5>

                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Refresh Page
                      </button>
                        
                  <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="" className="form-label">Search with Date:</label>&nbsp;&nbsp;&nbsp;

                          
                            <div className="form-group">
                            <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1"  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} onChange={(e)=>checkTherapistByDate(e)}/>
                            </div>
                    </div>

                    
                    <div className="col-sm-6">
                          <label htmlFor="" className="form-label">Search with Postcode/Region:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Postcode/Region..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setPostcode(e.target.value)}
                                />
                          </div>
                      </div>

                    </div>


                    <div className="row ">
                    <div className="col-lg-3 col-sm-12">
                      
                        <label htmlFor="" className="form-label">Select Start Time:</label>
                        
                  <select  className="form-control"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleStartTimeSlotChange}
                              >
                                  <option value="none">Select</option>
                                  {
                                    availableTimeSlots.map((time)=>{
                                      return(
                                        <option value={time}>{time}</option>
                                      )
                                    })
                                  }
                                 

                          </select>
                    </div>

                    <div className="col-lg-3 col-sm-12">
                      
                      <label htmlFor="" className="form-label">Select End Time:</label>
                      
                <select  className="form-control"
                          style={{
                            background: colorScheme.card_bg_color,
                            color: colorScheme.card_txt_color,
                            }}
                            onChange={handleEndTimeSlotChange}
                            >
                                <option value="none">Select</option>
                                {
                                  availableTimeSlots.map((time)=>{
                                    return(
                                      <option value={time}>{time}</option>
                                    )
                                  })
                                }
                               

                        </select>
                  </div>


                    <div className="col-lg-3 col-sm-12">
                      
                      <label htmlFor="" className="form-label">Select Date for timeslots:</label>
                          <div className="form-group">
                            <input type="date" className="form-control" 
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={(e)=> setDateForTimeslot(e.target.value)}
                            />
                      </div> 
                  </div>
                  <div className="col-lg-3 col-sm-12  align-self-center mt-3">
                  <button onClick={checkTherapistByDateAndTime} className="btn btn-outline-info">Check by slots</button>
                  
                  </div>
                  </div>

                    
                  </div>
                  <div className="card-body table-responsive p-2">

                    {

                availableTherapists &&  availableTherapists.length > 0  ?

                (
                <table className="table  text-nowrap">
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Therapist Services</th>
                        <th>Profile</th>
                        <th>Address</th>
                        <th>Postcode</th>
                        <th>Regions</th>
                        <th>Selected Date</th>
                        <th>Time/Slots</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                      {
                     filterTherapistData.map((items,index)=>{
                      return(
                        <tr key={index} style={{ color: colorScheme.card_txt_color }} >
                          <td>{filterTherapistData.length - index}</td>
                          <td>{items.firstname}</td>
                          <td>{items.lastname}</td>
                          <td>{items.gender}</td>
                          <td>{items.phone_number}</td>
                          <td>{items.category_name.map((category)=>{
                            return(
                              <li style={{listStyle:"none"}}>{category}</li>
                            )
                          })}
                          </td>
                          <td>
                          <img
                              src={`${process.env.REACT_APP_IMG_URL}${items.image}`}
                              alt=""
                              width={50}
                              />
                          </td>
                              <td>
                          <ReadMoreReact
                              text={
                                    items.address
                                }
                                min={10}
                                ideal={20}
                                max={50}
                              readMoreText="Read more..."
                            />  
                          </td>

                          <td>{
                           items.postcode === null || "" || ![]?
                           "No Postcode Found!"
                         :
                          items.postcode.map((postcode)=>{
                            return(
                              <li style={{listStyleType:"none"}}>{postcode}</li>
                            )
                          })}
                          
                          </td>

                          <td>
                          {
                          items.postcode_address === null || "" || ![]?
                            "No Regions Found!"
                          :
                          items.postcode_address.map((postcode_address)=>{
                            return(
                              <li style={{listStyleType:"none"}}>{postcode_address}</li>
                            )
                          })}
                          </td>
                          <td>{items.date}</td>
                          <td>
                          {Array.isArray(items.time) && items.time.length > 0 ? (
                                  items.time.map((time) => (
                                    <li style={{ listStyleType: "none" }}>{time}</li>
                                  ))
                                ) : (
                                  "No Time slots found!"
                                )}
                          </td>
                          {
                            items.status === "ACTIVE"?
                            <td className="text-success">
                            {
                              items.status
                            }
                            </td>
                            :
                            <td className="text-warning">
                            {
                              items.status
                            }
                            </td>

                          }

                        <td>{items.rating}</td>
                        <td>
                            .....
                          {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateTherapist" state={{ID:items.id}}>
                          <i className="fa fa-pen"></i>
                          </Link> */}
                          </td>


                        </tr>
                        
                      );
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

                  <button className="btn btn-outline-light btn-sm" onClick={handlePrevPage} disabled={pages === 1}>
                <i className="fa-solid fa-arrow-left"></i>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-light btn-sm" onClick={handleNextPage} disabled={totalResults <= endResult}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <p >Showing {startResult} - {endResult} of {filteredCount} results</p>


                    {/* {remainingThreapistCount && remainingThreapistCount.length > 0 && (
                      // only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )} */}
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