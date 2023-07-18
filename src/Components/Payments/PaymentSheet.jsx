import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import axios from "axios";

const PaymentSheet = () => {
    const [paymentSheet , setPaymentSheet] = useState([]);

    function gettingLevels(){
        axios.get( `${process.env.REACT_APP_BASE_URL}fetch_payment`)
        .then((res)=>{
            setPaymentSheet(res.data.Data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    function deletePayment(id){
      axios.post(`${process.env.REACT_APP_BASE_URL}delete_payment/${id}`)
      .then((res)=>{
          toast.error("Payment Info Deleted!" , {theme:"dark"})
          setTimeout(() => {
            window.location.reload(true)
          }, 3000);
          })
      .catch((res)=>{
        toast.warn("Something went wrong" , {theme:"dark"})
      })
    }



    useEffect(() => {
        gettingLevels()
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
                  Payment
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
                    <h5>Payment Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                            <th>#</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account No</th>
                          <th>Binance Account</th>
                          <th>Okx Account</th>
                          <th>JazzCash Title</th>
                          <th>JazzCash No</th>
                          <th>Easypaisa Title</th>
                          <th>Easypaisa No</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        paymentSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.bank_account_title}</td>
                              <td>{items.bank_account_type}</td>
                               <td>{items.bank_account_no}</td>
                               <td>{items.binance_address}</td>
                              <td>{items.okx_address}</td>
                              <td>{items.jazzcash_title}</td>
                              <td>{items.jazzcash_no}</td>
                              <td>{items.easypaisa_title}</td>
                              <td>{items.easypaisa_no}</td>

                              <td>
                               <div className="d-flex justify-content-center">
                               <Link className="btn btn-outline-info btn-sm" to="/UpdatePaymentSheet" state={{ID:items.id}}>
                                    <i className="fa fa-pen"></i>
                                  </Link>&nbsp;&nbsp;
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>deletePayment(items.id)}>
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
  )
}

export default PaymentSheet