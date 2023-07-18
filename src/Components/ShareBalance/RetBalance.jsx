import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import Filter from "../Filters/Filter";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from "axios";

const RetBalance = () => {
    const [balanceSheet , setBalanceSheet] = useState([]);
    const [retBalanceTemArr, setTempArr] = useState([]);

    const[retBalanceSheetSum , setRetBalanceBalanceSheetSum] = useState('');


    const RetBalanceSheetIdentifier = "RetBalanceSheet";


    function gettingShareBalance(){
        axios.post( `${process.env.REACT_APP_BASE_URL}fetch_retreive`)
        .then((res)=>{
          setBalanceSheet(res.data.data);
          setTempArr(res.data.data);
        })
        .catch((error)=>{
           return null
        })
    }
    function gettingDate(val) {
      setTempArr(val);
    }
  
  
    function gettingPhone(val) {
      setTempArr(val);
    }
  
    function gettingUsername(val){
      setTempArr(val);
  
    }
  
    
  function gettingRetBalanceSheetSum() {
    const getBalanceSheetSum = retBalanceTemArr.reduce((acc, curr) => acc + +curr.retreive_amount, 0);
    setRetBalanceBalanceSheetSum(getBalanceSheetSum);
  }

    
  useEffect(() => {
    gettingShareBalance()
}, [])
  
  return (
    <>
        <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Retrieve Sheet
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Retrieve Balance Sheet</h5>

                       <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              defaultValue={retBalanceSheetSum}
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
                            onClick={gettingRetBalanceSheetSum}
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
                  </div>
                  <div className="row p-3">
                      <Filter
                        RetBalanceSheetData={balanceSheet}
                        DateFilter={gettingDate}
                        PhoneFilter={gettingPhone}
                        UsernameFilter={gettingUsername}
                        RetBalanceSheetIdentifier={RetBalanceSheetIdentifier}
                      />
                    </div>
                  
                  <div className="card-body table-responsive p-2">
            {

                retBalanceTemArr.length !==0?
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Sender Name</th>
                          <th>Sender Phone</th>
                          <th>Received By</th>
                          <th>Receiver Phone</th>
                          <th>Retrieve Amount</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        retBalanceTemArr.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.sender_name}</td>
                              <td>{items.sender_phone}</td>
                               <td>{items.username}</td>
                               <td>{items.userphone}</td>
                               <td>{items.retreive_amount}</td>
                              <td>{items.date}</td>
                              <td> <Moment date={items.updated_at} format="hh:mm:ss"/></td>
                             

                              <td>
                               <div className="d-flex justify-content-center">
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

                    :
                    <div className="text-center">
                    <h2>No Data Found!</h2>
                    </div>
            }
                    
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    </>
  )
}

export default RetBalance