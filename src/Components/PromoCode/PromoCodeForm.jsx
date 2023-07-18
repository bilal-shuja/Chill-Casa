import PromoCodeEndPoint from '../Api/PromoCodeEndPoint.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';

const PromoCodeForm = () => {
    const {mutate:promoCodeSubmission} = PromoCodeEndPoint.usePromoCodeSubmission();

    const[loading, setLoading] = useState('');
    const[input , setInput] = useState('');

    const[promoCode , setPromoCode] = useState('');
    const[discount , setDiscount] = useState('');
    const[discountType , setDiscounType] = useState('');
    const[expiryDate , setExpiryDate] = useState('');

  

    function submitPromoInfo() {
          setLoading(true)
          if(promoCode && discount && discountType &&  expiryDate){
         
                var formdata = new FormData();
                formdata.append("code", promoCode);
                formdata.append("discount_type",discountType)
                formdata.append("discount",discount)
                formdata.append("expiry_date",expiryDate)

                promoCodeSubmission(formdata, {
                    onMutate: () => {
                      setLoading(true);
                    },
                    onSettled: () => {
        
                      setLoading(false);
                      setInput(false);
                    }
                  })

                  setPromoCode('')
                  setDiscount('')
                  setDiscounType('--- Select Category ---')
                  setExpiryDate('')
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
          <h1 style={{color:colorScheme.card_txt_color}}>Promo Code</h1>
          <span>""</span>
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
            Promo Code Form
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">

                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Promo Code*</label>
                  <input type="text" name="promocode"  className={promoCode === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword4"  onChange={(e)=>setPromoCode(e.target.value)} placeholder="Enter promo code" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Discount*</label>
                  <input type="number" name="discount" className={discount === ''&& input === true?"form-control border border-danger p-1":"form-control"} id="exampleInputPassword4"  onChange={(e)=>setDiscount(e.target.value)} placeholder="Enter discount" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select Discount Type*</label>
                        <select  className={discountType === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={(e)=>setDiscounType(e.target.value) }
                              >
                                <option value="none">--- Select Category ---</option>
                                  <option value="Percentage">Percentage</option>
                                  <option value="Amount">Amount</option>
                          </select>
                    </div>
            </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Expiry Date*</label>
                  <input type="date" name="Price" className={expiryDate === ''&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword4"  onChange={(e)=>setExpiryDate(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>
                
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={submitPromoInfo}>
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

export default PromoCodeForm