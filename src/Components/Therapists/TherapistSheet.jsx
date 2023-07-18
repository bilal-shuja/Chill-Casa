import TherapistEndPoint from '../Api/TherapistEndPoints.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {Link} from 'react-router-dom';
// import {toast} from "react-toastify";
import {useQuery} from 'react-query';
import React,{useState} from 'react';
// import Moment from 'react-moment';
// import 'moment-timezone';

const TherapistSheet = () => {
    const[therapists , setAllTherapists] = useState([]);

    // Hook's for search filter:
    const[date , setDate] = useState('');
    const[email , setEmail] = useState('');
    const[userName, setUsername] = useState('');
    
    //Hook for setting-up entries in table: 
     const[showLength, setShowLength] = useState(20);


    //  Method for getting specific amount of entities in table:
     const remainingThreapistCount = therapists && therapists.length > 0 ? "...Loading" : therapists.slice(showLength);

    // Getting all therapists function: 
    useQuery('all_therapits',TherapistEndPoint.getAllTherapists,{
        onSuccess:(data)=>{
            setAllTherapists(data.data.Therapists)
       },
       onError: (err) => {
        return err;
      }
    })


// Filter function against different inputs(e.g. date,email,username):
    const filterTherapistData = therapists.length > 0 && date !=='' &&  email === ''  && userName === ''? therapists.filter((items)=> items.Idate === date)
    :email !== "" &&  date ==='' && userName === "" ? therapists.filter((items)=> items.email === email)
    :userName !== "" && date === "" && email === ""? therapists.filter((items)=> items.therapist_name === userName)
    : therapists

  
  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Therapists
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
              <div className="col-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Therapists Sheet</h5>   
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
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
                              <input type="text" className="form-control" placeholder="Search by Email..."
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
                        therapists.length !==0?

                   <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Therapist Name</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Therapist Category</th>
                          <th>Image</th>
                          <th>Date</th>
                          {/* {
                          roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6" ?  null: */}
                          <th>Actions</th>
                        {/* } */}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                       filterTherapistData.filter((items, index)=> index <= showLength).map((items,index)=>{
                        return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{filterTherapistData.length - index}</td>
                            <td>{items.id}</td>
                            <td>{items.therapist_name}</td>
                            <td>{items.email}</td>
                            <td>{items.password}</td>
                            <td>{items.category_name === null ?"no category found": items.category_name.map((categories)=>{
                              return(
                                <li key={categories} className="text-center" style={{listStyleType:"none"}}> {categories}</li>
                              )
                            })}</td>
                            <td><img src={`${process.env.REACT_APP_IMG_URL}${items.image}`} alt=""  width={100}/></td>
                            <td>{items.Idate}</td>

                            <td>
                              .....
                            {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateTherapist" state={{ID:items.id}}>
                            <i className="fa fa-pen"></i>
                            </Link> */}
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

                    {remainingThreapistCount && remainingThreapistCount.length > 0 && (
                      // only display the "Show More" button if there are more rows to show
                      <button  className="btn btn-outline-info" onClick={()=> setShowLength(showLength+30)}>Show More</button>
                    )}
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

export default TherapistSheet