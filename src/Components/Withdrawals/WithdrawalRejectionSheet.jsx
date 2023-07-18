import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from "axios";


const WithdrawalRejectionSheet = () => {
    const [rejectWithdrawalSheet , setWithdrawalSheet] = useState([]);

    function gettingRejectDepo(){
        axios.post( `${process.env.REACT_APP_BASE_URL}fetch_rejected_withdrawl`)
        .then((res)=>{
            setWithdrawalSheet(res.data.Data)
        })
        .catch((error)=>{
          return null;
        })
    }

  
    function withdrawalRejection(ID){
        const withdrawalObj = {
          status:"unapproved"
        }
          axios.post(`${process.env.REACT_APP_BASE_URL}reject_withdrawl_status_byid/${ID}`,withdrawalObj)
          .then((res)=>{
            if(res.data.status === '200'){
              toast.info(`Retrieved in withdrawal sheet!`,{theme:"dark"});
              setTimeout(() => {
                window.location.reload(true)
              }, 3000);
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

        
        
  

    useEffect(() => {
        gettingRejectDepo()
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
                  Rejected Withdrawals
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Reject Withdrawal Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
                {
                     rejectWithdrawalSheet.length !==0 ?
                     <table className="table  text-nowrap">
                     <thead className="text-center">
                       <tr>
                       <th>#</th>
                          <th>ID</th>
                          <th>Account Owner</th>
                          <th>Owner Phone</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account Sub-Type</th>
                          <th>Account No</th>
                          <th>Req Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Actions</th>
                       </tr>
                     </thead>
                     <tbody className="text-center">
                       {      
                       
                       rejectWithdrawalSheet.map((items,index)=>{
                           return(
                             <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                             <td>{ rejectWithdrawalSheet.length - index}</td>
                             <td>{items.user_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_number}</td>
                            <td>{items.requested_amount}</td>
                            <td className="text-danger">{items.status}</td>
                            <td>{items.Idate}</td>
                            <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
              
                             <td>
                              <div className="d-flex justify-content-center">
                               <button onClick={()=>withdrawalRejection(items.id)} className="btn btn-outline-info btn-sm">
                                   <i className="fas fa-rotate-left"></i>
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
                   <h2>No Record Found</h2>
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

export default WithdrawalRejectionSheet