import React, { useState , useEffect} from "react";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import axios from 'axios';

const StaffTicketSheet = () => {
    const [helpCenter, setHelpCenter] = useState([]);
    const [status, setStatus] = useState("pending");
  
    // Getting admin information from local storage:

    const SetLocalLogin = async () => {
        try {
          let userObj = await localStorage.getItem('user');
          let parseUserObj = JSON.parse(userObj)
          
          if (parseUserObj !== null) {
            gettingHelpData(parseUserObj.id);
          
          }
    
        } catch {
          return null;
        }
      }

  // Radio button which shows (pendig/closed) tickets in the screen:
  
    const changePeriod = (e) => {
      if (e.target.checked === true) {
        setStatus("pending");
      } else if (e.target.checked === false) {
        setStatus("closed");
      } else {
      }
    }

    // Function of fetching reffereal(A user/member got registered from any user/member referral code) tickets:
  
    function gettingHelpData(memID){
        const userObj = {
            user_id:memID
        }
      axios.post(`${process.env.REACT_APP_BASE_URL}refferaltickets`,userObj)
      .then((res)=>{
        setHelpCenter(res.data.data)
        
      })
      .catch((error)=>{
        return null;
      })

      
    }
  
    useEffect(() => {
      SetLocalLogin()
    }, [])
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
    
    <div className="content-wrapper" style={{ background: colorScheme.body_bg_color }}>
      <section className="content-header">
        <div className="container-fluid ">
          <div className="row mb-2">
            <div className="col-sm-12 text-center">
              <h1 style={{ color: colorScheme.card_txt_color }}>
                Staff Tickets &nbsp;&nbsp;
                <i className="fas fa-users" style={{ fontSize: "1.3em" }}>
                </i>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content p-4">
        <div className="container-fluid">
          <h4 style={{ color: colorScheme.card_txt_color }}>Check Tickets</h4>
          <label className="switch mb-4 mr-5">
            <input type="checkbox" onChange={changePeriod} value={status}/>
            <div className="slider round">
              <div className="on">Pending</div>
              <div className="off">Closed</div>
            </div>
          </label>
          <button
            className="btn btn-outline-info"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Reset
          </button>
          <div className="row">
            <div className="col-lg-10 col-sm-12">
              {status === "pending"
                ? helpCenter
                    .filter((items) => items.status === status)
                    .map((items) => {
                      return (
                        <div
                          className="card"
                          style={{
                            background: colorScheme.card_bg_color,
                            color: colorScheme.card_txt_color,
                            boxShadow: colorScheme.box_shadow_one,
                          }}
                        >
                          <div className="card-header">
                            <div className="card-tools">
                              <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="collapse"
                                title="Collapse"
                              >
                                <i className="fas fa-minus" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="remove"
                                title="Remove"
                              >
                                <i className="fas fa-times" />
                              </button>
                            </div>
                            <div className="d-flex">
                          <h3 className="card-title">
                            <b>{items.title}</b>
                          </h3>&nbsp;&nbsp;&nbsp;
                          <h4 className="text-info">(#{items.id})</h4>
                          </div>
                          </div>
                          <div className="card-body">
                            <h4>{items.username}</h4>
                            <ReadMoreReact
                              text={items.body}
                              min={70}
                              ideal={140}
                              max={300}
                              readMoreText="...Read More"
                            />
                          </div>
                          <div className="card-footer d-flex bd-highlight">
                            <h6 className="flex-grow-1 bd-highlight">
                              {items.status === "pending" ? (
                                <button className="btn btn-outline-warning">
                                  Pending
                                </button>
                              ) : (
                                <button className="btn btn-outline-success">
                                  Closed
                                </button>
                              )}
                              &nbsp;&nbsp;&nbsp;
                              {items.Idate}
                            </h6>

                            <Link
                            to="/HelpChatCenter"
                            state={{
                              ID:items.id,
                              userID: items.user_id,
                              userName:items.username,
                              userTitle:items.title,
                              ticketStatus:items.status,
                              userBody:items.body,
                              userDate:items.created_at

                            }}
                            className="btn btn-outline-info btn-lg"
                          >
                            <i className="fa-sharp fa-solid fa-comment"></i>
                          </Link>
                          </div>
                        </div>
                      );
                    })
                : status === "closed"
                ? helpCenter
                    .filter((items) => items.status === status)
                    .map((items) => {
                      return (
                        <div
                          className="card"
                          style={{
                            background: colorScheme.card_bg_color,
                            color: colorScheme.card_txt_color,
                            boxShadow: colorScheme.box_shadow_one,
                          }}
                        >
                          <div className="card-header">
                            <div className="card-tools">
                              <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="collapse"
                                title="Collapse"
                              >
                                <i className="fas fa-minus" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="remove"
                                title="Remove"
                              >
                                <i className="fas fa-times" />
                              </button>
                            </div>
                            <div className="d-flex">
                          <h3 className="card-title">
                            <b>{items.title}</b>
                          </h3>&nbsp;&nbsp;&nbsp;
                          <h4 className="text-info">(#{items.id})</h4>
                          </div>
                          </div>
                          <div className="card-body">
                            <h4>{items.username}</h4>
                            <ReadMoreReact
                              text={items.body}
                              min={70}
                              ideal={140}
                              max={300}
                              readMoreText="...Read More"
                            />
                          </div>
                          <div className="card-footer d-flex bd-highlight">
                            <h6 className="flex-grow-1 bd-highlight">
                              {items.status === "pending" ? (
                                <button className="btn btn-outline-warning">
                                  Pending
                                </button>
                              ) : (
                                <button className="btn btn-outline-success">
                                  Closed
                                </button>
                              )}
                              &nbsp;&nbsp;&nbsp;
                              {items.Idate}
                            </h6>

                            <Link
                            to="/HelpChatCenter"
                            state={{
                              ID:items.id,
                              userID: items.user_id,
                              userName:items.username,
                              userTitle:items.title,
                              ticketStatus:items.status,
                              userBody:items.body,
                              userDate:items.created_at
                            }}
                            className="btn btn-outline-info btn-lg"
                          >
                            <i className="fa-sharp fa-solid fa-comment"></i>
                          </Link>
                          </div>
                        </div>
                      );
                    })
                : helpCenter.map((items, index) => {
                    return (
                      <div
                        key={index}
                        className="card"
                        style={{
                          background: colorScheme.card_bg_color,
                          color: colorScheme.card_txt_color,
                          boxShadow: colorScheme.box_shadow_one,
                        }}
                      >
                        <div className="card-header">
                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                              title="Collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="remove"
                              title="Remove"
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                          <div className="d-flex align-items-center">
                          <h3 className="card-title">
                            <b>{items.title}</b>
                          </h3>&nbsp;&nbsp;&nbsp;
                          <h4 className="text-info">(#{items.id})</h4>
                          </div>
                        </div>
                        <div className="card-body">
                          <h4 className="text-info">{items.username}</h4>
                          <ReadMoreReact
                            text={items.body}
                            min={70}
                            ideal={140}
                            max={300}
                            readMoreText="...Read More"
                          />
                        </div>
                        <div className="card-footer d-flex bd-highlight">
                          <h6 className="flex-grow-1 bd-highlight">
                            {items.status === "pending" ? (
                              <button className="btn btn-outline-warning">
                                Pending
                              </button>
                            ) : (
                              <button className="btn btn-outline-success">
                                Closed
                              </button>
                            )}
                            &nbsp;&nbsp;&nbsp;
                            {items.Idate}
                          </h6>

                          <Link
                            to="/HelpChatCenter"
                            state={{
                              ID:items.id,
                              userID: items.user_id,
                              userName:items.username,
                              userTitle:items.title,
                              ticketStatus:items.status,
                              userBody:items.body,
                              userDate:items.created_at
                            }}
                            className="btn btn-outline-info btn-lg"
                          >
                            <i className="fa-sharp fa-solid fa-comment"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>

    </>
  )
}

export default StaffTicketSheet