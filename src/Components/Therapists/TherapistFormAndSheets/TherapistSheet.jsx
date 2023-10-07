import TherapistTimelineModal from '../../Therapists/TherapistTimeline/TherapistTimelineModal';
import TherapistEndPoint from "../../Api/TherapistEndPoints.js";
import React, { useState , useEffect} from "react";
import colorScheme from "../../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Modal } from "pretty-modal";


const TherapistSheet = () => {
  const { mutate: chnagetherapistStatus } =TherapistEndPoint.useTherapistStatus();
  const {mutate:postAdminComments} = TherapistEndPoint.useAdminComment();


  const [therapists, setAllTherapists] = useState([]);


  // Hook's for normal search filter:

  const[firstname , setFirstName] = useState('');
  const[lastName , setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[contact , setContact] = useState('');


  // Hook's for advance search filter:
  const [date, setDate] = useState("");
  const[gender , setGender] = useState("");
  const[status , setStatus] = useState("")
  const [postcode, setPostcode] = useState("");

  const [stateID, setStateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const [therapistStatus, setTherapistStatus] = useState("ACTIVE");


  const[therapistID , setTherapistID] = useState('');
  const[adminComments , setAdminComments] = useState('');


  // Hook for pagination:
  const[pages , setPages] = useState(1);
  const[count , setCount] = useState('');

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


  const handleSelectGender = (e)=>{
    setGender(e.target.value)
  }

  const handleSelectStatus = (e)=>{
    setStatus(e.target.value)
  }


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

  function submitAdminComments(){
    const adminCommentObj = {
      therapist_id:therapistID,
      note:adminComments
    }

    postAdminComments(adminCommentObj)
    setAdminComments(" ")

  }

  const totalResults = count|| 0;
  const startResult = (pages - 1) * resultsPerPage + 1;
  const endResult = Math.min(pages * resultsPerPage, totalResults);



  // Changing Therapist Status function:
  function changingTherapistStatus() {
    chnagetherapistStatus({ stateID, therapistStatus });
  }

  // Filter function against different inputs(e.g. date,postcode,status, gender):
  const filterTherapistData =
      therapists.length > 0 && 
      firstname !== "" && lastName === ""&& email === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) => items.firstname === firstname)
      :
      firstname === "" && lastName !== ""&& email === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) => items.lastname === lastName)
      :
      firstname === "" && lastName === ""&& email !== "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) => items.email === email)
      :
      firstname === "" && lastName === ""&& email === "" && contact !== "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) => items.phone_number === contact)
      :
      firstname === "" && lastName === ""&& email === "" && contact === "" && date !== "" && gender === "" && postcode === "" && status === ""
      ? therapists.filter((items) => items.Idate === date)
      : 
      firstname === "" && lastName === ""&& email === "" && contact === "" &&  gender !== "" && date === "" && postcode === "" && status === ""
      ? therapists.filter((items) => items.gender === gender)
      : 
      firstname === "" && lastName === ""&& email === "" && contact === "" &&  postcode !== "" && date === "" && gender === "" && status === "" 
      ? therapists.filter((items) => items.postcode.includes(postcode))
      : 
      firstname === "" && lastName === ""&& email === "" && contact === "" &&  (status !== "" || status === "All") && date === "" && gender === "" && postcode === ""
      ? therapists.filter((items) => items.status === status)
      :
      
      (firstname !== "" && lastName !== "") && email === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.lastname === lastName) )
      :
      (firstname !== "" && email !== "") && lastName === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.email === email) )
      :
      (firstname !== "" && contact !== "") && lastName === "" && email === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.phone_number === contact) )
      :
      (firstname !== "" && date !== "") && lastName === "" && email === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.Idate === date) )
      :
      (firstname !== "" && gender !== "") && lastName === "" && email === "" && contact === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.gender === gender) )
      :
      (firstname !== "" && status !== "") && lastName === "" && email === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.status === status) )
      :
      (firstname !== "" && postcode !== "") && lastName === "" && email === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.firstname === firstname && items.postcode.includes(postcode)))
      :

      (lastName !== "" && firstname !== "") && email === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.firstname === firstname) )
      :
      (lastName !== "" && email !== "") && firstname === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.email === email) )
      :
      (lastName !== "" && contact !== "") && firstname === "" && email === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.phone_number === contact) )
      :
      (lastName !== "" && date !== "") && firstname === "" && email === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.Idate === date) )
      :
      (lastName !== "" && gender !== "") && firstname === "" && email === "" && contact === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.gender === gender) )
      :
      (lastName !== "" && status !== "") && firstname === "" && email === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.lastname === lastName && items.status === status) )
      :
      (lastName !== "" && postcode !== "") && firstname === "" && email === "" && contact === ""&& date === "" && status === "" && gender === ""
      ? therapists.filter((items) =>  (items.lastname === lastName && items.postcode.includes(postcode)))

      :
      (email !== "" && firstname !== "") && email === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.firstname === firstname) )
      :
      (email !== "" && lastName !== "") && firstname === "" && contact === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.lastname === lastName) )
      :
      (email !== "" && contact !== "") && firstname === "" && lastName === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.phone_number === contact) )
      :
      (email !== "" && date !== "") && firstname === "" && lastName === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.Idate === date) )
      :
      (email !== "" && gender !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.gender === gender) )
      :
      (email !== "" && status !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.email === email && items.status === status) )
      :
      (email !== "" && postcode !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.email === email && items.postcode.includes(postcode)))
      :
      (contact !== "" && firstname !== "") && email === "" && lastName === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.firstname === firstname) )
      :
      (contact !== "" && lastName !== "") && firstname === "" && email === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.lastname === lastName) )
      :
      (contact !== "" && email !== "") && firstname === "" && lastName === "" && date === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.phone_number === contact) )
      :
      (contact !== "" && date !== "") && firstname === "" && lastName === "" && email === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.Idate === date) )
      :
      (contact !== "" && gender !== "") && firstname === "" && lastName === "" && email === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.gender === gender) )
      :
      (contact !== "" && status !== "") && firstname === "" && lastName === "" && email === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.status === status) )
      :
      (contact !== "" && postcode !== "") && firstname === "" && lastName === "" && email === ""&& date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.postcode.includes(postcode)))
      :
      (date !== "" && firstname !== "") && email === "" && lastName === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.firstname === firstname) )
      :
      (date !== "" && lastName !== "") && firstname === "" && email === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.lastname === lastName) )
      :
      (date !== "" && email !== "") && firstname === "" && lastName === "" && contact === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.Idate === date) )
      :
      (date !== "" && contact !== "") && firstname === "" && lastName === "" && email === ""&& gender === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.Idate === date) )
      :
      (date !== "" && gender !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.Idate === date&& items.gender === gender) )
      :
      (date !== "" && status !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.status === status) )
      :
      (date!== "" && postcode !== "") && firstname === "" && lastName === "" && email === ""&& contact  === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.postcode.includes(postcode)))
      :
      (gender !== "" && firstname !== "") && email === "" && lastName === "" && contact === "" && date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.gender === gender && items.firstname === firstname) )
      :
      (gender !== "" && lastName !== "") && firstname === "" && email === "" && contact === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.gender === gender && items.lastname === lastName) )
      :
      (gender !== "" && email !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.email === email && items.gender === gender) )
      :
      (gender !== "" && contact !== "") && firstname === "" && lastName === "" && email === "" && date === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.gender === gender) )
      :
      (gender !== "" && date !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && status === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.gender === gender) )
      :
      (gender !== "" && status !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && date === "" 
      ? therapists.filter((items) =>  (items.gender === gender && items.status === status) )
      :
      (gender !== "" && postcode !== "") && firstname === "" && lastName === "" && email === ""&& contact  === "" && status === "" && date === "" 
      ? therapists.filter((items) =>  (items.gender === gender && items.postcode.includes(postcode)))
      :
      (status !== "" && firstname !== "") && email === "" && lastName === "" && contact === "" && date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.status === status && items.firstname === firstname) )
      :
      (status !== "" && lastName !== "") && firstname === "" && email === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.status === status && items.lastname === lastName) )
      :
      (status !== "" && email !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.email === email && items.status === status) )
      :
      (status !== "" && contact !== "") && firstname === "" && lastName === "" && email === "" && date === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.status === status) )
      :
      (status !== "" && date !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && gender === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.status === status) )
      :
      (gender !== "" && status !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && postcode === "" && date === "" 
      ? therapists.filter((items) =>  (items.gender === gender && items.status === status) )
      :
      (status !== "" && postcode !== "") && firstname === "" && lastName === "" && email === ""&& contact  === "" && gender === "" && date === "" 
      ? therapists.filter((items) =>  (items.status === status && items.postcode.includes(postcode)))
      :
      (postcode !== "" && firstname !== "") && email === "" && lastName === "" && contact === "" && date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.postcode.includes(postcode) && items.firstname === firstname))
      :
      (postcode !== "" && lastName !== "") && firstname === "" && email === "" && contact === ""&& date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.postcode.includes(postcode) && items.lastname === lastName))
      :
      (postcode !== "" && email !== "") && firstname === "" && lastName === "" && contact === ""&& date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.email === email && items.postcode.includes(postcode)))
      :
      (postcode !== "" && contact !== "") && firstname === "" && lastName === "" && email === "" && date === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.phone_number === contact && items.postcode.includes(postcode)))
      :
      (postcode !== "" && date !== "") && firstname === "" && lastName === "" && email === ""&& contact === "" && status === "" && gender === "" 
      ? therapists.filter((items) =>  (items.Idate === date && items.postcode.includes(postcode)))
      :
      (gender !== "" && postcode !== "") && firstname === "" && lastName === "" && email === "" && contact === "" && status === "" && date === "" 
      ? therapists.filter((items) =>  (items.gender === gender &&items.postcode.includes(postcode)))
      :
      (status !== "" && postcode !== "") && firstname === "" && lastName === "" && email === ""&& contact  === "" && gender === "" && date === "" 
      ? therapists.filter((items) =>  (items.status === status && items.postcode.includes(postcode)))
      : therapists
      
      useEffect(() => {
        setFilteredCount(filterTherapistData.length);
      }, [filterTherapistData])



  function TherapistSheet({ items, index }) {
    const [isShowUserModal,setShowUserModal] = useState(false)
    function onHide(){
      setShowUserModal(false)
    }
  
    return (
      <>
        <tr key={index} style={{ color: colorScheme.card_txt_color }} >
          {/* <td>{items.id}</td> */}
          <td>{filterTherapistData.length - index}</td>
          <td>{items.firstname}</td>
          <td>{items.lastname}</td>
          <td>{items.gender}</td>
          <td>{items.phone_number}</td>
          <td>{items.email}</td>
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
          <td >
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
            {
            items.postcode_address === null || "" || ![]?
            "no regions found"
            :
            items.postcode_address.map((regions)=>{
            return(
              <li
              key={regions}
              className="text-center"
              style={{ listStyleType: "none" }}
            >
              {regions}
            </li>
            )
          })}
          </td>

          <td>{items.image1_name === "" || null ? "No Title":items.image1_name }</td>

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

          <td>{items.image2_name === "" || null ? "No Title":items.image2_name }</td>

            <td>
              {
                items.image2 === null || ""? "No docs" :

                <object   
                src={`${process.env.REACT_APP_IMG_URL}${items.image2}`} 
                style={{ cursor: 'pointer' }}
                width={50}
                height={50}           
                title={`Document ${index + 1}`} 
                onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${items.image2}`,'_blank')}
                >
                  <i className="fa-solid fa-file-pdf text-danger fa-2x"></i>
                  </object>
              }
       
            </td>

            <td>{items.image3_name === "" || null ? "No Title":items.image3_name }</td>

                  <td>
                  {
                items.image3 === null || ""? "No docs" :
                  <object   
                  src={`${process.env.REACT_APP_IMG_URL}${items.image3}`} 
                  style={{ cursor: 'pointer' }}
                  width={50}
                  height={50}           
                  title={`Document ${index + 1}`} 
                  onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${items.image3}`,'_blank')}
                  >
                    <i className="fa-solid fa-file-pdf text-danger fa-2x"></i>
                    </object>
                  }
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
            &nbsp;&nbsp;

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

            &nbsp;&nbsp;

            <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal"
            data-bs-placement="left" title="admin comments"
            onClick={()=>{setTherapistID(items.id)}}
            >
            <i className="fa-solid fa-paperclip"></i>
          </button>

            &nbsp;&nbsp;
            <Link className="btn btn-outline-info btn-sm"  data-bs-toggle="tooltip" data-bs-placement="left" title="Therapist profile"  to={`/TherapistProfile/${items.id}`} state={{ID:items.id}}>
              <i className="fa fa-user"></i>
            </Link>&nbsp;&nbsp;

            {/* <button className="btn btn-outline-primary btn-sm"  data-bs-toggle="tooltip" title="Therapist Timeline" onClick={()=>{
              setShowUserModal(true)
              }}>
              <i className="fa-solid fa-timeline"></i>
            </button>  */}
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
                      <h5>Therapists List</h5>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Reset Filters
                      </button>

                        {/* Normal Search */}
                        <h5 className="mt-3">Normal Search:</h5>
                     <div className="row p-2">
                        <div className="col-lg-3 col-sm-12">
                          <label htmlFor="" className="form-label">
                            Search with Firstname:
                          </label>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by firstname..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3 col-sm-12">
                  <label htmlFor="" className="form-label">Search with Lastname*</label>
                  <div className="form-group">

                  <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Lastname..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                  </div>
                </div>

                
                <div className="col-lg-3 col-sm-12">
                  <label htmlFor=""  className="form-label">Search with Email*</label>
                  <div className="form-group">
                  <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Email..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                  </div>
                </div>

                        <div className="col-lg-3 col-sm-12">
                          <label htmlFor="" className="form-label">
                            Search with Contact:
                          </label>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Search by Contact..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setContact(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Normal Search */}
                      
                      {/* Advanced Search */}
                        <h5>Advance Search:</h5>
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
                                  <option value=" " >Select</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>

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
                                  <option value=" ">Select</option>
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
                      {/* Advanced Search */}
                      
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
                              <th>Email</th>
                              <th>Address</th>
                              <th>Services Provided</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Postcode</th>
                              <th>Regions</th>
                              <th>Docs Title1</th>
                              <th>Document 1</th>
                              <th>Docs Title2</th>
                              <th>Document 2</th>
                              <th>Docs Title3</th>
                              <th>Document 3</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {filterTherapistData.map((items, index) => {
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
                <button className="btn btn-outline-light btn-sm" onClick={handleNextPage} disabled={totalResults <= endResult}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <p >Showing {startResult} - {endResult} of {filteredCount} results  -  total :&nbsp;&nbsp;{count}</p>

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

                  {/* Query Modal Start  */}
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog" >
                <div className="modal-content" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:colorScheme.card_txt_color}}>Comment</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"  style={{color:colorScheme.card_txt_color}}>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea type="text" className="form-control" value={adminComments} placeholder=" Write comment here..." row={6} style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}} onChange={(e)=>setAdminComments(e.target.value)}/>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-info" onClick={submitAdminComments}>Submit</button>
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
  );
};

export default TherapistSheet;
