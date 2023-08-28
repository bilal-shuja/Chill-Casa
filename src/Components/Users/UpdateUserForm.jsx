import {useLocation , useNavigate} from 'react-router-dom';
import React,{useState , useEffect} from 'react'; 
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from 'axios';

const UpdateUserForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {ID} = location.state;
  

    const [userEmail, setUserEmail] = useState("");
    const[password , setPassword] = useState('');

    const[clientType , setClientType] = useState('');

    const[showprofileImg , setShowProfileImg] = useState('')
    const[profileImg , setProfileImg] = useState(null);
    const[address , setAddress] = useState('');


  
    const[loading , setLoading] = useState(false)


    function gettingIndUser(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
        .then((res)=>{
          setShowProfileImg(res.data.data.profile_pic)
            setAddress(res.data.data.residence_address)
            setClientType(res.data.data.type_of_client)
            setUserEmail(res.data.data.email)

        })
        .catch((error)=>{
          return error;
        })
    }




    function submitUserInfo(e){
        e.preventDefault()
        setLoading(true)
    
        var formdata = new FormData();
        clientType &&
    formdata.append("type_of_client",clientType);
    address && 
    formdata.append("residence_address", address);
    profileImg && 
    formdata.append("profile_pic",profileImg);
    userEmail === null && 
    formdata.append("email", userEmail);
    password === null &&
    formdata.append("password", password);  
    
    
        axios.post(`${process.env.REACT_APP_BASE_URL}update_user/${ID}`,formdata)
        .then((res)=>{
          toast.info("Client Updated!",{theme:"dark"});
          setLoading(false)
          setTimeout(() => {
            navigate('/UserSheet')
          }, 2500);
        })
        .catch((error)=>{
          setLoading(false)
          toast.warn("Something went wrong",{theme:"dark"})
          console.log(error)
        })
      }
      useEffect(() => {
        gettingIndUser();
    
      }, [])
  return (
    <>

<div className="scroll-view-two scrollbar-secondary-two">

<div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 style={{color:colorScheme.card_txt_color}}>Update Client</h1>
      </div>
    </div>
  </div>{/* /.container-fluid */}
</section>
<section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-12">
        {/* jquery validation */}
        <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
          <div className="card-header">
            Client Form
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={submitUserInfo}>
            <div className="card-body">
              <div className="row">
                  <div className="col-lg-4">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Client Type*</label>
                      <input type="text" name="client_type"  className="form-control " defaultValue={clientType} id="exampleInputEmail1" placeholder="Enter Client Type"   onChange={(e)=>setClientType(e.target.value)} style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}/>
                  </div>
                  </div>
                  <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address*</label>
                    <input type="text" name="address"  className="form-control"  defaultValue={address}  id="exampleInputPassword2" placeholder="Enter Address"onChange={(e)=>setAddress(e.target.value)} style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}/>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Profile Image*</label>
                    <input type="file" name="Profile_Image"  className="form-control p-1"  defaultValue={showprofileImg} id="exampleInputPassword3"  onChange={(e) => setProfileImg(e.target.files[0])} style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}/>
                {showprofileImg === "default" || null || "" ? <span>No Image Found</span> :  <a alt="img-1" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${showprofileImg}`,'_blank')}>View Image</a> }
                                  
                  </div>
                </div>

              </div>
{/* 
              <div className="row">
              <div className="col-lg-4">
                  <div className="form-group">
                <label htmlFor="exampleInputPassword1">Email* (Optional)</label>
                <input type="email" name="userEmail"  className="form-control" id="exampleInputPassword4"  defaultValue={userEmail} placeholder="Enter Email" style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}} onChange={(e) =>setUserEmail(e.target.value)}
                />
              </div>
                  </div>
        
            
                    <div className="col-lg-4">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Password* (Optional)</label>
                      <input type="text" name="Password"  className="form-control" id="exampleInputEmail5"   placeholder="Enter Password" style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}} onChange={(e) =>setPassword(e.target.value)}
                      />
                  </div>
                  </div>
                  
              </div> */}



            </div> 
            {/* /.card-body */}
            <div className="card-footer text-right">
              <button type="submit" className="btn btn-outline-info">
                {
                  loading === true?"loading...":"Submit"
                }
              </button>
            </div>
          </form>
        </div>
        {/* /.card */}
      </div>
      {/*/.col (left) */}
      {/* right column */}
      <div className="col-md-6">
      </div>
      {/*/.col (right) */}
    </div>
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>
</div>
</div>

    </>
  )
}

export default UpdateUserForm