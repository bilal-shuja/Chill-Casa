import {useLocation , useNavigate} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from 'axios';

const UpdateBookingDateTime = () => {
  const location = useLocation();
  const {ID} = location.state;
  const {Date} = location.state;
  const {Time} = location.state;
  const navigate = useNavigate();

    
    const[loading, setLoading] = useState('');
    const[input , setInput] = useState('');

  const[bookingDate , setBookingDate] = useState('');
  const[bookingTime , setBookingTime] = useState('');


  function updatePaymentInfo(e){

    e.preventDefault()
    setLoading(true)

    var formdata = new FormData();
    formdata.append("date",bookingDate);
    formdata.append("time", bookingTime);



    axios.post(`${process.env.REACT_APP_BASE_URL}update_booking/${ID}`,formdata)
    .then((res)=>{
      toast.info("Booking Updated!",{theme:"dark"});
      console.log(res)
      setLoading(false)
      setTimeout(() => {
        navigate('/UserBookingSheet')
      }, 2500);
    })
    .catch((error)=>{
      setLoading(false)
      toast.warn("Something went wrong",{theme:"dark"})
      console.log(error)
    })

  }
  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Update Booking</h1>
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
           Update Booking Date & Time
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Update Date*</label>
                        <input type="date" name="bookingDate" defaultValue={Date} className={bookingDate === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail2"  onChange={(e)=>setBookingDate(e.target.value)}    style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Update Time*</label>
                  <input type="text" name="bookingTime" defaultValue={Time} className={bookingTime === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword3"  onChange={(e)=>setBookingTime(e.target.value)} placeholder="Enter Time" style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}} />
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

export default UpdateBookingDateTime