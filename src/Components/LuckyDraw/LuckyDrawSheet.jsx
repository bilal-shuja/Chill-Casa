import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import ReadMoreReact from "read-more-react";
import Filter from "../Filters/Filter";
import { toast } from "react-toastify";
import {Modal} from 'pretty-modal';
import axios from "axios";

const LuckyDrawSheet = () => {
  const [luckyDrawData , setLuckyDrawData] = useState([]);
  const[luckyDrawTemp , setLuckyDrawTemp] = useState([])
  const LuckyDrawSheetIdentifier = "LuckyDrawSheet";
  const [stateID , setStateID] = useState('');
  const[luckyDrawStatus ,setLuckyDrawStatus] = useState('All')
  const [isOpen, setIsOpen] = useState(false);
  const[roleID , setRoleID] = useState('');


  function gettingLuckyDraw(){
    axios.get(`${process.env.REACT_APP_BASE_URL}fetch_all_luckydraw`)
    .then((res)=>{
      setLuckyDrawData(res.data.Lucky_draws)
      setLuckyDrawTemp(res.data.Lucky_draws)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function delLuckyDraw(id){
    axios.post(`${process.env.REACT_APP_BASE_URL}delete_luckydraw/${id}`)
    .then((res)=>{
      toast.error("Lucky Draw Deleted",{theme:"dark"});
      setTimeout(() => {
          window.location.reload(true)
      }, 2000);

    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});
    })
  }

  function changingLuckyDrawStatus(){
    const LuckykStatus = {
      status:luckyDrawStatus
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}UpdateluckydrawStatus/${stateID}`,LuckykStatus)
    .then((res)=>{
      toast.info("Status Updated",{theme:"dark"});
      setTimeout(() => {
        window.location.reload(true)
      }, 3000);
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});
    })
  }
  function gettingDate(val){
    setLuckyDrawTemp(val)
  }
  function gettingStatus(val){
    setLuckyDrawTemp(val)
  }
  function gettingPrice(val){
    setLuckyDrawTemp(val)
  }

  
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id);
      }
  
    } catch {
      return null;
    }
  }

  useEffect(() => {
    gettingLuckyDraw()
    SetLocalLogin()
  }, [])
  

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Lucky Draw Sheet
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
                  {/* <li className="breadcrumb-item active">Add Package</li> */}
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
                    <h5>Lucky Draw Sheet</h5>   
                        <button className="btn btn-outline-info" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                  </div>
                  <div className="card-body table-responsive p-2">
                    <div className="row p-2">               
                        <Filter luckyDrawData={luckyDrawData} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} LuckyDrawSheetIdentifier={LuckyDrawSheetIdentifier}/>
                    </div>

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Fee</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Date</th>
                          {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                          <th>Actions</th>
                          }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {/* {
                          priceOp === "H-to-L" ?
                          PackageData.sort((a,b) => b.Price-a.Price).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          priceOp ==="L-to-H"?
                          PackageData.sort((a,b) => a.Price-b.Price).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate !=='' && searchByStatus ==='All'?
                          PackageData.filter((item) => item.Created_at === searchByDate).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate ==='' &&  (searchByStatus ==='Active' || searchByStatus ==='In-Active')?
                          PackageData.filter((item) => item.Status === searchByStatus).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate !=='' &&  (searchByStatus ==='Active' || searchByStatus ==='In-Active')?
                          PackageData.filter((item) => item.Created_at === searchByDate && item.Status  ).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          priceOp === "All"?
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                className="col-lg-3"
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByStatus === "All"?
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                        }
                        */}
                        {      
                        
                        luckyDrawTemp.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.title}</td>
                              <td>{items.fees}</td>
                              <td >
                              <ReadMoreReact
                                  text={
                                   items.body
                                  }
                                  min={8}
                                  ideal={20}
                                  max={30}
                                  readMoreText="...Read More"
                                />                                
                                </td>
                              {
                                items.status === "active"?
                              <td style={{color:"#64dd17"}}>{items.status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.status}</td>

                              }
                          
                              <td>{items.Idate}</td>

                              {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                               <div className="d-flex justify-content-center">
                                <button onClick={()=>delLuckyDraw(items.id)} className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                  &nbsp;&nbsp;&nbsp;
                                  <button onClick={() => {
                                  setIsOpen(true) 
                                  setStateID(items.id)}}  className="btn btn-outline-warning btn-sm">
                                <i className="fa-solid fa-spinner"></i>
                                </button>
                              
                                </div>   
                              </td>
                        }
                            </tr>
                            )
                          })
                        
                        }

                      </tbody>
                    </table>
                    <Modal  onClose={() => {setIsOpen(false)}} open={isOpen}>
                           <div className="card-body ">
                           <div className="form-group">
                           <p><b>Change Status</b></p>
                           <select className="form-control-sm" aria-label="Default select example"style={{ background: colorScheme.login_card_bg,color: colorScheme.card_txt_color,paddingRight:"11em"}}
                             onChange={(e) => setLuckyDrawStatus(e.target.value)}>
                             <option value="All">All</option>
                             <option value="Active">Active</option>
                             <option value="In-Active">In-Active</option>
                             </select>
                           </div>
                           <button onClick={()=>{changingLuckyDrawStatus()}} className="btn btn-outline-info btn-sm">Submit</button>
                           </div>
                           </Modal>
                    
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

export default LuckyDrawSheet