import userEndPoint from '../Api/UserEndPoint.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import ReadMoreReact from 'read-more-react';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Moment from 'react-moment';
import 'moment-timezone';

const AdminCommentSheet = () => {

    const [commentSheet , setAllComments] = useState([]);
    const [count, setCount] = useState('');
    const[pages, setPages] = useState(1);



    
    const resultsPerPage = 10;
    // function for getting page next:
      const handleNextPage = () => {
        setPages((prevPage) => prevPage + 1);
      };
    // function for getting previous page:
      const handlePrevPage = () => {
        setPages((prevPage) => Math.max(prevPage - 1, 1));
      };


    useQuery(['all_comments',pages],_=> userEndPoint.fetchAllComments(pages),{
        onSuccess:(data)=>{
         setAllComments(data.data.notes);
          setCount(data.data.total_count)
  
       },
       onError: (err) => {
        return err;
      }
    }
    
     )

     const totalResults = count|| 0;
     const startResult = (pages - 1) * resultsPerPage + 1;
     const endResult = Math.min(pages * resultsPerPage, totalResults);



  return (
    <>
        <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Comments
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
                        commentSheet && commentSheet.length > 0 ?
                        <table className="table  text-nowrap">
                        <thead className="text-center">
                          <tr>
                              <th>#</th>
                            <th>Username</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {      
                          
                          commentSheet.map((items,index)=>{
                              return(
                                <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                <td>{items.id}</td>
                                <td>{items.firstname}</td>
                                <td>
                                  <ReadMoreReact
                                  text={
                                      items.see_note
                                  }
                                  min={10}
                                  ideal={20}
                                  max={50}
                                  readMoreText="...Read More"
                                />                    
                                </td>
                                 <td><Moment date={items.updated_at} format="YYYY/MM/DD"/></td>
  
                                <td>
                                  ....
                                 {/* <div className="d-flex justify-content-center">
                                 <Link className="btn btn-outline-info btn-sm" to="/UpdatePaymentSheet" state={{ID:items.id}}>
                                      <i className="fa fa-pen"></i>
                                    </Link>&nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm" onClick={()=>deletePayment(items.id)}>
                                      <i className="fa fa-trash"></i>
                                    </button>
                                 
                                  </div>    */}
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

                <button className="btn btn-outline-light btn-sm" onClick={handlePrevPage} disabled={pages === 1}>
                <i className="fa-solid fa-arrow-left"></i>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-light btn-sm" onClick={handleNextPage} disabled={totalResults <= 10}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <p >Showing {startResult} - {endResult} of {totalResults} results</p>
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

export default AdminCommentSheet