import {useLocation , useNavigate} from 'react-router-dom';
import colorScheme from '../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

const UpdateAdminComment = () => {
    const location = useLocation();
    const {ID} = location.state;
    const {Note} = location.state;
    const navigate = useNavigate();


        // loading and conditing hooks:
        const[input , setInput] = useState(false);
        const[loading , setLoading] = useState(false);

        const[adminNote , setAdminNote] = useState(Note);


    function UpdateAdminComment(e){
        e.preventDefault();
        setLoading(true)
          
        var formdata = new FormData();
        formdata.append("note", adminNote);
  
  
        axios.post(`${process.env.REACT_APP_BASE_URL}update_admin_note/${ID}`, formdata)
        .then((res)=>{
          toast.info("Section Updated", {theme:"dark"})
          setLoading(false)
          setInput(false)
          setTimeout(() => {
            navigate('/TherapistProfile')
          }, 2500);
        })
        .catch((err)=>{
            console.log(err)
            toast.warn("Something went wrong",{theme:"dark"}) 
            setLoading(false)
            setInput(false)
                
  
  
        })

      }
  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6 d-flex">
          <h1 style={{color:colorScheme.card_txt_color}}>Update Note</h1>
        </div>
      </div>
    </div>
  </section>

  <section className="content">
    <div className="container-fluid">      
    <div className="row">

        <div className="col-12 col-sm-12">
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
            Update Note
            {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form  onSubmit={UpdateAdminComment}>

              <div className="card-body">
       
             
                <div className="row">

                    <div className="col-lg-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail7">Notes*</label>
                        <textarea type="text" name="adminNote"  className="form-control" id="exampleInputEmail7" defaultValue={Note} onChange={(e)=>setAdminNote(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} rows={6}/>
        
                    </div>
                    </div>



                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info">
                    {loading === true? "loading...":"Submit"}
                </button>
              </div>
              </form>
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

export default UpdateAdminComment