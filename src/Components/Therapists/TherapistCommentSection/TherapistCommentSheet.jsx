import therapistCommentEndPoints from "../../Api/TherapistComments.js";
import {Link , useLocation} from 'react-router-dom';
import colorScheme from '../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import React,{useState } from 'react';


const TherapistCommentSheet = () => {
  const {mutate:delTherapistComments} = therapistCommentEndPoints.useDelTherapistComments();

    const location = useLocation();
    const {ID} = location.state;
    const[therapistComments , setTherapistComments] = useState([]);

    useQuery(["all_therapits", ID], _=> therapistCommentEndPoints.fetchTherapistCommentsById(ID), {
        onSuccess: (data) => {
            setTherapistComments(data.data.comments);
        },
        onError: (err) => {
          return err;
        },
      });

      function delComments(id){
        delTherapistComments(id)
      }


  return (
    <>
         <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Therapist Comments
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
                    <h5>Comments Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
                    {
                        therapistComments && therapistComments.length > 0 ? (
                            <table className="table  text-nowrap">
                            <thead className="text-center">
                              <tr>
                                  <th>#</th>
                                <th>Therapist Name</th>
                                <th>Therapist Comment</th>
                                <th>Username</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {      
                              
                              therapistComments.map((items,index)=>{
                                  return(
                                    <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                    <td>{items.id}</td>
                                    <td>{items.therapistname}</td>
                                    <td>{items.comment}</td>
                                     <td>{items.username}</td>
                                     <td>{items.Idate}</td>
                                    <td>
                                     <div className="d-flex justify-content-center">
                                     <Link className="btn btn-outline-info btn-sm" to="/UpdateTherapistCommentSheet" state={{ID:items.id,TherapistComment:items.comment, ClientName:items.username}}>
                                          <i className="fa fa-pen"></i>
                                        </Link>&nbsp;&nbsp;
                                      <button className="btn btn-outline-danger btn-sm" onClick={()=>delComments(items.id)}>
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
                        ):
                        (
                            <div className="text-center">
                            <h2>No Record Found</h2>
                          </div>
                        )
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

export default TherapistCommentSheet