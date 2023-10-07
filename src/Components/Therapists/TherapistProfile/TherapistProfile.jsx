import TherapistBookingsModal from '../../Modals/TherapistBookingsModal.js';
import TherapistFinanceModal from '../../Modals/TherapistFinanceModal.js';
import ClientReviewModal from '../../Modals/ClientReviewModal.js';
import TherapistEndPoint from "../../Api/TherapistEndPoints.js";
import React, { useState, useEffect } from "react";
import colorScheme from "../../Colors/Styles.js";
import Profile from "../../Images/avatar5.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Moment from "react-moment";
import axios from "axios";
import "moment-timezone";

const TherapistProfile = () => {
  
  // const location = useLocation();
  // const { ID } = location.state;
  const { ID } = useParams();
  const { mutate: postAdminComments } = TherapistEndPoint.useAdminComment();

  const [therapistProfile, setTherapistProfile] = useState("");
  const [bookingCounts, setBookingCounts] = useState("");
  const [clientReviews, setClientReviews] = useState([]);
  const [reviewsCounts, setReviewCounts] = useState("");
  const [userReviews, setUsersReviews] = useState([]);

  const [rejectedBookingCount, setRejectedBookingCount] = useState("");

  const [lastBooking, setLastBooking] = useState("");
  const [lastBookingStatusCode, setLastBookingStatusCode] = useState("");

  const [fetchingAdminNotes, setFetchingAdminNotes] = useState([]);
  const [therapistBookings, setTherapistBookings] = useState([]);

  const [getTherapistWeekDays, setTherapistWeekDays] = useState([]);

  const [therapistEmail, setTherapistEmail] = useState("");
  const [password, setPassword] = useState("");


  const [adminComments, setAdminComments] = useState("");

 
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(false);

  useQuery(["therapist_by_ID", ID],(_) => TherapistEndPoint.getTherapistByID(ID),
    {
      onSuccess: (data) => {
        setTherapistProfile(data.data.data);
      },
      onError: (err) => {
        return err;
      },
    }
  );

  function submitLoginInfo(e) {
    e.preventDefault();
    setLoading(true);

    var formdata = new FormData();
    therapistEmail && formdata.append("email", therapistEmail);
    password && formdata.append("password", password);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}updatetherapistwithid/${ID}`,
        formdata
      )
      .then((res) => {
        toast.info("Login Updated!", { theme: "dark" });
        setLoading(false);
        setPassword("");
      })
      .catch((error) => {
        setLoading(false);
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  const formattedDate = therapistProfile.updated_at
    ? new Date(therapistProfile.updated_at).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  function gettingTherapistBookings() {
    const bookingObj = {
      therapist_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getBookingsByTherapistId`,
        bookingObj
      )
      .then((res) => {
        setTherapistBookings(res.data.Bookings);
        setBookingCounts(res.data.BookingCount);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingTherapistRejectedBookingCount() {
    const bookingObj = {
      therapist_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getRejectedBookingCountByTherapistId`,
        bookingObj
      )
      .then((res) => {
        setRejectedBookingCount(res.data.RejectedBookingCount);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingReviewsCount() {
    const therapistObj = {
      therapist_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getRatingsAndReviewsByTherapistId`,
        therapistObj
      )
      .then((res) => {
        setReviewCounts(res.data.RatingsAndReviewsCount);
        setUsersReviews(res.data.RatingsAndReviews);
        setClientReviews(res.data.RatingsAndReviews);
      })
      .catch((err) => {
        return err;
      });
  }

  function gettingLastBooking() {
    const therapistObj = {
      therapist_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getLastBookingDateByTid`,
        therapistObj
      )
      .then((res) => {
        if (res.data.status === "200") {
          setLastBooking(res.data.last_booking_date);
          setLastBookingStatusCode(res.data.status);
        }
      })
      .catch((err) => {
        if (err) {
          setLastBooking(err.response.data.message);
          setLastBookingStatusCode(err.response.status);
        }
      });
  }

  function gettingTherapistNextWeekDays() {
    const bookingsObj = {
      therapist_id: ID,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}getNextBookedDatesByTherapistId`,
        bookingsObj
      )
      .then((res) => {
        setTherapistWeekDays(res.data.NextBookedDates);
      })
      .catch((err) => {
        return err;
      });
  }

  const dateListWithDays = getTherapistWeekDays.map((therapistDates) => {
    const dates = new Date(therapistDates);
    const dayOfWeek = dates.toLocaleDateString("en-US", { weekday: "long" });
    return { therapistDates, dayOfWeek };
  });

  function delComments(ID) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}delete_ratingandreview/${ID}`)
      .then((res) => {
        toast.error("Review And Rating Deleted!", { theme: "dark" });
        removeReviewsAndRatings();
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  function removeReviewsAndRatings() {
    setUsersReviews((prevState) => {
      const revAndrating = [...prevState];
      revAndrating.splice(index, 1);
      return revAndrating;
    });
  }

  function fetchingNotes() {
    const fetchingObj = {
      therapist_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}fetch_admin_notes`, fetchingObj)
      .then((res) => {
        setFetchingAdminNotes(res.data.data);
      })
      .catch((err) => {
        return err;
      });
  }

  function submitAdminComments() {
    const adminCommentObj = {
      therapist_id: ID,
      note: adminComments,
    };

    postAdminComments(adminCommentObj);
    setAdminComments(" ");
  }

  function delAdminNote(ID) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}delete_admin_note/${ID}`)
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
      const revAndrating = [...prevState];
      revAndrating.splice(index, 1);
      return revAndrating;
    });
  }





  useEffect(() => {
    gettingTherapistBookings();
    gettingTherapistRejectedBookingCount();
    gettingReviewsCount();
    gettingLastBooking();
    gettingTherapistNextWeekDays();
    fetchingNotes();
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
                    Therapist Profile
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
                        to="/UpdateTherapist"
                        state={{ ID: therapistProfile.id }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        {therapistProfile.image === "default" || "" || null ? (
                          <img
                            className="img-fluid img-circle mt-4"
                            src={Profile}
                            alt="therapistProfile"
                            style={{ width: "8em" }}
                            // width={140}
                          />
                        ) : (
                          <img
                            className="img-fluid img-circle mt-4"
                            src={`${process.env.REACT_APP_IMG_URL}${therapistProfile.image}`}
                            alt="therapistProfile"
                            style={{ width: "9em" }}

                            // width={140}
                          />
                        )}
                      </div>
                      <h3 className="profile-username text-center">
                        {therapistProfile.firstname}&nbsp;{" "}
                        {therapistProfile.lastname}
                      </h3>
                      <p className="text-center mt-4">Chill Casa Co.</p>

                      <div className="text-center">
                        {/* <button className="btn btn-info col-4" onClick={()=>{
                          SendNotification("userID","Withdrawal Rejection", "queryOne")
                          }}>Follow</button>&nbsp;&nbsp;
                        <button className="btn btn-outline-info col-4">Message</button> */}
                        {therapistProfile.status === "ACTIVE" ? (
                          <button className="btn btn-info">
                            {therapistProfile.status}
                          </button>
                        ) : (
                          <button className="btn btn-outline-info">
                            IN-ACTIVE
                          </button>
                        )}
                        &nbsp;&nbsp;
                        <button className="btn btn-outline-info ">
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
                        <div className="col-sm-5">
                          <i className="fa-solid fa-user fa-2x"></i>
                        </div>
                        <div className="col-sm-7 d-flex align-self-center">
                          <h5 className=" mb-0">
                            {therapistProfile.firstname}
                          </h5>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-5">
                          <i className="fa-solid fa-envelope fa-2x"></i>
                        </div>
                        <div className="col-sm-7 d-flex align-self-center">
                          <h5 className=" mb-0">{therapistProfile.email}</h5>
                        </div>
                      </div>

                      <hr style={{ color: colorScheme.card_txt_color }} />

                      <div className="row">
                        <div className="col-sm-5">
                          <i className="fa-solid fa-phone fa-2x"></i>
                        </div>
                        <div className="col-sm-7 d-flex align-self-center">
                          <h5 className=" mb-0">
                            {therapistProfile.phone_number}
                          </h5>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-5">
                          <i className="fa-solid fa-calendar-days fa-2x"></i>
                        </div>
                        <div className="col-sm-7 d-flex align-self-center">
                          <h5 className=" mb-0">{therapistProfile.Idate}</h5>
                        </div>
                      </div>
                      <hr />

                      <div className="d-flex justify-content-between">
                        <i className="fa-solid fa-home fa-2x"></i>
                        <h5 className="mb-0 text-center">
                          {therapistProfile.address}
                        </h5>
                        <Link
                          className="btn btn-outline-info btn-sm"
                          to="/UpdateTherapist"
                          state={{ ID: therapistProfile.id }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between p-3">

                    <button
                      className="btn btn-outline-info col-lg-3 p-3 rounded"
                      data-toggle="modal"
                      data-target="#staticBackdrop"
                    >
                      Booking Management
                    </button>
                    &nbsp;&nbsp;

                    <button
                      className="btn btn-outline-info col-lg-3 p-3 rounded"
                      data-toggle="modal"
                      data-target="#staticBackdrop4"
                    >
                      Finance
                    </button>
                    &nbsp;&nbsp;

                    <button
                      className="btn btn-outline-info col-lg-3 p-3 rounded"
                      data-toggle="modal"
                      data-target="#staticBackdrop3"
                    >
                      Login Management
                    </button>
                    &nbsp;&nbsp;

                    <button
                      type="button"
                      className="btn btn-outline-info col-lg-3 p-3 rounded"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-bs-placement="left"
                      title="admin comments"
                      // onClick={()=>{setTherapistID(items.id)}}
                    >
                      Add Notes
                    </button>
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
                            value={therapistProfile.Idate}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Average Rating:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={therapistProfile.rating}
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
                          Review
                          Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={
                              reviewsCounts.length === 0 ? 0 : reviewsCounts
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
                          Total money earned:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={`€ ${
                              therapistProfile?.total_therapist_amount
                                ?.all_time || 0
                            }`}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Rejected Booking:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={rejectedBookingCount}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
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
                            List of services provided:
                          </label>
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              value={therapistProfile.category_name}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              row={10}
                            />
                          </div>
                        </div>
                      </div>

                      <label htmlFor="" className="form-label ">
                        Peronal Identification:
                      </label>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Qualification1:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={
                              therapistProfile.image1 === "" || null
                                ? "No Record Found"
                                : therapistProfile.image1
                            }
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Qualification2:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={
                              therapistProfile.image2 === null || ""
                                ? "No Record Found"
                                : therapistProfile.image2
                            }
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="" className="form-label ">
                          Qualification3:
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={
                              therapistProfile.image3 === null || ""
                                ? "No Record Found"
                                : therapistProfile.image3
                            }
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <h4>Timetable and locations:</h4>
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <label htmlFor="" className="form-label ">
                            Areas Covered:
                          </label>
                          <div className="form-group">
                            {(therapistProfile.postcode &&
                              therapistProfile.postcode.length > 0) ||
                            (therapistProfile.postcode_address &&
                              therapistProfile.postcode_address.length > 0) ? (
                              therapistProfile.postcode.map((areas, index) => {
                                const postcodeAddress =
                                  therapistProfile?.postcode_address?.[index];
                                const postcodeAndAddress =
                                  areas +
                                  (postcodeAddress
                                    ? " " + postcodeAddress
                                    : "");
                                return (
                                  <>
                                    <textarea
                                      key={index}
                                      type="text"
                                      className="form-control"
                                      value={postcodeAndAddress}
                                      style={{
                                        background: colorScheme.card_bg_color,
                                        color: colorScheme.card_txt_color,
                                      }}
                                    />
                                  </>
                                );
                              })
                            ) : (
                              <textarea
                                type="text"
                                className="form-control"
                                value={"No Area Found!"}
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            )}
                            <div className="row mt-2 ">
                              <div className="col-lg-2">
                                <p>Edit Postcode:</p>
                              </div>
                              <div className="col-lg-2 mt-2">
                                <Link
                                  className="btn btn-outline-info btn-sm"
                                  to="/UpdateTherapist"
                                  state={{ ID: therapistProfile.id }}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <label htmlFor="" className="form-label ">
                        Days:
                      </label>
                      <div className="row">
                        {dateListWithDays && dateListWithDays.length > 0 ? (
                          dateListWithDays.map((items) => {
                            return (
                              <div className="col-lg-4">
                                <p>{items.therapistDates}</p>
                                <p
                                  className="p-2 bg-info"
                                  style={{ border: "1px solid white" }}
                                >
                                  {items.dayOfWeek}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-white">No Days Found!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h4>Client Reviews:</h4>
                  <div
                    className="card p-1"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-body table-responsive">
                      {userReviews && userReviews.length > 0 ? (
                        <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>Client Name</th>
                              <th>Rating</th>
                              <th>Review</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody className="text-center">
                            {userReviews.map((items, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{ color: colorScheme.card_txt_color }}
                                >
                                  <td>{items.rating_id}</td>
                                  <td>{items.username}</td>
                                  <td>{items.rating}/5</td>

                                  <td>
                                    <ReadMoreReact
                                      text={items.review}
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
                                        to={`/UpdateReviewAndRating/${ID}`}
                                        state={{
                                          ID: items.rating_id,
                                          Rating: items.rating,
                                          Review: items.review,
                                        }}
                                      >
                                        <i className="fa fa-pen"></i>
                                      </Link>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                          delComments(items.rating_id);
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
                          <h2>No Data Found</h2>
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
                                      text={items.note}
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
                                        to={`/UpdateAdminComments/${ID}`}
                                        state={{
                                          ID: items.id,
                                          Note: items.note,
                                        }}
                                      >
                                        <i className="fa fa-pen"></i>
                                      </Link>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                          delAdminNote(items.id);
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
                          <h2>No Data Found</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* Therapist Booking Modal */}
             <TherapistBookingsModal therapistBookings={therapistBookings} />
              {/* Therapist Booking Modal */}

            {/* Client Review Modal */}
            <ClientReviewModal clientReviews={clientReviews}/>
            {/* Client Review Modal */}

            {/* Finance Management Modal */}
            <TherapistFinanceModal ID={ID}/>
            {/* Finance Management Modal */}

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
                          <label htmlFor="exampleInputPassword1">Email*</label>
                          <input
                            type="email"
                            name="therapistEmail"
                            className="form-control"
                            id="exampleInputPassword4"
                            defaultValue={therapistProfile.email}
                            placeholder="Enter Email"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) => setTherapistEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail2">Password*</label>
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
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      onClick={submitLoginInfo}
                    >
                      {loading === true ? "...loading" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Login Management Modal */}

            {/* Add Comments Modal  */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
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
                      id="exampleModalLabel"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Comment
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span
                        aria-hidden="true"
                        style={{ color: colorScheme.card_txt_color }}
                      >
                        &times;
                      </span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea
                      type="text"
                      className="form-control"
                      value={adminComments}
                      placeholder=" Write comment here..."
                      row={6}
                      style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                      }}
                      onChange={(e) => setAdminComments(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={submitAdminComments}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*Add Comments Modal */}
          </section>
        </div>
      </div>
    </>
  );
};

export default TherapistProfile;
