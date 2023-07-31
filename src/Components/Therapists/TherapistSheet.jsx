import TherapistTimelineModal from '../UserTimeline/UserTimelineModal';
import TherapistEndPoint from "../Api/TherapistEndPoints.js";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "pretty-modal";


const TherapistSheet = () => {
  const { mutate: chnagetherapistStatus } =TherapistEndPoint.useTherapistStatus();

  const [therapists, setAllTherapists] = useState([]);

  // Hook's for search filter:
  const [date, setDate] = useState("");
  const[gender , setGender] = useState("");
  const[status , setStatus] = useState("")
  const [postcode, setPostcode] = useState("");

  const [stateID, setStateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //Hook for setting-up entries in table:
  const [showLength, setShowLength] = useState(20);

  const [therapistStatus, setTherapistStatus] = useState("ACTIVE");

  // Hook for pagination:
  const[pages , setPages] = useState(1);
  const[count , setCount] = useState('');


  const resultsPerPage = 10;
// function for getting page next:
  const handleNextPage = () => {
    setPages((prevPage) => prevPage + 1);
  };
// function for getting previous page:
  const handlePrevPage = () => {
    setPages((prevPage) => Math.max(prevPage - 1, 1));
  };


  const handleSelectGender = (e)=>{
    setGender(e.target.value)
  }

  const handleSelectStatus = (e)=>{
    setStatus(e.target.value)
  }
  //  Method for getting specific amount of entities in table:
  const remainingThreapistCount =
    therapists && therapists.length > 0
      ? "...Loading"
      : therapists.slice(showLength);

  // Getting all therapists function:
  useQuery(["all_therapits", pages], _=> TherapistEndPoint.getAllTherapists(pages), {
    onSuccess: (data) => {
      setAllTherapists(data.data.Therapists);
      setCount(data.data.total_therapists)
    },
    onError: (err) => {
      return err;
    },
  });

  const totalResults = count|| 0;
  const startResult = (pages - 1) * resultsPerPage + 1;
  const endResult = Math.min(pages * resultsPerPage, totalResults);



  // Changing Therapist Status function:
  function changingTherapistStatus() {
    chnagetherapistStatus({ stateID, therapistStatus });
  }

  // Filter function against different inputs(e.g. date,postcode,status, gender):
  const filterTherapistData =
    therapists.length > 0 && date !== "" && gender === "" && postcode === "" && status === ""
      ? therapists.filter((items) => items.Idate === date)
      : gender !== "" && date === "" && postcode === "" && status === ""
      ? therapists.filter((items) => items.gender === gender)
      : postcode !== "" && date === "" && gender === "" && status === "" 
      ? therapists.filter((items) => items.postcode === postcode)
      : status !== "" && date === "" && gender === "" && postcode === ""
      ? therapists.filter((items) => items.status === status)
      : therapists
      

  function TherapistSheet({ items, index }) {
    const [isShowUserModal,setShowUserModal] = useState(false)
    function onHide(){
      setShowUserModal(false)
    }
  
    return (
      <>
        <tr key={index} style={{ color: colorScheme.card_txt_color }} >
          <td>{filterTherapistData.length - index}</td>
          <td>{items.firstname}</td>
          <td>{items.lastname}</td>
          <td>{items.gender}</td>
          <td>{items.phone_number}</td>
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


          <td>
            {items.category_name === null
              ? "no category found"
              : items.category_name.map((categories) => {
                  return (
                    <li
                      key={categories}
                      className="text-center"
                      style={{ listStyleType: "none" }}
                    >
                      {" "}
                      {categories}
                    </li>
                  );
                })}
          </td>
          {items.status === "ACTIVE" ? (
            <td style={{ color: "#4caf50" }}>
              <h6>{items.status}</h6>
            </td>
          ) : (
            <td className="text-warning">
              {" "}
              <h6>{items.status}</h6>{" "}
            </td>
          )}
          <td>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${items.image}`}
              alt=""
              width={50}
            />
          </td>
          <td style={{textTransform:"uppercase"}}>
            {
            items.postcode === null || "" || ![]?
            "no postcode found"
            :
            items.postcode.map((postcodes)=>{
            return(
              <li
              key={postcodes}
              className="text-center"
              style={{ listStyleType: "none" }}
            >
              {postcodes}
            </li>
            )
          })}
          </td>

          <td>
          <object   
          src={`${process.env.REACT_APP_IMG_URL}${items.image1}`} 
          style={{ cursor: 'pointer' }}
           width={50}
           height={50}           
           title={`Document ${index + 1}`} 
           onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${items.image1}`,'_blank')}
           >
            <i className="fa-solid fa-file-pdf text-danger fa-2x"></i>
            </object>
          </td>


          <td>{items.Idate}</td>

          <td>
            <Link
              className="btn btn-outline-info btn-sm"
              to="/UpdateTherapist"
              state={{ ID: items.id }}
              data-bs-toggle="tooltip" title="Update Postcode"

            >
              <i className="fa fa-pen"></i>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              onClick={() => {
                setIsOpen(true);
                setStateID(items.id);
              }}
              className="btn btn-outline-warning btn-sm"
              data-bs-toggle="tooltip" title="Change Status"
            >
              <i className="fa-solid fa-spinner"></i>
            </button>

            &nbsp;&nbsp;&nbsp;

            <button className="btn btn-outline-primary btn-sm"  data-bs-toggle="tooltip" title="Therapist Timeline" onClick={()=>{
              setShowUserModal(true)
              }}>
              <i className="fa-solid fa-timeline"></i>
            </button> 
          </td>
        </tr>

            {
              isShowUserModal === true &&
              <TherapistTimelineModal
              ID = {items.id}
              isShow = {isShowUserModal}
              onHide={onHide}
              />
            }
          </>
    );
  }

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
        <div
          className="content-wrapper p-3"
          style={{ background: colorScheme.body_bg_color }}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 style={{ color: colorScheme.card_txt_color }}>
                    Therapists
                  </h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right"></ol>
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
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">
                      <h5>Therapists Sheet</h5>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Reset Filters
                      </button>
                      <div className="row p-2">
                        <div className="col-lg-3 col-sm-12">
                          <label htmlFor="" className="form-label">
                            Search with Date:
                          </label>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Search by Date..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3 col-sm-12">
                  <div className="form-group">
                  <label htmlFor="exampleInputEmai11">Search with Gender*</label>

                  <select  className="form-control"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectGender}
                              >
                                  <option value="none">Select</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>

                          </select>
                  </div>
                </div>

                
                <div className="col-lg-3 col-sm-12">
                  <div className="form-group">
                  <label htmlFor="exampleInputEmai11">Search with Status*</label>

                  <select  className="form-control"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectStatus}
                              >
                                  <option value="none">Select</option>
                                  <option value="ACTIVE">ACTIVE</option>
                                  <option value="IN-ACTIVE">IN-ACTIVE</option>

                          </select>
                  </div>
                </div>

                        <div className="col-lg-3 col-sm-12">
                          <label htmlFor="" className="form-label">
                            {" "}
                            Search with Postcode:
                          </label>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Postcode..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setPostcode(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body table-responsive p-2">
                      {therapists && therapists.length > 0 ? (
                        <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              {/* <th>ID</th> */}
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Gender</th>
                              <th>Contact</th>
                              <th>Address</th>
                              <th>Services Provided</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Regions/Postcode</th>
                              <th>Documents</th>
                              <th>Date</th>
                              {/* {
                          roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6" ?  null: */}
                              <th>Actions</th>
                              {/* } */}
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {filterTherapistData
                              .filter((items, index) => index <= showLength)
                              .map((items, index) => {
                                return (
                                  <TherapistSheet items={items} index={index} />
                                );
                              })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">
                          <h2>No Record Found</h2>
                        </div>
                      )}
                      
                  <button className="btn btn-outline-light btn-sm" onClick={handlePrevPage} disabled={pages === 1}>
                <i className="fa-solid fa-arrow-left"></i>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-light btn-sm" onClick={handleNextPage} disabled={totalResults <= 10}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <p >Showing {startResult} - {endResult} of {totalResults} results</p>

                      {/* {remainingThreapistCount &&
                        remainingThreapistCount.length > 0 && (
                          // only display the "Show More" button if there are more rows to show
                          <button
                            className="btn btn-outline-info"
                            onClick={() => setShowLength(showLength + 30)}
                          >
                            Show More
                          </button>
                        )} */}
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
                          onChange={(e) => setTherapistStatus(e.target.value)}
                        >
                          <option value="None">Select</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="IN-ACTIVE">IN-ACTIVE</option>
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          changingTherapistStatus();
                        }}
                        className="btn btn-outline-info btn-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </Modal>

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
  );
};

export default TherapistSheet;
