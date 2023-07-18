import UserTimelineModal from "../UserTimeline/UserTimelineModal";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import QuerySelect from "./QuerySelection.js";
import { toast } from "react-toastify";
import Filter from "../Filters/Filter";
import { Modal } from "pretty-modal";
import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";

const RewardApprovalSheet = () => {
  const [promotionSheet, setPromotionSheet] = useState([]);
  const [promotionSheetTemArr, setpromotionSheetTempArr] = useState([]);
  const [roleID, setRoleID] = useState("");
  const [getRewardStat, setRewardStat] = useState("");

  const[memID , setMemID] = useState('');
  const [getImage, setImage] = useState(""); 
  const[FirstName , setFirstName] = useState('');
  const[LastName , setLastName] = useState('');
  const[memCnic , setMemCinc] = useState('')
  const [queryOne, setQueryOne] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [rotateImg, setRotateImg] = useState("");
  const [receID, setReceID] = useState("");
  const [hostMessage, setHostMessage] = useState("");
  const [senderID, setSenderID] = useState("");
  const [showLength, setShowLength] = useState(30);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");

  const[rewardAppSum , setRewardAppSum] = useState('')

  const PromotionSheetIdentifier = "PromotionSheet";

  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem("user");
      let parseUserObj = JSON.parse(userObj);

      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id);
        setSenderID(parseUserObj.id);
        gettingPromoStatus(parseUserObj.id);
      }
    } catch {
      return null;
    }
  };

  function gettingRewards() {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}fetch_all_rewards`)
      .then((res) => {
        setPromotionSheet(res.data.Rewards);
        setpromotionSheetTempArr(res.data.Rewards);
        console.log(res.data.Rewards);
      })
      .catch((error) => {
        return error;
      });
  }

  // select the remaining rows
  const remainingPromoUsers = promotionSheet.slice(showLength);

  function changingRewardAppStatus(memID){
    const rewardObj = {
      member_id:memID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}update_reward_status_bymid`,rewardObj)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.info(`Reward ${res.data.message}`,{theme:"dark"});
        geneRewardNotification(memID)
      }
      else{
        toast.info(`Reward${res.data.message}`,{theme:"dark"});

      }
    })
    .catch((error)=>{
      if(error.status === "401"){
      toast.warn(error.data.message,{theme:"dark"});

      }
      toast.warn("Something went wrong",{theme:"dark"});
    })

  }

  function changingRewardRejStatus(memID){
    const rewardObj = {
      member_id:memID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}update_reward_status_bymid`,rewardObj)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.warn(`Reward ${res.data.message}`,{theme:"dark"});
      }
      else{
        toast.info(`Reward${res.data.message}`,{theme:"dark"});

      }
    })
    .catch((error)=>{
      if(error.data.status === "401"){
      toast.warn(error.data.message,{theme:"dark"});

      }
      toast.warn("Something went wrong",{theme:"dark"});
    })

  }



  function removeUserFromRewardSheet() {
    setpromotionSheetTempArr((prevState) => {
      const tasks = [...prevState];
      tasks.splice(index, 1);
      return tasks;
    });
  }

  function RewardRejection(){
    setLoading(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}delete_reward/${memID}`)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.info(`Reward Approval Rejected!`,{theme:"dark"});
        geneNotification();
        removeUserFromRewardSheet();
        setLoading(false);

      }
      else{
        toast.info(`${res.data.message}`,{theme:"dark"});

      }

    })
    .catch((error)=>{
      if(error.status === "401"){
      toast.warn(error.data.message,{theme:"dark"});

      }
      toast.warn("Something went wrong",{theme:"dark"});
    })

  }


  function geneNotification(){
    const notifiObj ={
      receiver_id:memID,
      body:queryOne,
      title:"Reward Rejection"
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}post_notification`,notifiObj)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.info("Notified to User",{theme:"dark"});
        setQueryOne('');
      }
      else{
        toast.info(`${res.data.message}`,{theme:"dark"});

      }
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});

    })
  }

  function geneRewardNotification(memID){
    const notifiObj ={
      receiver_id:memID,
      body:`Congratulations! You got reward of $5 from PLShare`,
      title:"Reward amount received"
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}post_notification`,notifiObj)
    .then((res)=>{
      if(res.data.status === '200'){
        toast.info("Notified to User",{theme:"dark"});
      }
      else{
        toast.info(`${res.data.message}`,{theme:"dark"});

      }
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});

    })
  }
  
  function gettingRewardAppSum() {
    const getRewardAppSum = promotionSheetTemArr.reduce((acc, curr) => acc + +curr.amount, 0);
    setRewardAppSum(getRewardAppSum);
  }

  function gettingPromoStatus(ID) {
    const getPromoObj = {
      user_id: ID,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getcheck`, getPromoObj)
      .then((res) => {
        setRewardStat(res.data.check);
      })
      .catch((error) => {
        return error;
      });
  }

  function startPromo() {
    const startPromoObj = {
      check: "0",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}updatecheck`, startPromoObj)
      .then((res) => {
        gettingPromoStatus();

        if (res.data.status === "200") {
          toast.info("Promotion Active", { theme: "dark" });
        } else {
          toast.error(res.data.message, { theme: "dark" });
        }
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  function endPromo() {
    const endPromoObj = {
      check: "1",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}updatecheck`, endPromoObj)
      .then((res) => {
        gettingPromoStatus();
        if (res.data.status === "200") {
          toast.info("Promotion Removed", { theme: "dark" });
        } else {
          toast.error(res.data.message, { theme: "dark" });
        }
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }
  function gettingDate(val) {
    setpromotionSheetTempArr(val);
  }
  function gettingPrice(val) {
    setpromotionSheetTempArr(val);
  }

  function gettingStatus(val) {
    setpromotionSheetTempArr(val);
  }

  function gettingPhone(val) {
    setpromotionSheetTempArr(val);
  }

  function gettingUsername(val){
    setpromotionSheetTempArr(val);

  }

  function submitHostQuery() {
    const hostQueryObj = {
      sender_id: senderID,
      user_id: receID,
      message: hostMessage,
      status: "pending",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}post_query`, hostQueryObj)
      .then((res) => {
        if (res.data.status === "200") {
          toast.info("Query Submitted", { theme: "dark" });
          setHostMessage("");
        } else {
          toast.info(res.data.data[0].message, { theme: "dark" });
        }
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }


  function RewardApprovalSheetFun({ items, index }) {

    const [isShowUserModal, setShowUserModal] = useState(false);

    function onHide() {
      setShowUserModal(false);
    }


    return (
      <>
        <tr key={index + 1} style={{ color: colorScheme.card_txt_color }}>
          <td>{promotionSheet.length - index}</td>
          <td>{items.id}</td>
          <td>{items.member_name}</td>
          <td>{items.cnic}</td>
          <td>{items.phone}</td>
          <td>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${items.image}`}
              width={50}
              style={{ cursor: "pointer" }}
              alt="cnic-img"
              data-toggle="modal"
              data-target="#staticBackdrop"
              onClick={() => {
                setImage(items.image)
                setFirstName(items.firstname)
                setLastName(items.lastname)
                setMemCinc(items.cnic)
              }
              }
            />
          </td>
          <td>{items.amount}</td>
          {/* <td>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${items.image_2}`}
              width={50}
              style={{ cursor: "pointer" }}
              alt="review-img"
              data-toggle="modal"
              data-target="#staticBackdrop"
              onClick={() => 
                {
                  setImage(items.image_2)
                  setFirstName(items.firstname)
                  setLastName(items.lastname)
                  setMemCinc(items.cnic)
                }
              }
            />
          </td> */}
          {items.status === "approved" ? (
            <td style={{ color: "#64dd17" }}>{items.status}</td>
          ) : (
            <td style={{ color: "#ff1744" }}>{items.status}</td>
          )}
          <td>{items.Idate}</td>
          <td>
            <Moment date={items.updated_at} format="hh:mm:ss" />
          </td>

          {roleID === "2" || roleID === "3" || roleID === "4" ? null : (
            <td>
              <div className="d-flex">
                {items.status === "unapproved" ? (
                  <button
                    onClick={() => {
                      changingRewardAppStatus(items.member_id);
                    }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Approve Reward"
                    className="btn btn-outline-info btn-sm"
                  >
                    <i className="fa-solid fa-circle-check"></i>
                  </button>
                ) : null}
                &nbsp;&nbsp;
                {items.status === "approved" ? (
                  <>
                    <button
                      onClick={() => {
                        changingRewardRejStatus(items.member_id);
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Unapprove Reward"
                      className="btn btn-outline-warning btn-sm"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    &nbsp;&nbsp;
                  </>
                ) : null}
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    setShowUserModal(true);
                  }}
                >
                  <i className="fa-solid fa-timeline"></i>
                </button>
                &nbsp;&nbsp;
                {items.status === "approved" ? null : (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setMemID(items.member_id)
                      setIndex(index);
                    }}
                    className="btn btn-outline-danger btn-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Reward Rejection"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
                &nbsp;&nbsp;
              </div>
            </td>
          )}
          <td>
            {roleID === "1" || roleID === "6" ? null : (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setReceID(items.member_id);
                }}
              >
                Query
              </button>
            )}
          </td>
        </tr>

        {isShowUserModal === true && (
          <UserTimelineModal
            ID={items.member_id}
            isShow={isShowUserModal}
            onHide={onHide}
          />
        )}

      
      </>
    );
  }

  useEffect(() => {
    SetLocalLogin();
    gettingRewards();
  }, []);

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
                    Reward Approvals
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
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">
                      <h5>Reward Approval Sheet</h5>

                      <di className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              defaultValue={rewardAppSum}
                              placeholder="total Amount"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="col-lg-3">
                          <button
                            className="btn btn-outline-info btn-sm"
                            onClick={gettingRewardAppSum}
                          >
                            {" "}
                            Total Amount
                          </button>
                        </div>

                      </di>
                      
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                          window.location.reload(true);
                        }}
                      >
                        Reset Filters
                      </button>

                      {roleID === "2" ||
                      roleID === "3" ||
                      roleID === "4" ? null : (
                        <div className="float-right">
                          {getRewardStat !== "0" ? (
                            <>
                              <button
                                className="btn btn-outline-info btn-sm"
                                onClick={() => startPromo()}
                              >
                                Start Promotion
                              </button>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </>
                          ) : (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => endPromo()}
                            >
                              Stop Promotion
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="card-body table-responsive p-2">
                      <div className="row">
                        <Filter
                          PromotionData={promotionSheet}
                          DateFilter={gettingDate}
                          PriceStatus={gettingPrice}
                          PhoneFilter={gettingPhone}
                          StatusFilter={gettingStatus}
                          UsernameFilter={gettingUsername}
                          PromotionSheetIdentifier={PromotionSheetIdentifier}
                        />
                      </div>
                      <table className="table  text-nowrap">
                        <thead className="text-center">
                          <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Member Name</th>
                            <th>CNIC</th>
                            <th>Phone</th>
                            <th>Review CNIC</th>
                            <th>Amount</th>
                            {/* <th>Review ScreenShot</th> */}
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        {/*  */}
                        <tbody className="text-center">
                          {promotionSheetTemArr
                            .filter(
                              (items, index) =>
                                index <= showLength 
                            )
                            .map((items, index) => {
                              return (
                                <RewardApprovalSheetFun
                                  items={items}
                                  index={index}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                      {remainingPromoUsers.length > 0 && (
                        // only display the "Show More" button if there are more rows to show
                        <button
                          className="btn btn-outline-info"
                          onClick={() => setShowLength(showLength + 30)}
                        >
                          Show More
                        </button>
                      )}

                      
                    {/* Rejection Modal */}
        <Modal
          ariaLabelledby="modal1_label"
          ariaDescribedby="modal1_desc"
          onClose={() => {setIsOpen(false)}}
          open={isOpen}
        >
          <div className="card-body">
            <h5>
              <b>Possible Notes*</b>{" "}
            </h5>
            <ul>
              {QuerySelect.map((items) => {
                return (
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input custom-control-input-info"
                      type="checkbox"
                      id={`customCheckbox${items.id}`}
                      onChange={() => {
                        if (queryOne.includes(items.message)) {
                          var new_str = queryOne.replace(items.message, "");
                          setQueryOne(new_str);
                        } else {
                          setQueryOne(queryOne + " " + items.message);
                        }
                      }}
                    />
                    <label
                      htmlFor={`customCheckbox${items.id}`}
                      className="custom-control-label"
                    >
                      {items.message}
                    </label>
                  </div>
                );
              })}
            </ul>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Rejection Reason*</label>
              <textarea
                type="text"
                className="form-control "
                defaultValue={queryOne}
                id="exampleInputEmail1"
                placeholder="Enter Rejection Reason"
                onChange={(e) => setQueryOne(e.target.value)}
                row={6}
                style={{
                  background: colorScheme.login_card_bg,
                  color: colorScheme.card_txt_color,
                  marginRight: "15em",
                }}
              />
            </div>
            <button
              onClick={() => {
                RewardRejection();
              }}
              className="btn btn-outline-info btn-sm"
            >
              {loading === true ? "..." : "Submit"}
            </button>
          </div>
        </Modal>

        {/* Rejection Modal */}

                      {/* Image Modal */}
                      <div
                        className="modal fade"
                        id="staticBackdrop"
                        data-backdrop="static"
                        data-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div
                            className="modal-content p-3"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                          >
                             <label htmlFor="">First name: &nbsp;{FirstName}</label>
                             <label htmlFor="">Last name: &nbsp;{LastName}</label>
                             <label htmlFor="">CNIC: &nbsp;{memCnic}</label>
                            <div className="modal-header">
                              <div>
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                
                                <button
                                  type="button"
                                  className="btn btn-outline-warning btn-sm"
                                  onClick={() => {
                                    setRotateImg(180);
                                  }}
                                >
                                  180 deg
                                </button>
                                &nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => {
                                    setRotateImg(360);
                                  }}
                                >
                                  360 deg
                                </button>
                              </div>
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
                              <img
                                className="img-fluid  mx-auto d-block"
                                src={`${process.env.REACT_APP_IMG_URL}${getImage}`}
                                alt=""
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  transform: `rotateY(${rotateImg}deg)`,
                                }}
                              />
                            </div>
                            <div classname="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      {/* Image Modal */}
                    </div>
                  </div>



                  {/*Query Modal Start  */}
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
                            Query Area
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
                            value={hostMessage}
                            placeholder="Writer your query here..."
                            row={6}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) => setHostMessage(e.target.value)}
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={submitHostQuery}
                          >
                            Submit
                          </button>
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

export default RewardApprovalSheet;
