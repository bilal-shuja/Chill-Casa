import therapistCategoryEndPoint from '../Api/TherapistCateEndPoint.js';
import TherapistEndPoint from '../Api/TherapistEndPoints.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import React,{useState,useRef} from 'react';
import { toast } from "react-toastify";
import {useQuery} from 'react-query';
import Select from 'react-select';


const RegTherapistForm = () => {

    const {mutate:regTherapist} = TherapistEndPoint.useRegTherapist();

    // Therapist Form Hooks:
    const[email , setEmail] = useState('');
    const[userName , setUsername] = useState('');
    const[password , setPassword] = useState('');
    const[profileImg , setProfileImg] = useState('');
    const[postCode, setPostCode] = useState('');

    // loading and conditing hooks:
    const[input , setInput] = useState(false);
    const[loading , setLoading] = useState(false);

    // Categories hooks:
    const[category, setCategory] = useState([]);
    
    //   Selecting Multiple Categories therapist Hooks:
    const[selectCategoryOptions , setSelectCategoryOptions] = useState([]);
    const[selectedCategoryOptions , setSelectedCategoryOptions] = useState([]);

    const[selectCategoryID , setSelectCategoryID] = useState([]);


    const formRef = useRef(null);

    // Custom Colors integration in Select:
    const customStyles = {
      option: (base, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isSelected ? colorScheme.card_bg_color: isFocused ?colorScheme.card_bg_color :colorScheme.card_txt_color,
        color: isFocused? "#fff":"black",
        borderColor: isFocused ?colorScheme.card_bg_color : 'gray',
      };
    }
    };


    // Selecting Multiple Categories therapist function:
    const handleOptionChange = (selectedValues) => {
      setSelectCategoryOptions(selectedValues);
      const selectedLabels = selectedValues.map((option) => option.label);
      setSelectedCategoryOptions(selectedLabels)
    };

  
    // Getting therapist categories function:
    const options = category.map((category) => ({
      value: category.id,
      label: category.title,
    }));


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
      if(selectedCategoryOptions && userName && email  && profileImg){

          var formdata = new FormData();
          formdata.append("email", email);
          formdata.append("therapist_name",userName);
          formdata.append("category_id", 1122);
          formdata.append("category_name", selectedCategoryOptions);
          formdata.append("password", password);
          formdata.append("postcode", postCode);
          
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

          setEmail('');
          setUsername('');
          setPassword('');
          setPostCode('');
          setProfileImg(null);
          setSelectCategoryID('');
          formRef.current.reset();
          setSelectCategoryOptions('');
          setSelectedCategoryOptions('');

            
    }
    else{
      
      toast.warn("Fill the information !",{theme:"dark"})
      setLoading(false)
      setInput(true)
    }


  }




  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Register</h1>
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
            Register Therapist Form
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form ref={formRef} onSubmit={handleSubmitTherapistReg}>

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select Category*</label>
                        <Select 
                        placeholder="Select category"
                            styles={customStyles}
                            isSearchable={true}
                            isMulti
                            options={options}
                            value={selectCategoryOptions}
                            onChange={handleOptionChange}

                        >

                        </Select>

                        {/* <select  className={selectCategory === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectChange}
                              >
                                {
                                  category.length === 0 ?
                                  <option value="">--- No Category Found ---</option>
                                  :
                                  category.map((options,index)=>{
                                    return(
                                      <option key={index} value={`${options.id},${options.title}`}>{options.title}</option>
                                    )
                                  })
                                }
                          

                          </select> */}
                    
                    
                    </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Therapist Name*</label>
                  <input type="text" name="Username" value={userName} className={userName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                    </div>


                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">Email*</label>
                        <input type="email" name="Income" value={email} className={email === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail5"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"   style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                </div>
             
                <div className="row">


                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Password*</label>
                  <input type="password" name="Price" value={password} className={password === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword8"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-4 col-sm-12 ">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword9">Profile Image</label>
                  <input type="file" name="image" defaultValue={profileImg} className={profileImg === ''&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword9"  onChange={(e)=>setProfileImg(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Post Code*</label>
                  <input type="text" name="postcode" value={postCode} className={postCode === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword8"  onChange={(e)=>setPostCode(e.target.value)} placeholder="Enter PostCode" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
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

export default RegTherapistForm