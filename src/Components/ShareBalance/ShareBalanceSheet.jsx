import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import Filter from "../Filters/Filter";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from "axios";

const ShareBalanceSheet = () => {
  const[balanceSheetSum , setBalanceSheetSum] = useState('');
  const [balanceSheet , setBalanceSheet] = useState([]);
  const [balanceTemArr, setTempArr] = useState([]);
  const[roleID , setRoleID] = useState('');

  const ShareBalanceSheetIdentifier = "ShareBalanceSheet";

  
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id)
      }

    } catch {
      return null;
    }
  }
  function gettingShareBalance(){
      axios.post( `${process.env.REACT_APP_BASE_URL}fetch_send_balance`)
      .then((res)=>{
        setBalanceSheet(res.data.data)
        setTempArr(res.data.data)
      })
      .catch((error)=>{
         return null
      })
  }


  function gettingBalanceSheetSum() {
    const getBalanceSheetSum = balanceTemArr.reduce((acc, curr) => acc + +curr.send_amount, 0);
    setBalanceSheetSum(getBalanceSheetSum);
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

//   const newShareBalanceSheet = balanceTemArr.length > 0 && balanceTemArr.filter((items)=>                    
                        
//   Number(roleID) === 2 ? items.role_id !== "1" && items.role_id !== "2"&& items.role_id === "6"  && items.role_id !== "5" :
//   Number(roleID) === 3 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id === "6" && items.role_id !== "5" && items.role_id !== "3" :
//   Number(roleID) === 4 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id === "6" &&  items.role_id !== "5" && items.role_id !== "3" && items.role_id !== "4" :
//   items.role_id !=="5"

// )


  function retrieveBalance(ID,userID,roleID,senderID,retAmount){
    const retBalanceObj = {
      record_id:ID,
      user_id:userID,
      sender_id:senderID,
      role_id:roleID,
      amount:retAmount

    }
    axios.post( `${process.env.REACT_APP_BASE_URL}reterive`,retBalanceObj)
      .then((res)=>{
        if(res.status === 200){

          toast.info(`${res.data.message}`,{theme:"dark"})
               setInterval(() => {
              window.location.reload(true)
            }, 1500);
        }
        else{
          toast.info(`${res.data.message}`,{theme:"dark"})

        }
     

      })
      .catch((error)=>{
      return null
      })
  }



  useEffect(() => {
    SetLocalLogin()
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
                  Balance Sheet
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
                    <h5>Share Balance Sheet</h5> 
                    
                    <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              defaultValue={balanceSheetSum}
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
                            onClick={gettingBalanceSheetSum}
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
                        BalanceSheetData={balanceSheet}
                        DateFilter={gettingDate}
                        PhoneFilter={gettingPhone}
                        UsernameFilter={gettingUsername}
                        ShareBalanceSheetIdentifier={ShareBalanceSheetIdentifier}
                      />
                    </div>
                  <div className="card-body table-responsive p-2">
            {

                    balanceSheet.length !==0?
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Sender Name</th>
                          <th>Sender Phone</th>
                          <th>Received By</th>
                          <th>Receiver Phone</th>
                          <th>Shared Amount</th>
                          <th>Date</th>
                          <th>Time</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        balanceSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.sender_name}</td>
                              <td>{items.sender_phone}</td>
                               <td>{items.username}</td>
                               <td>{items.userphone}</td>
                               <td>{items.send_amount}</td>
                               <td><Moment date={items.updated_at} format="YYYY/MM/DD"/></td>
                              <td> <Moment date={items.updated_at} format="hh:mm:ss"/></td>
                             

                              {/* <td>
                               <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-info btn-sm" onClick={
                                  ()=>retrieveBalance(
                                    items.id,
                                    items.user_id,
                                    items.sender_role_id,
                                    items.sender_id,
                                    items.send_amount
                                    )
                                  }>
                                    <i className="fa fa-rotate-left"></i>
                                  </button>
                               
                                </div>   
                                 
                              </td> */}
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

export default ShareBalanceSheet