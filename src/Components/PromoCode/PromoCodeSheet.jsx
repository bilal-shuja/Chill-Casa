import PromoCodeEndPoint from '../Api/PromoCodeEndPoint.js';
import colorScheme from "../Colors/Styles.js";
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from 'react-query';
import Moment from 'react-moment';
import 'moment-timezone';

const PromoCodeSheet = () => {
    const[promos , setAllPromos] = useState([]);

        // Hook's for search filter:
        const[date , setDate] = useState('');
        const[email , setEmail] = useState('');
        const[userName, setUsername] = useState('');

        
        const[checkByDate, setCheckByDate] = useState('');

        useQuery('all_Promo_Code', PromoCodeEndPoint.getAllPromoCodes,{
            onSuccess:(data)=>{
                setAllPromos(data.data.Promo_codes)
           },
           onError: (err) => {
            return err;
          }
        })

        console.log(promos)


        const  checkTherapistByDate = () => {

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
                Promo Code
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
        
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
            
          <div className="container-fluid">
            <div className="row">
                        {/* <div className="col-lg-3 ">
                          <div className="form-group">
                                  <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} onChange={(e)=>setCheckByDate(e.target.value)}/>
                          </div>
                          <div className="col-lg-3">
                          <button onClick={()=> approveDepoByDate()} className="btn btn-sm btn-outline-info">
                            Check
                          </button>
                          </div>
                  
                          </div> */}
              <div className="col-lg-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                    
                  <div className="card-header">        
                    <h5>PromoCode Sheet</h5>
                    <div className="row mt-3 mb-1">

                    <div className="col-lg-6">
                    <Link to="/PromoCodeForm" className="btn btn-outline-info">
                        Add Promo Code
                    </Link>
                    </div>
                    </div>
                       
                    {/* <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button> */}
                   
                 
                        
                        <div className="row p-2">

                        <div className="col-sm-4">
                          <label htmlFor="" className="form-label">Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setDate(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-4">
                        <label htmlFor="" className="form-label">Search with Email:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Phone..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setEmail(e.target.value)}
                              />
                        </div>
                    </div>

                    
                    <div className="col-sm-4">
                        <label htmlFor="" className="form-label"> Search with Username:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Username..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setUsername(e.target.value)}
                              />
                        </div>
                    </div>

                    
                    </div>

         
                    
                  </div>
                  <div className="card-body table-responsive p-2">

                    {
                  

                (promos &&  promos.length > 0 ) ?

                (
                <table className="table  text-nowrap">
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Promo Code</th>
                        <th>Discount Type</th>
                        <th>Discount</th>
                        <th>Expiry Date</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                      {
                     promos.map((items,index)=>{
                      return(
                          <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                          <td>{promos.length - index}</td>
                          <td>{items.code}</td>
                          <td>{items.discount_type}</td>
                          <td>{items.discount}</td>
                          <td className="text-danger">{items.expiry_date}</td>              
                          <td><Moment date={items.updated_at} format="YYYY/MM/DD"/></td>

                          <td>
                            ......
                          {/* <Link className="btn btn-outline-info btn-sm" to="#s" state={{ID:items.id}}>
                          <i className="fa fa-pen"></i>
                          </Link> */}
                          </td>
                          </tr>
                      )
                     })
                      
                      }

                    </tbody>
                    
                  </table>
                )
                  
                :

                  (
                    <div className="text-center">
                    <h2>No Record Found</h2>
                    </div>
                  )
                
                    }

                    {/* {remainingThreapistCount && remainingThreapistCount.length > 0 && (
                      only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )} */}
                  </div>
                </div>

                 {/*Query Modal Start  */}
                
              {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog" >
                <div className="modal-content" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:colorScheme.card_txt_color}}>Query Area</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"  style={{color:colorScheme.card_txt_color}}>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea type="text" className="form-control" value={hostMessage} placeholder="Writer your query here..." row={6} style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color}} onChange={(e)=>setHostMessage(e.target.value)}/>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-info" onClick={submitHostQuery}>Submit</button>
                  </div>
                </div>
              </div>
            </div> */}

                {/* Query Modal End */}

                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}

export default PromoCodeSheet