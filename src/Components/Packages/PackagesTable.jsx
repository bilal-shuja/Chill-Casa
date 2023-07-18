import React, {useState,useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {useQuery} from 'react-query';
import Filter from "../Filters/Filter";
import {toast} from "react-toastify";
import {Modal} from 'pretty-modal';
import Moment from 'react-moment';
import axios from 'axios';
import 'moment-timezone';

const PackagesTable = () => {

  const PackageTableIdentifier = "PackageTable";

  const[getPackageSheet , setPackageSheet] = useState([]);
  const[tempPackageArr , setTempPackageArr] = useState([]);
  const [packageStatus , setPackageStatus] = useState('All');
  const [stateID , setStateID] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const[roleID , setRoleID] = useState('');



  function gettingPackages(){

    axios.get(`${process.env.REACT_APP_BASE_URL}getPackages`)
    .then((res)=>{
      setPackageSheet(res.data.message)
      setTempPackageArr(res.data.message)
      // console.log(res.data.message)
    })
    .catch((error)=>{
      return null
    })
  }


async function getPackages(){
  const d = await  axios.get(`${process.env.REACT_APP_BASE_URL}getPackages`)
     return d

}


const[PackageDataArr , setPackageDataArr] = useState([]);

  const {isLoading ,isFetching ,data ,isError , error} = useQuery('packages',getPackages,{
    refetchOnWindowFocus:true,
      onSuccess:(data)=>{
        setPackageDataArr(data.data.message)
     }
  }
 
   )
   


   if(isLoading || isFetching){
    console.log({isLoading,isFetching})
   }
  //  else if(data !== packageDataArr){
  //   setPackageDataArr(data)
  //  }
   else{
    // console.log("Data with data obj& useState",packageDataArr)
   }






  function changingPackageStatus(){
    const packStatus = {
      status:packageStatus
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}UpdatePackageStatus/${stateID}`,packStatus)
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

  function deletePackage(id){
    axios.post(`${process.env.REACT_APP_BASE_URL}deletepackage/${id}`)
    .then((res)=>{
        toast.error("Package deleted" , {theme:"dark"})
        setTimeout(() => {
          window.location.reload(true)
        }, 3000);
        })
    .catch((res)=>{
      toast.warn("Something went wrong" , {theme:"dark"})
    })
  }


  
  
  function gettingDate(val){
    setTempPackageArr(val)
  }
  
  function gettingStatus(val){
    setTempPackageArr(val)
  }

  function gettingPrice(val){
    setTempPackageArr(val)
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
  gettingPackages()
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
                  Packages
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
                    <h5>Packge Sheet</h5>   
                        <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                        <div className="row p-2">  
                        <Filter PackageData={getPackageSheet} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} PackageTableIdentifier={PackageTableIdentifier}/>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-2">
                  
                    {
                        PackageDataArr.length !==0?
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Daily Profit</th>
                          <th>levels</th>
                          <th>Working Days</th>
                          <th>Date</th>
                          <th>Time</th>
                          {/* {

                            roleID === "2"|| roleID === "3"|| roleID === "4"? null: <th>Actions</th>
                          } */}
                          
                        </tr>
                      </thead>
                     
                      <tbody className="text-center">
         

                         {      

              

                    PackageDataArr.map((items,index)=>{
        
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.id}</td>
                            <td>{items.package_name}</td>
                            <td >{items.daily_profits}</td>
                            <td>{items.levels}</td>
                            <td>{items.working_days}</td>
                    
                            {/* <td>
                              <ReadMoreReact
                                text={
                                 items.description
                                }
                                min={10}
                                ideal={35}
                                max={80}
                                readMoreText="...Read More"
                              />
                            </td> */}
                            {
                            //   items.status === "active"?
                            // <td style={{color:"#64dd17"}}>{items.status}</td>
                            // :
                            // <td style={{color:"#ff1744"}}>{items.status}</td>
                  
                            }
                            {/* <td>
                              <img className="img-fluid" src={`${process.env.REACT_APP_IMG_URL}${items.image}`} alt="package_img"
                              style={{cursor:"pointer"}}
                              onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.image}`, "_blank")}
                              />
                            </td> */}
                            <td><Moment date={items.updated_at} format="YYYY/MM/DD"/></td>
                            <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                            {
                              roleID === "2" || roleID === "3" || roleID === "4" ?
                              null
                              :
                            <td>
                                {/* <button   
                                  onClick={() => {
                                  setIsOpen(true) 
                                  setStateID(items.id)}}  className="btn btn-outline-warning btn-sm">
                                <i className="fa-solid fa-spinner"></i>
                                </button> */}


                                &nbsp;&nbsp;
                                {/* {
                              roleID === "2" || roleID === "3" || roleID === "4" || roleID ==="6" ?
                              null
                              :
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>deletePackage(items.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                                } */}
                            </td>
                          }

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
                  </div>
                </div>
                 <Modal  onClose={() => {setIsOpen(false)}} open={isOpen}>
                           <div className="card-body ">
                           <div className="form-group">
                           <p><b>Change Status</b></p>
                           <select className="form-control-sm" aria-label="Default select example"style={{ background: colorScheme.login_card_bg,color: colorScheme.card_txt_color,paddingRight:"11em"}}
                             onChange={(e) => setPackageStatus(e.target.value)}>
                             <option value="All">All</option>
                             <option value="active">active</option>
                             <option value="in-active">in-active</option>
                             </select>
                           </div>
                           <button onClick={()=>{changingPackageStatus()}} className="btn btn-outline-info btn-sm">Submit</button>
                           </div>
                           </Modal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default PackagesTable;
