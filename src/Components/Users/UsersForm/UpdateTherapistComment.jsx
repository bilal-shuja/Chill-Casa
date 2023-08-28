import therapistCommentEndPoints from "../../Api/TherapistComments.js";
import {useLocation , useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';

const UpdateTherapistComment = () => {
    const location = useLocation();
  const navigate = useNavigate();

    const {ID , TherapistComment,ClientName} = location.state;
    const {mutate:UpdateTherapistComments} = therapistCommentEndPoints.useUpdateTherapistComments();

  
      
      const[loading, setLoading] = useState('');
      const[input , setInput] = useState('');
  
      const[updateComment , setUpdateComment] = useState('');

      function updateTherapistComment(e){
        e.preventDefault();
        setLoading(true)
        if(updateComment){
          const therapistCommentObj={
            comment:updateComment
          }
                 
          UpdateTherapistComments({ID,therapistCommentObj}, {
            onMutate: () => {
              setLoading(true);
            },
            onSettled: () => {

              setLoading(false);
              setInput(false);

              setUpdateComment('');
            }
          })
          setTimeout(() => {
            navigate('/UserProfile')
          }, 2500);
        }
  
        else{
        toast.warn("Fill the information!",{theme:"dark"})
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
          <h1 style={{color:colorScheme.card_txt_color}}>Comments</h1>
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
          <div className="card" style={{    background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one}}>
            <div className="card-header">
           Update Comments
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username*</label>
                        <input type="text" name="Income" defaultValue={ClientName} className="form-control" id="exampleInputEmail2"   placeholder="Enter Account Title"   style={{   background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,}} disabled/>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Therapist Comment*</label>
                  <input type="text" name="Quantity" defaultValue={TherapistComment} className={updateComment === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword3"  onChange={(e)=>setUpdateComment(e.target.value)} placeholder="Enter Comment" style={{   background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,}} />
                    </div>
                    </div>

                </div>





              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={updateTherapistComment}>
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

export default UpdateTherapistComment