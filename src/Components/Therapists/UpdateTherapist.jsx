import therapistCategoryEndPoint from '../Api/TherapistCateEndPoint.js';
import TherapistEndPoint from '../Api/TherapistEndPoints.js';
import {useLocation , useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import React,{useState,useRef,useEffect} from 'react';
import { toast } from "react-toastify";
import {useQuery} from 'react-query';
import axios from 'axios';
const UpdateTherapist = () => {
    
    const {mutate:regTherapist} = TherapistEndPoint.useRegTherapist();
    const location = useLocation();
    const {ID} = location.state;

    // Therapist Form Hooks:
    const[email , setEmail] = useState('');
    const[userName , setUsername] = useState('');
    const[password , setPassword] = useState('');
    const[profileImg , setProfileImg] = useState('');

    // loading and conditing hooks:
    const[input , setInput] = useState(false);
    const[loading , setLoading] = useState(false);

    // Categories hooks:
    const[category, setCategory] = useState([])
    const[selectCategory , setSelectCategory] = useState('---Select Category ---');
    const[categoryID , setSelectCategoryID] = useState('');

    // Category ID hook which helds id, routing from therapist Sheet


    const formRef = useRef(null);


    // Selecting therapist function:
    const handleSelectChange = (event) => {
    const [id,title] =  event.target.value.split(',');
    setSelectCategory(title)
    setSelectCategoryID(id)
    }

    
    function gettingIndviTherapist(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchtherapistwithid/${ID}`)
        .then((res)=>{
            setUsername(res.data.data.therapist_name)
            setPassword(res.data.data.password)
            setSelectCategory(res.data.data.category_name)
            setEmail(res.data.data.email)
            setProfileImg(res.data.data.image)
            setSelectCategoryID(res.data.data.category_id)
      
  
        })
        .catch((error)=>{
          return null;
        })
    }



// Getting Therapist Category function:
  useQuery('all_users',therapistCategoryEndPoint.getAllCategories,{
    onSuccess:(data)=>{
      setCategory(data.data.Categorys)
   },
   onError: (err) => {
    return err;
  }
}

 )



// Registering Therapist function: 
  const handleSubmitTherapistReg =  (e)=>{
    e.preventDefault();
      setLoading(true)
      if(selectCategory && userName && email  && profileImg){

          var formdata = new FormData();
          formdata.append("email", email);
          formdata.append("therapist_name",userName);
          formdata.append("category_id", categoryID);
          formdata.append("category_name", selectCategory);
          formdata.append("password", password);
          
          profileImg &&
          formdata.append("image", profileImg, "[PROXY]")
          
          regTherapist(formdata, {
            onMutate: () => {
              setLoading(true);
            },
            onSettled: () => {

              setLoading(false);
              setInput(false);
            }
          })

          setEmail('')
          setUsername('')
          setPassword('')
          setProfileImg(null)
          setSelectCategory('')
          setSelectCategoryID('')
          formRef.current.reset();

            
    }
    else{
      
      toast.warn("Fill the information !",{theme:"dark"})
      setLoading(false)
      setInput(true)
    }


  }

  useEffect(() => {
    gettingIndviTherapist()
  }, [])
  
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Update Therapist</h1>
        </div>
      </div>
    </div>
  </section>

  <section className="content">
    <div className="container-fluid">      
    <div className="row">

        <div className="col-12 col-sm-12">
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
            Update Therapist Form
            {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form ref={formRef} onSubmit={handleSubmitTherapistReg}>

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select Category*</label>
                        <select  className={selectCategory === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectChange}
                              value={selectCategory}
                              >
                                {
                                  category.length === 0 ?
                                  <option value="">--- No Category Found ---</option>
                                  :
                                  category.map((options,index)=>{
                                    const optionValue = `${options.id},${options.title}`;
                                    const isSelected = options.id === categoryID;
                                    return(
                                      <option key={index} value={optionValue}>
                                        {isSelected ? options.title : ''}
                                     </option>
                                    )
                                  })
                                }
                          

                          </select>
                    </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Therapist Name*</label>
                  <input type="text" name="Username" defaultValue={userName} className={userName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                    </div>


                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">Email*</label>
                        <input type="email" name="Income" defaultValue={email} className={email === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail5"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"   style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                </div>
             
                <div className="row">


                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Password*</label>
                  <input type="text" name="password" defaultValue={password} className={password === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword8"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-4 col-sm-12 ">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword9">Profile Image</label>
                  <input type="file" name="image" defaultValue={profileImg} className={profileImg === ''&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword9"  onChange={(e)=>setProfileImg(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info">
                    {loading === true? "loading...":"Submit"}
                </button>
              </div>
              </form>
          </div>
          {/* /.card */}
        </div>
        
       
      </div>
    </div>
  </section>
</div>
</div>

    </>
  )
}

export default UpdateTherapist