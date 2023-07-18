import React, { useState, useEffect } from "react";
import Profile from '../Images/avatar5.jpg';
import colorScheme from '../Colors/Styles.js';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [memName, setMemName] = useState("");
  const [roleID, setRoleID] = useState("");

  // Getting admin information from local storage:
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem("user");
      let parseUserObj = JSON.parse(userObj);

      if (parseUserObj !== null) {
        setMemName(parseUserObj.username);
        setRoleID(parseUserObj.role_id);
      }
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const trees = window.$('[data-widget="treeview"]');
    trees.Treeview("init");
    SetLocalLogin();
  }, []);

  return (
    <>
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ background: colorScheme.nav_side_footer_bg ,color:colorScheme.card_txt_color }}
      >
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          {/* <img
            src={PLogo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{color:"white" }}
          /> */}
          <span className="brand-text font-weight-light">&nbsp;&nbsp;&nbsp; <i className="fa-brands fa-youtube"></i>&nbsp;&nbsp; Chill Case</span>
        </a>
        {/* Sidebar */}
        <div className="scroll-view-two scrollbar-secondary-two">
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={Profile}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Admin
                  {/* {memName} */}
                </a>
              </div>
            </div>

            {/* Sidebar Menu */}

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="true"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                {roleID === "1" || roleID === "6" ? (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-user mr-2" />
                      <p>
                        Users
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/UserSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Users Sheet</p>
                        </Link>
                      </li>
                          {/* 
                      <li className="nav-item">
                        <Link to="/SuspendedUsers" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Suspended Users</p>
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                ) : null}

                <li className="nav-item menu treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-people-group mr-2" />
                    <p>
                      Therapists
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Profile</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/TherapistCategoryForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Category Form</p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/RegTherapistForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Therapist Form</p>
                        </Link>
                      </li>

               

                    <li className="nav-item">
                        <Link to="/TherapistSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Therapist Sheet</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/AvailableTherapistSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Available Therapist</p>
                        </Link>
                      </li>
                      
                    {roleID === "1" || roleID === "6" ? (
                      null
                      
                    ) : null}



                    {/* <li className="nav-item">
                      <Link to="/MemberSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Member Sheet</p>
                      </Link>
                    </li> */}

                      {/* 
                    {roleID === "1" || roleID === "6" ? (
                      <li className="nav-item">
                        <Link to="/StaffQuerySheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Staff Query Sheet</p>
                        </Link>
                      </li>
                    ) : null}

                    {roleID === "1" || roleID === "6" ? (
                      <li className="nav-item">
                        <Link to="/StaffTicketSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Staff Tickets Sheet</p>
                        </Link>
                      </li>
                    ) : null} */}
                  </ul>
                </li>


                {/* {roleID === "3" && roleID === "4" ? null : (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-box mr-2" />
                      <p>
                        Packages
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/AddPackageForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Add Package</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/PackageSheet" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Packages Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )} */}


              {/* <li className="nav-item menu treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-file-signature mr-2" />
                      <p>
                        Blogs
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/BlogsForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Add Blogs</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/BlogSheet" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Blogs Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li> */}


              {/* 
                <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon fas fa-briefcase" />
                    <p>
                      Deposits
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/AllDepositsSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Deposit Sheet</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/RejectDepositSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Reject Deposit Sheet</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                <Link to="/BalanceSheet" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Balance Sheet</p>
                </Link>
              </li>
                  </ul>
                </li> */}



                {/* <li className="nav-item menu treeview">
            <a href="#" className="nav-link   ">
              <i className="nav-icon fas fa-money-bill-transfer" />
              <p>
                Investments
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/InvestmentSheet" className="nav-link ">
                  <i className="far fa-circle nav-icon" />
                  <p>Investment Sheet</p>
                </Link>
              </li>
            </ul>
          </li> */}


                {/* <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon fas fa-money-bill-wave" />
                    <p>
                      Withdrawal
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/WithdrawalSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Withdrawal Sheet</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/WithdrawalRejectSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Reject Withdrawal Sheet</p>
                      </Link>
                    </li>
                  </ul>
                </li> */}


                
                
                <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon  fa-solid fa-receipt"></i>
                    <p>
                      Promo Codes
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/PromoSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Promo-Code Sheet</p>
                      </Link>
                    </li>
              
                  </ul>
                </li> 

                <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon  fa-solid fa-bell"></i>
                    <p>
                      Notifications
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/Notifications" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Notification Form</p>
                      </Link>
                    </li>
              
                  </ul>
                </li> 

                
                
                {/* 

                <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon  fa-solid fa-bullhorn"></i>
                    <p>
                      Promotion Rewards
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/RewardApprovalSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Reward Approval Sheet</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                <Link to="/StopPromotionSheet" className="nav-link ">
                  <i className="far fa-circle nav-icon" />
                  <p>Stop Promotions</p>
                </Link>
              </li>
                  </ul>
                </li> 
                
                */}


                {/* {roleID === "3" && roleID === "4" ? null : (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link   ">
                      <i className="nav-icon  fa-solid fa-star"></i>
                      <p>
                        Lucky Draws
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/AddLuckyDrawForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Add Lucky-Draw</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/LuckyDrawSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Lucky Draw Sheet</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/ParticipantSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Participants Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )} */}

                 <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon  fa-solid fa-chart-column"></i>
                    <p>
                      Statistics
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/DailyChart" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Daily Chart</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/RevenueChart" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Revenue Chart</p>
                      </Link>
                    </li>
                  </ul>
                </li> 

                {/* {roleID === "2" || roleID === "3" || roleID === "4" ? null : (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link   ">
                      <i className="nav-icon  fa-solid fa-signal"></i>
                      <p>
                        Levels
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/AddLevelForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Add Levels</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/LevelSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Levels Sheet</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/LevelRewardSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Level Reward Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )} */}
{/* 
                {roleID === "6" ? null : (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link   ">
                      <i className="nav-icon  fa-solid fa-money-bills"></i>
                      <p>
                        Sharing Balance
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/ShareBalanceForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Share Balance</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/ShareBalanceSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Share Balance Sheet</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/RetBalanceSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Retrieve Balance Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )} */}



                {/* 
                {roleID === "2" || roleID === "3" || roleID === "4" ? null : (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link   ">
                      <i className="nav-icon  fa-solid fa-retweet"></i>
                      <p>
                        Deduct Balance
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/DeductBalanceForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Deduct Balance</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/DeductBalanceSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Deduct Balance Sheet</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )} */}


                {/* {roleID === "1" ? (
                  <li className="nav-item menu treeview">
                    <a href="#" className="nav-link   ">
                      <i className="nav-icon  fa-solid fa-credit-card"></i>
                      <p>
                        Payments
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/PaymentForm" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Payment Form</p>
                        </Link>
                      </li>
                        
                      <li className="nav-item">
                        <Link to="/PaymentSheet" className="nav-link ">
                          <i className="far fa-circle nav-icon" />
                          <p>Payment Sheet</p>
                        </Link>
                      </li> 
                    </ul>
                  </li>
                ) : null} */}


                {/* <li className="nav-item menu treeview">
                  <a href="#" className="nav-link   ">
                    <i className="nav-icon  fa-solid fa-wand-magic-sparkles"></i>
                    <p>
                      Tips & Tricks
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/TipsTricksForm" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Tips & Tricks Form</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/TipsTrickSheet" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Tips & Tricks Sheet</p>
                      </Link>
                    </li>
                  </ul>
                </li> */}



                {/* <li className="nav-item ">
                  <Link to="/LiveChat" className="nav-link">
                    <i className="fa-solid fa-tower-broadcast nav-icon" />
                    &nbsp;&nbsp;
                    <p>Live Chat</p>
                  </Link>
                </li> */}




                <li className="nav-item ">
                  <Link to="/HelpCenter" className="nav-link">
                    <i className="fa-solid fa-comments nav-icon" />
                    &nbsp;&nbsp;
                    <p>Help Center</p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default Sidebar;
