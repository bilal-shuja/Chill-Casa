import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import colorScheme from '../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import {useRegPostMutation} from '../services/Auth.js';


const Register = () => {

  const [regPost , result] = useRegPostMutation();

  const [userName , setUsername ] = useState('');
  const [password , setPassword] = useState('');
  const [rePassword , setRePassword] = useState('');
  const [email , setEmail] = useState('');
  const [phone ,setPhone] = useState('');

  const regUser = async (e)=>{
    e.preventDefault()
    const regUserObj ={
      username:userName,
      password:password,
      password_confirmation:password,
      email:email,
      phone:phone,
      role_id:1,
      cnic:"3520211111115",
      code:"ACCA",
      firstname:"something",
      lastname:"something",
      question:"hey there",
      answer:"goood"
    }
    
    
    
    if(password !== rePassword){
      toast.warn("Password doesn't match!",{theme:"dark"})
    }
    else{
      await regPost(regUserObj).unwrap()
      .then((res)=>{
        toast.info("Registered", {theme:"dark"})

      })
      .catch((res)=>{
        toast.warn(res.data.message,{theme:"dark"})
      })
    }
 
    setUsername("");
    setPassword("");
    setRePassword("");
    setEmail("");
    setPhone("");
  }
  
  
  return (
    <div className="wrapper ">
    <div class="hold-transition register-page " style={{background:colorScheme.card_bg_color}}>
<div className="register-box">
  <div className="register-logo">
    <a href="#" style={{color:colorScheme.card_txt_color}}><b>Trading</b>Tube</a>
  </div>
  <div className="card"  style={{background:colorScheme.login_card_bg, boxShadow:colorScheme.box_shadow_one}}>
    <div className="card-body">
      <p className="login-box-msg" style={{color:colorScheme.card_txt_color}}>Register a new membership</p>
      <form onSubmit={regUser}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={userName} placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control"value ={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" value={rePassword} placeholder="Retype password" onChange={(e)=>{setRePassword(e.target.value)}}   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="number" className="form-control" value={phone} placeholder="Phone" onChange={(e)=>{setPhone(e.target.value)}} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-phone" />
            </div>
          </div>
        </div>
       
            <button type="submit"className="btn btn-outline-info btn-block ">Register</button>

      </form>
   <p className="text-center mt-4 mb-0">
      <Link to="/"  style={{ color:colorScheme.card_txt_color}}>Already have an account? &nbsp; <span className="text-info">Sign in instead</span> </Link>
   </p>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>


</div>
        
    </div>
  )
}

export default Register