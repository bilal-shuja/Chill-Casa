import usersEndPoint from '../Api/UserEndPoint.js';
import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import ReadMoreReact from "read-more-react";
import {Link} from 'react-router-dom';
import {useQuery} from 'react-query';
import { Modal } from "pretty-modal";


const UserBookingSheet = () => {
  const { mutate: changetherapistStatus } = usersEndPoint.useTherapistBookingStatus();

    const [allBookings , setAllBookings] = useState([])
    const [count, setCount] = useState('');
    const[pages, setPages] = useState(1);

    const [stateID, setStateID] = useState("");
    const [isOpen, setIsOpen] = useState(false);

      // Hook's for normal search filter:

  const[UserName , setUserName] = useState('');
  const[therapistName , setTherapistName] = useState('');
  const[status , setStatus] = useState('');

  
  const [bookingStatus, setBookingStatus] = useState("In_progress");




    useQuery(['all_user_bookings',pages], _=> usersEndPoint.fetchAllUserBookings(pages),{
      onSuccess:(data)=>{
        setAllBookings(data.data.Bookings);
        setCount(data.data.TotalCount)

     },
     onError: (err) => {
      return err;
    }
  }
  
   )

   const handleSelectStatus = (e)=>{
    setStatus(e.target.value)
  }

   const filterBookingtData =
   allBookings.length > 0 && 
   UserName !== "" && therapistName === "" && status === "" 
   ? allBookings.filter((items) => items.username === UserName)
    :
    UserName === "" && therapistName !== "" && status === "" 
    ? allBookings.filter((items) => items.therapist_name === therapistName)
    :
    UserName === "" && therapistName === "" && status !== "" 
    ? allBookings.filter((items) => items.status === status)
   : allBookings

   
   function changingTherapistBookingStatus() {
    changetherapistStatus({ stateID, bookingStatus });
  }


          
  const [filteredCount, setFilteredCount] = useState(0);
  const resultsPerPage = 10;
  // function for getting page next:
    const handleNextPage = () => {
      setPages((prevPage) => prevPage + 1);
    };
  // function for getting previous page:
    const handlePrevPage = () => {
      setPages((prevPage) => Math.max(prevPage - 1, 1));
    };

   const totalResults = count|| 0;
   const startResult = (pages - 1) * resultsPerPage + 1;
   const endResult = Math.min(pages * resultsPerPage, totalResults);

   useEffect(() => {
    setFilteredCount(filterBookingtData.length);
  }, [filterBookingtData])

  return (
    <>
         <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Bookings
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
                    <h5>Bookings Sheet</h5>   

                             {/* Normal Search */}
                     <div className="row p-2">
                        <div className="col-lg-4 col-sm-12">
                          <label htmlFor="" className="form-label">
                            Search with Client Name:
                          </label>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Client Name..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                  <label htmlFor="" className="form-label">Search with Therapist Name*</label>
                  <div className="form-group">

                  <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Therapist Name..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setTherapistName(e.target.value)}
                            />
                  </div>
                </div>

                

                        <div className="col-lg-4 col-sm-12">
                          <label htmlFor="" className="form-label">
                            Search with Status:
                          </label>
                          <select  className="form-control"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectStatus}
                              >
                                  <option value="none" disabled>Select</option>
                                  <option value="Pending">Pending</option>
                                  <option value="In_progress">In_progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>

                          </select>
                        </div>
                      </div>
                      {/* Normal Search */}
                  </div>
                  <div className="card-body table-responsive p-2">
                  {
                    allBookings && allBookings.length > 0?
                    <table className="table  text-nowrap">
                    <thead className="text-center">
                      <tr>
                          <th>#</th>
                        <th>Client Name</th>
                        <th>Therapist Name</th>
                        <th>Address</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {      
                      
                      filterBookingtData.map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{index+1}</td>
                            <td>{items.username}</td>
                            <td>{items.therapist_name}</td>

                            <td>  
                              <ReadMoreReact
                                      text={items.address}
                                      min={10}
                                      ideal={15}
                                      max={25}
                                      readMoreText="...Read More"
                                    />
                                    </td>
                             <td>{items.date}</td>
                             <td>{items.time}</td>
                             <td>{items?.category_name?.map((item)=>{
                              return(
                                <li
                                key={item}
                                className="text-center"
                                style={{ listStyleType: "none" }}
                              >
                                {item}
                              </li>
                              )
                             })}</td>
                            <td>{items.price}</td>
                            <td>{items.duration}</td>
                            {
                              items.status === "In_progress" ?
                              <td className="text-primary">{items.status}</td>
                              :
                              items.status === "Completed" ?
                              <td className="text-success">{items.status}</td>
                              :
                              items.status === "Cancelled" ? 
                              <td className="text-danger">{items.status}</td>

                              :
                              <td className="text-warning">{items.status}</td>

                            }
                            <td>
                             <div className="d-flex justify-content-center">
                             <Link className="btn btn-outline-info btn-sm" to="/UpdateBookingDateTime" state={{ID:items.booking_id , Date:items.date , Time:items.time , Address:items.address , CategoryName: items.category_name}}>
                                  <i className="fa fa-pen"></i>
                                </Link>&nbsp;&nbsp;
                              {/* <button className="btn btn-outline-danger btn-sm" onClick={()=>deletePayment(items.id)}>
                                  <i className="fa fa-trash"></i>
                                </button> */}
                                      <button
                                        onClick={() => {
                                          setIsOpen(true);
                                          setStateID(items.booking_id);
                                        }}
                                        className="btn btn-outline-warning btn-sm"
                                        data-bs-toggle="tooltip" title="Change Status"
                                      >
                                        <i className="fa-solid fa-spinner"></i>
                                      </button>

                             
                              </div>   
                            </td>
                            
                          </tr>
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
                <p >Showing {startResult} - {endResult} of {filteredCount} results</p>
                    
                  </div>
                </div>

                
                <Modal
                    onClose={() => {
                      setIsOpen(false);
                    }}
                    open={isOpen}
                  >
                    <div className="card-body ">
                      <div className="form-group">
                        <p className="text-white">
                          <b>Change Status</b>
                        </p>
                        <select
                          className="form-control-sm"
                          aria-label="Default select example"
                          style={{
                            background: colorScheme.card_bg_color,
                            color: colorScheme.card_txt_color,
                            paddingRight: "11em",
                          }}
                          onChange={(e) => setBookingStatus(e.target.value)}
                        >
                          <option value="None">Select</option>
                          <option value="In_progress">In_progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          changingTherapistBookingStatus();
                        }}
                        className="btn btn-outline-info btn-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </Modal>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    </>
  )
}

export default UserBookingSheet