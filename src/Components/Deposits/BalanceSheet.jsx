import BalanceData from '../Json/BalanceData.js';
import colorScheme from "../Colors/Styles.js";
import { Link } from "react-router-dom";
import Filter from '../Filters/Filter';
import React,{useState} from "react";

const BalanceSheet = () => {
  const [balanceData , setBalanceData] = useState(BalanceData)
  const BalanceSheetIdentifier = "BalanceSheet";

  function gettingDate(val){
    setBalanceData(val)
  }

  function gettingStatus(val){
    setBalanceData(val)
  }

  function gettingPrice(val){
    setBalanceData(val)
  }
  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Balance Sheet
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
                  {/* <li className="breadcrumb-item active">Add Package</li> */}
                </ol>
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
                  className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h3 className="card-title">Balance Sheet</h3>
                  </div>
                  <div className="card-body table-responsive p-2">
                  <div className="row">
                    <Filter BalanceData={BalanceData} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} BalanceSheetIdentifier={BalanceSheetIdentifier}/>
                  </div>
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account Sub-Type</th>
                          <th>Account No</th>
                          <th>Amount</th>
                          <th>Deposit Slip</th>
                          <th>Verified Status</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          balanceData.map((items, index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              
                              <td>{items.id}</td>
                              <td>{items.account_title}</td>
                              <td>{items.account_type}</td>
                              <td>{items.account_subType}</td>
                              <td>{items.account_no}</td>
                              <td>{items.amount}</td>
                              <td>
                                <img src={items.deposit_slip} alt="" width={70} />
                              </td>
                              <td>{items.Verified_Status}</td>
    
                              <td>{items.Status}</td>
    
                              <td>{items.date}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                        }
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default BalanceSheet;
