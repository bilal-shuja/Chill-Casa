import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from "axios";

const RejectDepositSheet = () => {
    const [rejectDepoSheet , setDepostSheet] = useState([]);

    // Function fetch rejected user deposits in sheet:
    
    function gettingRejectDepo(){
        axios.post( `${process.env.REACT_APP_BASE_URL}fetch_rejected_deposit`)
        .then((res)=>{
            setDepostSheet(res.data.Data)
        })
        .catch((error)=>{
          return null;
        })
    }

    // Function used to retrieved the user from reject deposit sheet <-> deposit sheet:

    function rejectDeposit(id){
      const rejDepObj = {
        status:"unapproved"
      }
  
      axios.post(`${process.env.REACT_APP_BASE_URL}reject_deposit_byid/${id}`,rejDepObj)
      .then((res)=>{
        if(res.data.status === '200'){
          toast.info("Retrieved in deposite sheet!",{theme:"dark"});
          setTimeout(() => {
            window.location.reload(true)
          }, 3000);
        }
        else{
          toast.warn(res.data.message,{theme:"dark"});
  
        }
        
      })
      .catch((error)=>{
       return null
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
                  Rejected Deposits
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
                    <h5>Reject Deposit Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
                {
                     rejectDepoSheet.length !==0 ?
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
                       {      
                       
                       rejectDepoSheet.map((items,index)=>{
                           return(
                             <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                             <td>{ rejectDepoSheet.length - index}</td>
                             <td>{items.payer_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_type}</td>
                            <td>{items.wallet_type}</td>
                            <td>{items.transaction_id}</td>
                            <td>{items.amount}</td>
                              <td>
                              <img className="img-fluid" src={`${process.env.REACT_APP_IMG_URL}${items.proof_image}`} alt=""  width={60}
                            style={{cursor:"pointer"}}
                            onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.proof_image}`, "_blank")}
                           />
                              </td>
                              <td className="text-danger">{items.status}</td>
                             <td>{items.Idate}</td>
                           <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>

                             <td>
                              <div className="d-flex justify-content-center">
                               <button onClick={()=>rejectDeposit(items.id)} className="btn btn-outline-info btn-sm">
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

export default RejectDepositSheet