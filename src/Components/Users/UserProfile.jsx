import { Link, useLocation , useParams } from "react-router-dom";
import usersEndPoint from '../Api/UserEndPoint.js';
import React, { useState, useEffect } from "react";
import userEndPoint from "../Api/UserEndPoint.js";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import Profile from "../Images/avatar5.jpg";
import ReadMoreReact from "read-more-react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import Moment from "react-moment";
import axios from "axios";
import "moment-timezone";

const UserProfile = () => {
  const {mutate:postAdminComments} = usersEndPoint.useAdminComment();

  // const location = useLocation();
  // const { ID } = location.state;
  const { ID } = useParams();

  const [userProfile, setUserProfile] = useState("");
  const [bookingCounts, setBookingCounts] = useState("");

  const [userReview, setUserReview] = useState([]);
  const [reviewsCounts, setReviewCounts] = useState("");
  const [usersBooking, setUserBookings] = useState([]);

  const [lastBooking, setLastBooking] = useState("");
  const [lastBookingStatusCode, setLastBookingStatusCode] = useState("");

  const [therapistComment, setTherapistComment] = useState([]);

  const [fetchingAdminNotes, setFetchingAdminNotes] = useState([]);
  const[adminComments , setAdminComments] = useState('');

  const [index, setIndex] = useState("");

  const[loading , setLoading] = useState(false)


  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const[profileImg , setProfileImg] = useState(null)

  useQuery(["all_users", ID], (_) => userEndPoint.fetchUserWithID(ID), {
    onSuccess: (data) => {
      setUserProfile(data.data.data);
    },
    onError: (err) => {
      return err;
    },
  });
  function gettingUserLogins(){
    axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
    .then((res)=>{
        setUserEmail(res.data.data.email)

    })
    .catch((error)=>{
      return error;
    })
}

function submitLoginInfo(e){
  e.preventDefault()
  setLoading(true)

  var formdata = new FormData();
formdata.append("type_of_client",'');
formdata.append("residence_address", '');
profileImg && 
formdata.append("profile_pic",profileImg);
userEmail && 
formdata.append("email", userEmail);
password  &&
formdata.append("password", password);  


  axios.post(`${process.env.REACT_APP_BASE_URL}update_user/${ID}`,formdata)
  .then((res)=>{
    toast.info("Login Updated!",{theme:"dark"});
    setLoading(false)
    setPassword('')


  })
  .catch((error)=>{
    setLoading(false)
    toast.warn("Something went wrong",{theme:"dark"})
  })
}
  const formattedDate = userProfile.updated_at
    ? new Date(userProfile.updated_at).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  function gettingBookingCounts() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getBookingCount`, userObj)
      .then((res) => {
        setBookingCounts(res.data.booking_count);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingReviewsCount() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getRatingsAndReviewsByUserId`,
        userObj
      )
      .then((res) => {
        setReviewCounts(res.data.RatingsAndReviewsCount);
        setUserReview(res.data.RatingsAndReviews);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingUserBookings() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}fetch_bookings_userid`, userObj)
      .then((res) => {
        setUserBookings(res.data.Bookings);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingLastBooking() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getLastBookingDate`, userObj)
      .then((res) => {
        if (res.data.status === "200") {
          setLastBooking(res.data.last_booking_date);
          setLastBookingStatusCode(res.data.status);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLastBooking(err.response.data.message);
          setLastBookingStatusCode(err.response.status);
        }
      });
  }

  function fetchingTherapistComments() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}fetch_comments_by_uid`, userObj)
      .then((res) => {
        setTherapistComment(res.data.comments);
      })
      .catch((err) => {
        return err;
      });
  }

  function deleteTherapistComment(ID) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}delete_therapist_comment/${ID}`)
      .then((res) => {
        toast.error("Note Deleted!", { theme: "dark" });
        removeTherapistNote();
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  function removeTherapistNote() {
    setTherapistComment((prevState) => {
      const therapComment = [...prevState];
      therapComment.splice(index, 1);
      return therapComment;
    });
  }

  function fetchingAdminNote() {
    const userObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}fetch_notes`, userObj)
      .then((res) => {
        setFetchingAdminNotes(res.data.data);
      })
      .catch((err) => {
        return err;
      });
  }

  function deleteAdminNote(ID) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}delete_note/${ID}`)
      .then((res) => {
        toast.error("Note Deleted!", { theme: "dark" });
        removeAdminNote();
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  function removeAdminNote() {
    setFetchingAdminNotes((prevState) => {
      const adminComment = [...prevState];
      adminComment.splice(index, 1);
      return adminComment;
    });
  }

  function submitAdminComments(){
    alert(ID)
    const adminCommentObj = {
      user_id:ID,
      see_note:adminComments
    }
    postAdminComments(adminCommentObj)
    setAdminComments(" ")

  }

  useEffect(() => {
    gettingUserLogins();
    gettingUserBookings();
    gettingBookingCounts();
    gettingReviewsCount();
    gettingLastBooking();
    fetchingTherapistComments();
    fetchingAdminNote();
  }, []);

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
        <div
          className="content-wrapper"
          style={{ background: colorScheme.body_bg_color }}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 style={{ color: colorScheme.card_txt_color }}>
                    Client Profile
                  </h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}} onClick={logOut}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-lg-4">
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                       <div className="col-lg-4 ">
                      <Link
                        className="btn btn-outline-info btn-sm"
                        to="/UpdateUserForm"
                        state={{ ID: ID }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        {userProfile.profile_pic === "default" ? (
                          <img
                            className="img-fluid img-circle mt-4"
                            src={Profile}
                            alt="User_profile_picture"
                            width={140}
                          />
                        ) : (
                          <img
                            className="img-fluid img-circle mt-4"
                            src={`${process.env.REACT_APP_IMG_URL}${userProfile.profile_pic}`}
                            alt="User_profile_picture"
                            width={140}
                          />
                        )}
                      </div>
                      <h3 className="profile-username text-center">
                        {userProfile.firstname}
                      </h3>
                      <p className="text-center mt-4">Chill Casa Co.</p>

                      <div className="text-center">
     
                        {userProfile.type_of_client === "tourist" ? (
                          <button className="btn btn-info col-4">
                            {userProfile.type_of_client}
                          </button>
                        ) : (
                          <button className="btn btn-outline-info col-4">
                            Local
                          </button>
                        )}
                        &nbsp;&nbsp;
                        <button className="btn btn-outline-info col-4">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <i className="fa-solid fa-user fa-2x"></i>
                        </div>
                        <div className="col-sm-9 d-flex align-self-center">
                          {/* <h5 class=" mb-0">{ mem.username}</h5> */}
                          <h5 class=" mb-0">{userProfile.firstname}</h5>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <i className="fa-solid fa-envelope fa-2x"></i>
                        </div>
                        <div className="col-sm-9 d-flex align-self-center">
                          <h5 class=" mb-0">{userProfile.email}</h5>
                        </div>
                      </div>

                      <hr style={{ color: colorScheme.card_txt_color }} />

                      <div className="row">
                        <div className="col-sm-3">
                          <i className="fa-solid fa-phone fa-2x"></i>
                        </div>
                        <div className="col-sm-9 d-flex align-self-center">
                          <h5 class=" mb-0">{userProfile.phone_number}</h5>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <i className="fa-solid fa-calendar-days fa-2x"></i>
                        </div>
                        <div className="col-sm-9 d-flex align-self-center">
                          <h5 class=" mb-0">{userProfile.date_of_birth}</h5>
                        </div>
                      </div>
                      <hr />

                      <div className="row ">
                        <div className="col-sm-3">
                          <i className="fa-solid fa-home fa-2x"></i>
                        </div>
                        <div className="col-sm-9 d-flex align-self-center">
                          <h5 class=" mb-0">{userProfile.residence_address}</h5>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                          &nbsp; &nbsp; &nbsp;

                          <Link
                        className="btn btn-outline-info btn-sm"
                        to="/UpdateUserForm"
                        state={{ ID: ID }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                        </div>

                      </div>

                    </div>
                  </div>
                  <div className="d-flex justify-content-between p-3">
                    <button
                      className="btn btn-outline-primary col-lg-4 p-3 rounded"
                      data-toggle="modal"
                      data-target="#staticBackdrop"
                    >
                      Booking Management
                    </button>
                      &nbsp; &nbsp;
                    <button type="button" className="btn btn-outline-primary col-lg-4 p-3 rounded" data-toggle="modal" data-target="#exampleModal"
                    data-bs-placement="left" title="admin comments"
                    
                    >
                    Admin Comments
                  </button>
                  &nbsp;
                    <button
                      className="btn btn-outline-primary col-lg-4 p-3 rounded"
                      data-toggle="modal"
                      data-target="#staticBackdrop3"
                    >
                      Login Management
                    </button>

                    {/*  */}
                  </div>
                </div>

                <div className="col-lg-5">
                  <h4>Overview:</h4>
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Client Registeration Date:
                        </label>

                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            value={userProfile.Idate}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Type:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={userProfile.type_of_client}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-evenly align-items-center">
                        <label htmlFor="" className="form-label">
                          Booking Counts:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            className="form-control "
                            value={bookingCounts}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-outline-info btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#staticBackdrop"
                          >
                            Bookings
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-evenly align-items-center">
                        <label htmlFor="" className="form-label ">
                          Therapist Reviewed:&nbsp;
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={
                              reviewsCounts === "" || 0 || null
                                ? 0
                                : reviewsCounts
                            }
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-outline-info btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#staticBackdrop2"
                          >
                            Reviews
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Last Booking:
                        </label>
                        <div className="form-group">
                          {lastBookingStatusCode === "200" ? (
                            <input
                              type="text"
                              className="form-control"
                              value={lastBooking}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              disabled
                            />
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              value={"No Dates Found!"}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              disabled
                            />
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Last Time Active:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={formattedDate}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <label htmlFor="" className="form-label ">
                            Last Booking Address:
                          </label>
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              value={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, laborum nisi! Vel iure incidunt minima laboriosam deleniti quidem ad natus?`}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              row={10}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <h4>Therapist Notes:</h4>
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body table-responsive">
                      {therapistComment && therapistComment.length > 0 ? (
                        <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>Therapist Name</th>
                              <th>Note</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody className="text-center">
                            {therapistComment.map((items, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{ color: colorScheme.card_txt_color }}
                                >
                                  <td>{index + 1}</td>
                                  <td>{items.therapistname}</td>
                                  <td>
                                    <ReadMoreReact
                                      text={items.comment}
                                      min={10}
                                      ideal={20}
                                      max={50}
                                      readMoreText="...Read More"
                                    />
                                  </td>
                                  <td>{items.Idate}</td>

                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        className="btn btn-outline-info btn-sm"
                                        to={`/UpdateTherapistComment/${ID}`}
                                        state={{
                                          ID: items.id,
                                          TherapistComment: items.comment,
                                          ClientName: items.username,
                                        }}
                                      >
                                        <i className="fa fa-pen"></i>
                                      </Link>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                          deleteTherapistComment(items.id);
                                          setIndex(index);
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">
                          <h2>No Notes Found</h2>
                        </div>
                      )}
                    </div>
                  </div>

                  <h4>Admin Notes:</h4>
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body table-responsive">
                      {fetchingAdminNotes && fetchingAdminNotes.length > 0 ? (
                        <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>Notes</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody className="text-center">
                            {fetchingAdminNotes.map((items, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{ color: colorScheme.card_txt_color }}
                                >
                                  <td>{items.id}</td>
                                  <td>
                                    <ReadMoreReact
                                      text={items.see_note}
                                      min={10}
                                      ideal={20}
                                      max={50}
                                      readMoreText="...Read More"
                                    />
                                  </td>
                                  <td>
                                    <Moment
                                      date={items.created_at}
                                      format="YYYY/MM/DD"
                                    />
                                  </td>

                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        className="btn btn-outline-info btn-sm"
                                        to={`/UpdateAdminNote/${ID}`}
                                        state={{
                                          ID: items.id,
                                          Note: items.see_note,
                                        }}
                                      >
                                        <i className="fa fa-pen"></i>
                                      </Link>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                          deleteAdminNote(items.id);
                                          setIndex(index);
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">
                          <h2>No Notes Found</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Booking Modal */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <div
                  className="modal-content"
                  style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                  }}
                >
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Bookings
                    </h5>
                    <button
                      type="button"
                      className="close text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                    }}
                  >
                    <div className="row">
                      {usersBooking && usersBooking.length > 0 ? (
                        usersBooking.map((items, index) => {
                          return (
                            <div key={index} className="col-lg-6 col-sm-12 p-2">
                              <h5 className="text-warning">
                                Booking#{index + 1}
                              </h5>
                              <li>Client Name: {items.username}</li>
                              <li>Booking Date: {items.date}</li>
                              <li>Booking Time: {items.time}</li>
                              <li>Duration: {items.duration}</li>
                              <li>Price: {items.price}</li>
                              <li>Address: {items.address}</li>
                              {items.status === "Pending" ? (
                                <li className="text-danger">
                                  Status: {items.status}
                                </li>
                              ) : items.status === "In_progress" ? (
                                <li className="text-success">
                                  Status: {items.status}
                                </li>
                              ) : (
                                <li className="text-info">
                                  Status: {items.status}
                                </li>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center">
                          <h4 className="text-white">No Bookings Found!</h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Booking Modal */}

            {/* Users Review Modal */}
            <div
              className="modal fade"
              id="staticBackdrop2"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel2"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable ">
                <div
                  className="modal-content"
                  style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                  }}
                >
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel2"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Reviews
                    </h5>
                    <button
                      type="button"
                      className="close text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                    }}
                  >
                    <div className="row">
                      {userReview && userReview.length > 0 ? (
                        userReview.map((items, index) => {
                          return (
                            <div key={index} className="col-lg-6 col-sm-12 p-2">
                              <h5 className="text-info">Review#{index + 1}</h5>
                              <li>Name: {items.username}</li>
                              <li>Review: {items.review}</li>
                              <li>Rating: {items.rating} out of 5</li>
                              <li>Date: {items.Idate}</li>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center">
                          <h4 className="text-white">No Review Found!</h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Review Modal */}

            {/* Login Management Modal */}
            <div
              className="modal fade"
              id="staticBackdrop3"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel3"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable ">
                <div
                  className="modal-content"
                  style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                  }}
                >
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel3"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Logins
                    </h5>
                    <button
                      type="button"
                      className="close text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Email*
                          </label>
                          <input
                            type="email"
                            name="userEmail"
                            className="form-control"
                            id="exampleInputPassword4"
                            defaultValue={userEmail}
                            placeholder="Enter Email"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail2">
                            Password* 
                          </label>
                          <input
                            type="text"
                            name="Password"
                            className="form-control"
                            id="exampleInputEmail5"
                            placeholder="Enter Password"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal-footer"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                    }}
                  >
                    <button type="button" class="btn btn-outline-info"
                    onClick={submitLoginInfo}
                    >
                     {
                      loading === true ? "...loading": "Submit"
                     } 
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Management Modal */}


                              
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
          </section>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
