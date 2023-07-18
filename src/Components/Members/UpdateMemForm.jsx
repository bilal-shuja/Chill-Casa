import {useLocation , useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import React,{useState , useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from 'axios';

const UpdateMemForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {ID} = location.state;
  
    const [username, setUsername] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone , setUserPhone] = useState("");
    const[role , setRole] = useState('none');
    const[loading , setLoading] = useState(false);
    const[password , setPassword] = useState('');

    // Function for getting specific member/user:  
    
    function gettingIndMember(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
        .then((res)=>{
            setUsername(res.data.data.username)
            setUserFirstName(res.data.data.firstname)
            setUserLastName(res.data.data.lastname)
            setUserEmail(res.data.data.email)
            setUserPhone(res.data.data.phone)
            setRole(res.data.data.role_id)
      
  
        })
        .catch((error)=>{
          return null;
        })
    }

    // Function for updating member/user information:

    function submitMemInfo(e){
        e.preventDefault()
        setLoading(true)
    
        var formdata = new FormData();
        formdata.append("username",username);
        formdata.append("firstname", userFirstName);
        formdata.append("lastname",userLastName);
        formdata.append("email", userEmail);
        formdata.append("phone", userPhone);
        formdata.append("role_id", role);
        formdata.append("sender_role_id", 1);
        password === null &&
        formdata.append("password", password);

    
        axios.post(`${process.env.REACT_APP_BASE_URL}updateuserwithid/${ID}`,formdata)
        .then((res)=>{
          toast.info("Member Updated!",{theme:"dark"});
          console.log(res)
          setLoading(false)
          setTimeout(() => {
            navigate('/MemberSheet')
          }, 2500);
        })
        .catch((error)=>{
          setLoading(false)
          toast.warn("Something went wrong",{theme:"dark"})
        })
      }

      
      useEffect(() => {
        gettingIndMember();
    
      }, [])

  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">

<div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 style={{color:colorScheme.card_txt_color}}>Update Member</h1>
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
            Member Form
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={submitMemInfo}>
            <div className="card-body">
              <div className="row">
                  <div className="col-4">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Username*</label>
                      <input type="text" name="username"  className="form-control " defaultValue={username} id="exampleInputEmail1" placeholder="Enter Username"   onChange={(e)=>setUsername(e.target.value)} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                  </div>
                  </div>
                  <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Firstname*</label>
                    <input type="text" name="userFirstName"  className="form-control"  defaultValue={userFirstName}  id="exampleInputPassword2" placeholder="Enter Firstname"onChange={(e)=>setUserFirstName(e.target.value)} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Lastname*</label>
                    <input type="text" name="userLastName"  className="form-control"  defaultValue={userLastName} id="exampleInputPassword3" placeholder="Enter Total Days" onChange={(e) => setUserLastName(e.target.value)}style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                  </div>
                </div>

              </div>

              <div className="row">
              <div className="col-4">
                  <div className="form-group">
                <label htmlFor="exampleInputPassword1">Email*</label>
                <input type="email" name="userEmail"  className="form-control" id="exampleInputPassword4"  defaultValue={userEmail} placeholder="Enter Price" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e) =>setUserEmail(e.target.value)}
                />
              </div>
                  </div>
                  <div className="col-4">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Phone*</label>
                      <input type="number" name="userPhone"  className="form-control" id="exampleInputEmail5"  defaultValue={userPhone} placeholder="Enter Income" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e) =>setUserPhone(e.target.value)}
                      />
                  </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                            <label className="form-label">
                              Role*
                            </label>
                            <select
                             className="form-control"
                             
                              aria-label="Default select example"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            >
                               <option value="none">None</option>
                                <option value="1">Super Admin</option>
                                <option value="6">Assist Admin</option>
                                <option value="2">Admin</option>
                                <option value="3">Manager</option>
                                <option value="4">Staff</option>
                                <option value="5">User</option>
                            </select>
                          </div>
                    </div>

                    <div className="col-4">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Password*</label>
                      <input type="text" name="Password"  className="form-control" id="exampleInputEmail5"   placeholder="Enter Password" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e) =>setPassword(e.target.value)}
                    
                      />
                  </div>
                  </div>
                  
              </div>



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

export default UpdateMemForm