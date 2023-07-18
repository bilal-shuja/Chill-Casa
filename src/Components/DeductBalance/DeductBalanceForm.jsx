import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import axios from "axios";

const DeductBalanceForm = () => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);
  const [btn, showBtn] = useState(false);
  const [getNum, setNum] = useState("");

  const [adminID, setAdminID] = useState("");
  const [roleID, setRoleID] = useState("");

  // Getting admin information from local storage
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem("user");
      let parseUserObj = JSON.parse(userObj);

      if (parseUserObj !== null) {
        setAdminID(parseUserObj.id);
        setRoleID(JSON.parse(parseUserObj.role_id));
      }
    } catch {
      return null;
    }
  };

  // Function getting user's availabilty (that users exist or not) by hitting enter key:

  function getEnterCodeForPhone(e) {
    let keyCode = e.code;
    if (keyCode === "Enter" || keyCode === "NumpadEnter") {
      getUserByPhone(e, "key");
    } else {
      return null;
    }
  }

  //Function fetch users info, if available and auto fill the data in inputs and hooks:

  function getUserByPhone(e, val) {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}fetch_user_with_phone/${
          val === "key" ? e.target.value : e
        }`
      )
      .then((res) => {
        setUserName(res.data.Data.username);
        setUserID(res.data.Data.id);
        setUserPhone(res.data.Data.phone);
        showBtn(true);
      })
      .catch((error) => {
        showBtn(false);
        toast.warn(error.response.data.message, { theme: "dark" });
      });
  }

  // Function deduction balance of a specific user:

  function deductBalance() {
    setLoading(true);

    if (userName && userPhone && amount) {
      const balanceObj = {
        user_id: userID,
        sender_id: adminID,
        role_id: roleID,
        phone: userPhone,
        amount: amount,
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}deduct_balance`, balanceObj)
        .then((res) => {
          toast.info("Balance Deducted!", { theme: "dark" });
          geneNotification();
          setInput(false);
          setLoading(false);

          setTimeout(() => {
            setUserPhone("");
            setUserName("");
            setAmount("");
          }, 2000);
        })
        .catch((error) => {
          if (error.response.data.response === "401") {
            toast.warn(error.response.data.message, { theme: "dark" });
            setLoading(false);
          } else {
            toast.warn("Something went wrong", { theme: "dark" });
            setInput(true);
            setLoading(false);
          }
        });
    } else {
      toast.warn("Fill the information !", { theme: "dark" });
      setLoading(false);
      setInput(true);
    }
  }

  // Function generating notifications to a specific user(Your balance get deducted):

  function geneNotification() {
    const notifiObj = {
      receiver_id: userID,
      body: `Announcement! amount ${amount} deducted from trading tube account.`,
      title: "Balance Deducted!",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}post_notification`, notifiObj)
      .then((res) => {
        toast.info("Notified to User", { theme: "dark" });
      })
      .catch((error) => {
        toast.warn("Something went wrong", { theme: "dark" });
      });
  }

  useEffect(() => {
    SetLocalLogin();
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
                    Deduct Balance
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
                <div className="col-12 col-sm-12">
                  {/* jquery validation */}
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">Deduct Balance Form</div>
                    {/* /.card-header */}
                    {/* form start */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-4 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              User phone*
                            </label>
                            &nbsp;&nbsp;
                            <button
                              className="btn btn-outline-info btn-sm"
                              onClick={() => getUserByPhone(getNum)}
                            >
                              Click
                            </button>
                            <input
                              type="number"
                              name="userPhone"
                              className={
                                userPhone === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail1"
                              onChange={(e) => setNum(e.target.value)}
                              onKeyPress={(e) => getEnterCodeForPhone(e)}
                              placeholder="Enter user phone"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              User name*
                            </label>
                            <input
                              type="text"
                              name="Username"
                              className={
                                userName === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              value={userName}
                              id="exampleInputEmail1"
                              placeholder="Enter Username"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Amount*
                            </label>
                            <input
                              type="number"
                              name="amount"
                              value={amount}
                              className={
                                amount === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputPassword1"
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="Enter amount"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}

                    {btn === true ? (
                      <div className="card-footer text-right">
                        <button
                          type="submit"
                          className="btn btn-outline-info"
                          onClick={deductBalance}
                        >
                          {loading === true ? "loading..." : "Submit"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DeductBalanceForm;
