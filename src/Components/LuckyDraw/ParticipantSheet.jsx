import colorScheme from "../Colors/Styles.js";
import React,{useState , useEffect} from 'react';
import Filter from '../Filters/Filter';
import axios from 'axios';

const ParticipantSheet = () => {
    const [participantSheet , setParticipantSheet] = useState([]);


    function gettingParticipantsData(){
      axios.get(`${process.env.REACT_APP_BASE_URL}fetch_all_apply_luckydraw`)
      .then((res)=>{
        setParticipantSheet(res.data.Data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
   

    useEffect(() => {
      gettingParticipantsData()
    }, [])
    
    
    const ParticipantSheetIdentifier = "setParticipantData";
    function gettingDate(val){
      setParticipantSheet(val)
    }
    function gettingStatus(val){
      setParticipantSheet(val)
    }
    function gettingPrice(val){
      setParticipantSheet(val)
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
                  Participants Sheet
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h5>Participants Sheet</h5>   
                        <button className="btn btn-outline-info" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                  </div>
                  <div className="card-body table-responsive p-2">
                    <div className="row p-2">               
                        <Filter ParticipantData={participantSheet} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} ParticipantSheetIdentifier={ParticipantSheetIdentifier}/>
                    </div>

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>User#</th>
                          <th>Participant Name</th>
                          <th>Lucky Draw ID</th>
                          <th>Phone</th>
                          <th>Date</th>
                          <th>Actions</th>
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
                        
                        participantSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.user_id}</td>
                              <td>{items.username}</td>
                              <td>{items.luckydraw_id}</td>
                              <td >{items.phone}</td>                          
                              <td>{items.Idate}</td>
                              <td>
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                              </td>
                            </tr>
                            )
                          })
                        
                        }

                      </tbody>
                    </table>
                    
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

export default ParticipantSheet