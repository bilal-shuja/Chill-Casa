import axios from 'axios';
import React,{useState} from 'react';
import { toast } from "react-toastify";
import colorScheme from '../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = () => {


    const[loading, setLoading] = useState('');
    const[input , setInput] = useState('');

    const[bankAccType , setBankAccType] = useState('');
    const[qrImg , setQRImg] = useState('');
  

    function submitPaymentInfo() {
          setLoading(true)
          if(bankAccType && qrImg ){
         
                var formdata = new FormData();
                formdata.append("address", bankAccType);
                formdata.append("qrcode",qrImg, "[PROXY]")
            axios.post(`${process.env.REACT_APP_BASE_URL}update_account_details`,formdata)
            .then((res)=>{
                setLoading(false)
                toast.info("Wallet Info Submit!", {theme:"dark"})
                
               setBankAccType('')
               setQRImg('')
   
       
            })
            .catch((error)=>{
              if(error.status === "401"){
                setLoading(false)
                toast.warn(error.data.message)
              }
              else{
                setLoading(false)
                toast.warn("Something went wrong",{theme:"dark"})
                console.log(error)
    
              }
             
             
          })
    
            setInput(false);
        }
        else{
          
          toast.warn("Fill the information !",{theme:"dark"})
          setLoading(false)
          setInput(true)
        }
    
      }
    
  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Payments</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  <section className="content">
    <div className="container-fluid">      
    <div className="row">

        <div className="col-12 col-sm-12">
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
           Add Payments
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">

            

                    
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Wallet No*</label>
                  <input type="text" name="Price"  className={bankAccType === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword4"  onChange={(e)=>setBankAccType(e.target.value)} placeholder="Enter Wallet Address" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Select QR*</label>
                  <input type="file" name="Price" className={qrImg === ''&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword4"  onChange={(e)=>setQRImg(e.target.files[0])}  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

               




              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={submitPaymentInfo}>
                    {loading === true? "loading...":"Submit"}
                </button>
              </div>
          </div>
          {/* /.card */}
        </div>
        
       
      </div>
    </div>
  </section>
</div>
</div>

    </>
  )
}

export default PaymentForm