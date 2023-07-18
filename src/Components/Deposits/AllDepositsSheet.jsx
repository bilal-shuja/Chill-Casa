import UserTimelineModal from "../UserTimeline/UserTimelineModal";
import QuerySelect from "./DepositSelection.js";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import Filter from "../Filters/Filter";
import { Modal } from "pretty-modal";
import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";

const AllDepositsTable = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [getDepos, setDepos] = useState([]);

  const [depoChecks, setDepoChecks] = useState([]);
  const [depoSum, setDepoSum] = useState("");
  const [depoTemArr, setTempArr] = useState([]);
  const [depoDate, setDepoDate] = useState("");
  const [roleID, setRoleID] = useState("");

  const [receID, setReceID] = useState("");
  const [hostMessage, setHostMessage] = useState("");
  const [senderID, setSenderID] = useState("");
  const [depoRatio , setDepoRatio] = useState("");

  const [queryOne, setQueryOne] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [memID, setMemID] = useState("");
  const [depoID, setDepoID] = useState("");
  const[showLength, setShowLength] = useState(30);

  const [index , setIndex] = useState('');

  const DepoSheetIdentifier = "DepositSheet";

  // Getting admin information from local storage:
  
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem("user");
      let parseUserObj = JSON.parse(userObj);

      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id);
        setSenderID(parseUserObj.id);
      }
    } catch {
      return null;
    }
  };

  // Function fetch users deposit information:
  function gettingDeposits() {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getalldeposits`)
      .then((res) => {
        setDepos(res.data.Data);
        setTempArr(res.data.Data);
      })
      .catch((error) => {
        return error;
      });
  }


  const remainingDepositUsers = getDepos.slice(showLength);


  const depoHandler = (id) => {
    setDepoChecks((prevState) => {
      const depID = [...prevState];
      depID.push(id);
      return depID;
    });
  };

  // const despositCheckArr = ()=>{
  //     console.log("IDs arr",depoChecks)
  //     setTimeout(() => {

  //       setCheckBox(false)
  //     }, 2000);
  // }

  // Global Filter function (Date,Status, Price, Phone):

  function gettingDate(val) {
    setTempArr(val);
  }

  function gettingStatus(val) {
    setTempArr(val);
  }

  function gettingPrice(val) {
    setTempArr(val);
  }

  function gettingPhone(val) {
    setTempArr(val);
  }

  function gettingUsername(val){
    setTempArr(val);

  }

  // Function which approves individual deposits of users:

  function approveSingleDepo(id,memID,amount) {
    const depObj = {
      id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}approve_deposit`, depObj)
      .then((res) => {
        toast.info(`Deposit ${res.data.message}`, { theme: "dark" });
        geneNotificationOnDepoStatus(memID,amount,res.data.message)

      })
      .catch((error) => {
        if (error.status === "401") {
          toast.info(error.data.message, { theme: "dark" });
        } else {
          toast.info("Something went wrong", { theme: "dark" });
        }
      });
  }

  // Function which approves deposit by according to date:
  function approveDepoByDate() {
    const dateDepObj = {
      Idate: depoDate,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}approve_deposit_bydate`,dateDepObj
      )
      .then((res) => {
        toast.info(`${res.data.message}`, { theme: "dark" });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      })
      .catch((error) => {
        if (error.status === "401") {
          toast.warn(error.data.message, { theme: "dark" });
        } else {
          toast.warn("Something went wrong", { theme: "dark" });
        }
      });
  }

  // Function generation sum of deposits(approved/unapproved, Date ,Phone ,All):

  function gettingDepoSum() {
    const getDepoSum = depoTemArr.reduce((acc, curr) => acc + +curr.amount, 0);
    setDepoSum(getDepoSum);
  }



  const newDeposits = depoTemArr.length > 0 && depoTemArr.filter((item)=> item.status !=="rejected")


  function removeUserFromDepopsitSheet() {
    setTempArr((prevState) => {
      const tasks = [...prevState];
      tasks.splice(index, 1);
      return tasks;
    });
  }

  // Function which rejects the specific user:
  function rejectDeposit() {
    const rejDepObj = {
      status: "rejected",
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}reject_deposit_byid/${depoID}`,
        rejDepObj
      )
      .then((res) => {
        if (res.data.status === "200") {
          toast.info("Deposit Rejected!", { theme: "dark" });
          geneNotification();
          removeUserFromDepopsitSheet();
    
        } else {
          toast.warn(res.data.message, { theme: "dark" });
        }
      })
      .catch((error) => {
        return null;
      });
  }

  // Function which generates a notification to that specific user along with a custom/select from given query(reason):

  function geneNotification() {
    const notifiObj = {
      receiver_id: memID,
      body: queryOne,
      title: "Deposit_Rejections",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}post_notification`, notifiObj)
      .then((res) => {

        if (res.data.status === "200") {
          toast.info("Notified to User", { theme: "dark" });
        } else {
          toast.info(`${res.data.message}`, { theme: "dark" });
        }
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }


  
  function geneNotificationOnDepoStatus(memID,amount,message) {
    const notifiObj = {
      receiver_id: memID,
      body: `Your deposit amount $ ${amount} has ${message}`,
      title: `Deposit_${message}`,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}post_notification`, notifiObj)
      .then((res) => {

        if (res.data.status === "200") {
          toast.info("Notified to User", { theme: "dark" });
        } else {
          toast.info(`${res.data.message}`, { theme: "dark" });
        }
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  // Function that generates query from hosts/members(admin/manager/staff) and submitted to super admin:

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

  // Child Deposit Sheet function:

  function DepositSheet({ items, index }) {
    const [isShowUserModal, setShowUserModal] = useState(false);

    function onHide() {
      setShowUserModal(false);
    }

    return (
      <>
        <tr key={items.id} style={{ color: colorScheme.card_txt_color }}>
          <td>{depoTemArr.length - index}</td>
          <td>{items.payer_id}</td>
          <td>{items.username}</td>
          <td>{items.phone}</td>
          <td>{items.account_type}</td>
          <td>{items.wallet_type}</td>
          <td>{items.transaction_id}</td>
          <td>{items.amount}</td>
          <td>
            <img
              className="img-fluid"
              src={`${process.env.REACT_APP_IMG_URL}${items.proof_image}`}
              alt=""
              width={60}
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_IMG_URL}${items.proof_image}`,
                  "_blank"
                )
              }
            />
          </td>

          {items.status === "approved" ? (
            <td style={{ color: "#64dd17" }}>{items.status}</td>
          ) : (
            <td style={{ color: "#ff1744" }}>{items.status}</td>
          )}
          <td>{items.Idate}</td>
          <td>
            <Moment date={items.updated_at} format="hh:mm:ss" />
          </td>

          <td>
            <div className="d-flex align-items-center">
              {roleID === "2" || roleID === "3" || roleID === "4" ? null : (
                <>
                  <button
                    onClick={() => approveSingleDepo(items.id,items.payer_id ,items.amount)}
                    className="btn btn-outline-info btn-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="approved/unapproved deposit"
                  >
                    <i className="fa fa-person-circle-check"></i>
                  </button>
                  &nbsp;&nbsp;
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
                        setMemID(items.payer_id);
                        setDepoID(items.id);
                        setIndex(index)
                      }}
                      className="btn btn-outline-danger btn-sm"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Deposit Rejection"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </>
              )}
              &nbsp;&nbsp;
              {checkBox === true ? (
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input custom-control-input-info"
                    type="checkbox"
                    id={`customCheckbox${items.id}`}
                    onChange={() => depoHandler(items.id)}
                  />
                  <label
                    htmlFor={`customCheckbox${items.id}`}
                    className="custom-control-label"
                  >
                    Check
                  </label>
                </div>
              ) : null}
              {roleID === "1" || roleID === "6" ? null : (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setReceID(items.payer_id);
                  }}
                >
                  Query
                </button>
              )}
            </div>
          </td>
        </tr>

        {isShowUserModal === true && (
          <UserTimelineModal
            ID={items.payer_id}
            isShow={isShowUserModal}
            onHide={onHide}
          />
        )}
      </>
    );
  }

  useEffect(() => {
    gettingDeposits();
    SetLocalLogin();
  }, []);

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
        <div
          className="content-wrapper p-3 "
          style={{ background: colorScheme.body_bg_color }}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 style={{ color: colorScheme.card_txt_color }}>
                    Deposits
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
                      <h3>Deposits Sheet</h3>

                      <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              defaultValue={depoSum}
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
                            onClick={gettingDepoSum}
                          >
                            {" "}
                            Total Amount
                          </button>
                        </div>

                      </div>

                      
                    

                      <button
                        className="btn btn-outline-info mt-2 btn-sm"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Reset Filters
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      {/* <button className="btn btn-outline-info  btn-md mt-2" onClick={()=>setCheckBox(true)}>
                            Check & Approve
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp; 
                        {
                            checkBox === true ?
                          <button className="btn btn-outline-info  btn-md mt-2" onClick={despositCheckArr}>
                          <i className="fa-solid fa-check-double"></i>
                          </button> 
                          :
                          null
                        }
                        &nbsp;&nbsp; */}
                                    {/* <div className="row float-right">
                        <div className="col-lg-3">
                          <div className="form-group">
                                  <input type="text"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e)=>setDepoDate(e.target.value)}/>
                          </div>
                          <div className="col-lg-3">
                          <button onClick={()=> approveDepoByDate()} className="btn btn-outline-info">
                        Check Total Amount
                          </button>
                          </div>
                  
                          </div>
              
                        </div> */}
                      {roleID === "2" ||
                      roleID === "3" ||
                      roleID === "4" ? null : (
                        <div className="row float-right deposit-date-row">
                          {/* <div className="col-8">
                            <div className="form-group">
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                id="exampleInputEmail1"
                                placeholder="Enter Title"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                                onChange={(e) => setDepoDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-4">
                            <button
                              onClick={() => approveDepoByDate()}
                              className="btn btn-outline-info btn-sm"
                            >
                              Approve
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                    <div className="row p-3">
                      <Filter
                        DepositData={getDepos}
                        DateFilter={gettingDate}
                        StatusFilter={gettingStatus}
                        PriceStatus={gettingPrice}
                        PhoneFilter={gettingPhone}
                        UsernameFilter={gettingUsername}
                        DepoSheetIdentifier={DepoSheetIdentifier}
                      />
                    </div>

                    <div className="card-body table-responsive p-2">
                    <h3>Total Ratio:{newDeposits.length}</h3>

                      {depoTemArr.length !== 0 ? (
                        <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>Payer ID</th>
                              <th>Payer Name</th>
                              <th>Phone</th>
                              <th>Account Title</th>
                              <th>Wallet Type</th>
                              <th>Transaction No</th>
                              <th>Amount</th>
                              <th>Deposit Slip</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Time</th>

                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {newDeposits
                           
                              .map((items, index) => {
                                return (
                                  <DepositSheet items={items} index={index} />
                                );
                              })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">
                          <h2>No Record Found</h2>
                        </div>
                      )}

                    {remainingDepositUsers.length > 0 && (
                      // only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )}
                    </div>
                  </div>

                  {/* Rejection Modal (Opens when host wants to write the reason of reject)*/}

                  <Modal
                    ariaLabelledby="modal1_label"
                    ariaDescribedby="modal1_desc"
                    onClose={() => {
                      setIsOpen(false);
                    }}
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
                                    var new_str = queryOne.replace(
                                      items.message,
                                      ""
                                    );
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
                        <label htmlFor="exampleInputEmail1">
                          Rejection Reason*
                        </label>
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
                          rejectDeposit();
                        }}
                        className="btn btn-outline-info btn-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </Modal>
                  {/* Rejection Modal */}


                  {/*Query Modal Start(When hosts have any query to super admin)  */}
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

export default AllDepositsTable;
