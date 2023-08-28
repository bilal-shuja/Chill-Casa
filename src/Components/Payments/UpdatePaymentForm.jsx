import {useLocation , useNavigate} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from 'axios';

const UpdatePaymentForm = () => {
  const location = useLocation();
  const {ID} = location.state;
  const navigate = useNavigate();

    
    const[loading, setLoading] = useState('');
    const[input , setInput] = useState('');

    const[bankAccTitle , setBankAccTitle] = useState('');
    const[bankAccType , setBankAccType] = useState('');
    const[bankAccNo , setBankAccNo] = useState('');
    const[binanceAcc , setBinanceAcc] = useState('');
    const[okxAcc , setOkxAcc] = useState('');

    
    const[jazzCashTitle , setJazzCashTitle] = useState('');
    const[jazzCashNo , setJazzCashNo] = useState('');

    const[easyPaisaTitle , setEasyPaisaTitle] = useState('');
    const[easyPaisaNo , setEasyPaisaNo] = useState('');


    function gettingPayment(){
        const payID={
            id:ID
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}fetch_payment_byid`,payID)
        .then((res)=>{

           
            setBankAccTitle(res.data.Data.bank_account_title)
            setBankAccType(res.data.Data.bank_account_type)
            setBankAccNo(res.data.Data.bank_account_no) 
            setBinanceAcc(res.data.Data.binance_address)
            setOkxAcc(res.data.Data.okx_address)
            setJazzCashTitle(res.data.Data.jazzcash_title)
            setJazzCashNo(res.data.Data.jazzcash_no)
            setEasyPaisaTitle(res.data.Data.easypaisa_title)
            setEasyPaisaNo(res.data.Data.easypaisa_no)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    function updatePaymentInfo() {
          setLoading(true)
          if(bankAccTitle && bankAccType && bankAccNo && binanceAcc && okxAcc && jazzCashTitle && jazzCashNo && easyPaisaTitle && easyPaisaNo){
              const regUserObj ={
                id:ID,
                bank_account_title:bankAccTitle,
                bank_account_type:bankAccType,
                bank_account_no:bankAccNo,
                binance_address:binanceAcc,
                okx_address:okxAcc,
                jazzcash_title:jazzCashTitle,
                jazzcash_no:jazzCashNo,
                easypaisa_title:easyPaisaTitle,
                easypaisa_no:easyPaisaNo

              
                }
            axios.post(`${process.env.REACT_APP_BASE_URL}update_payment`,regUserObj)
            .then((res)=>{
                setLoading(false)
                toast.info("Payment Info Updated!", {theme:"dark"})
                setTimeout(() => {
                    navigate('/PaymentSheet')
                  }, 3500);
                
               setBankAccTitle('')
               setBankAccType('')
               setBankAccNo('')
               setBinanceAcc('')
               setOkxAcc('')
               setJazzCashTitle('')
               setJazzCashNo('')
               setEasyPaisaTitle('')
               setEasyPaisaNo('')
             
       
            })
            .catch((error)=>{
              if(error.status === 401){
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


      useEffect(() => {
        gettingPayment()
      }, [])
      
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
           Update Payments
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Account Title*</label>
                        <input type="text" name="Income" defaultValue={bankAccTitle} className={bankAccTitle === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail2"  onChange={(e)=>setBankAccTitle(e.target.value)} placeholder="Enter Account Title"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Account Type*</label>
                  <input type="text" name="Quantity" defaultValue={bankAccType} className={bankAccType === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword3"  onChange={(e)=>setBankAccType(e.target.value)} placeholder="Enter Account Type" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                    </div>
                    </div>

                    
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Account No*</label>
                  <input type="number" name="Price" defaultValue={bankAccNo} className={bankAccNo === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword4"  onChange={(e)=>setBankAccNo(e.target.value)} placeholder="Enter Account No" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

                <div className="row">


                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Binance Account*</label>
                  <input type="text" name="Quantity" defaultValue={binanceAcc} className={binanceAcc === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword5"  onChange={(e)=>setBinanceAcc(e.target.value)} placeholder="Enter Binance Account" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Okx Account*</label>
                  <input type="text" name="Quantity" defaultValue={okxAcc} className={okxAcc === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setOkxAcc(e.target.value)} placeholder="Enter Okx Account" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>


                </div>

                
                <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Jazz Cash Title*</label>
                  <input type="text" name="Quantity" value={jazzCashTitle} className={jazzCashNo === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword5"  onChange={(e)=>setJazzCashTitle(e.target.value)} placeholder="Enter Jazz Cash Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Jazz Cash No*</label>
                  <input type="number" name="Quantity" value={jazzCashNo} className={jazzCashNo === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setJazzCashNo(e.target.value)} placeholder="Enter Jazz Cash No" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>
                </div>


                <div className="row">
                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Easy Paisa Title*</label>
                  <input type="text" name="Quantity" value={easyPaisaTitle} className={easyPaisaTitle === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword5"  onChange={(e)=>setEasyPaisaTitle(e.target.value)} placeholder="Enter Easy Paisa Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Easy Paisa No*</label>
                  <input type="text" name="Quantity" value={easyPaisaNo} className={easyPaisaNo === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setEasyPaisaNo(e.target.value)} placeholder="Enter Easy Paisa No" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>
                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={updatePaymentInfo}>
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

export default UpdatePaymentForm