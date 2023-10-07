import {useLocation , useNavigate , useParams} from 'react-router-dom';
import colorScheme from '../../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

const UpdateReviewAndRating = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { TherapistID } = useParams();
    
    const {ID} = location.state;
    const {Review} = location.state;
    const {Rating} = location.state;


        // loading and conditing hooks:
        const[input , setInput] = useState(false);
        const[loading , setLoading] = useState(false);

        const[review , setReview] = useState(Review);
        const[rating , setRating] = useState(Rating);


    function updateRatingAndReview(e){
        e.preventDefault();
        setLoading(true)
          
        var formdata = new FormData();
        review &&
        formdata.append("review",review);
        rating &&
        formdata.append("rating", rating);
  
  
        axios.post(`${process.env.REACT_APP_BASE_URL}update_review_byid/${ID}`, formdata)
        .then((res)=>{
          toast.info("Section Updated", {theme:"dark"})
          setLoading(false)
          setInput(false)
          setTimeout(() => {
            navigate(`/TherapistProfile/${TherapistID}`)
          }, 2500);
        })
        .catch((err)=>{
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
          <h1 style={{color:colorScheme.card_txt_color}}>Update Rating & Review</h1>
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
            Update Rating & Review
            {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form  onSubmit={updateRatingAndReview}>

              <div className="card-body">
       
             
                <div className="row">

                    <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail7">Review</label>
                        <input type="text" name="review"  className="form-control" id="exampleInputEmail7" defaultValue={Review} onChange={(e)=>setReview(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
        
                    </div>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail9">Rating</label>
                        <input type="text" name="rating"  className="form-control" id="exampleInputEmail9" defaultValue={Rating}  onChange={(e)=>setRating(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
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

export default UpdateReviewAndRating