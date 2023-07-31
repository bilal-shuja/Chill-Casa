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
    const[firstName, setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[phone , setPhone] = useState('');
    const[address , setAddress] = useState('');
    const[gender , setGender] = useState('');
  
    
    const[password , setPassword] = useState('');
    const[profileImg , setProfileImg] = useState(null);
    const[postCode, setPostCode] = useState('');

    const[qualificationImageOne , setQualificationImageOne] = useState(null);
    const[qualificationImageTwo , setQualificationImageTwo] = useState('');
    const[qualificationImageThree , setQualificationImageThree] = useState('');




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

    // Select Gender function:
    const handleSelectChange = (e)=>{
      setGender(e.target.value)
    }

    // Multiple Postcode input functions:
    const handlePostcodeInputChange = (e)=>{
      setPostCode(e.target.value)

    }

    
    // Getting therapist categories function:
    const options = category.map((category) => ({
      value: category.id,
      label: category.title,
    }));


// Getting Therapist Category function:
  useQuery('all_categories',therapistCategoryEndPoint.getAllCategories,{
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
    const postcodeArray = postCode.split(",").map((value)=> value.trim());

      setLoading(true)
      if(selectedCategoryOptions  && firstName && lastName && email && password && qualificationImageOne && gender && profileImg){

          var formdata = new FormData();
          formdata.append("firstname",firstName);
          formdata.append("lastname",lastName);
          formdata.append("email", email);
          formdata.append("gender", gender);
          formdata.append("password", password);
          formdata.append("category_id", 1122);
          formdata.append("category_name", selectedCategoryOptions);
          formdata.append("postcode", postcodeArray);
          formdata.append("address", address);
          formdata.append("phone_number", phone);

          profileImg &&
          formdata.append("image", profileImg, "[PROXY]")
          qualificationImageOne &&
          formdata.append("image1", qualificationImageOne, "[PROXY]")

          qualificationImageTwo &&
          formdata.append("image2", qualificationImageTwo, "[PROXY]")
          
          qualificationImageThree &&
          formdata.append("image3", qualificationImageThree, "[PROXY]")
          
          
          regTherapist(formdata, {
            onMutate: () => {
              setLoading(true);
            },
            onSettled: () => {

              setLoading(false);
              setInput(false);

          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setPostCode('');
          setProfileImg(null);
          setSelectCategoryID('');
          setSelectCategoryOptions('');
          setSelectedCategoryOptions('');
          setQualificationImageOne(null);
          setQualificationImageTwo(null);
          setQualificationImageThree(null);
          setAddress('');
          setGender('');
          setPhone('');
          formRef.current.reset();
            }
          })



            
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
            Register New Therapist
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

              
                    
                    
                    </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-12">
                        <div className="form-group">
                      <label htmlFor="exampleInputPassword2">First Name*</label>
                      <input type="text" name="firstName" value={firstName} className={firstName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword2"  onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter Firstname" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                    </div>
                    </div>

                           
                    <div className="col-lg-4 col-sm-12">
                        <div className="form-group">
                      <label htmlFor="exampleInputPassword3">Last Name*</label>
                      <input type="text" name="lastName" value={lastName} className={lastName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword3"  onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Lastname" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                    </div>
                    </div>





                </div>
             
                <div className="row">

                
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail4">Email*</label>
                        <input type="email" name="email" value={email} className={email === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail4"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"   style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword5">Password*</label>
                  <input type="password" name="password" value={password} className={password === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword5"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Phone*</label>
                  <input type="number" name="phone" value={phone} className={phone === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

                <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword7">Address*</label>
                  <input type="text" name="address" value={address} className={address === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword7"  onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>




                <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Qualification 1*</label>
                  <input type="file" name="qualificationImageOne" defaultValue={qualificationImageOne} className={(qualificationImageOne === '' || qualificationImageOne === null)&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword8"  onChange={(e)=>setQualificationImageOne(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword9">Qualification 2*</label>
                  <input type="file" name="qualificationImageTwo" defaultValue={qualificationImageTwo} className={"form-control p-1"} id="exampleInputPassword9"  onChange={(e)=>setQualificationImageTwo(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword10">Qualification 3*</label>
                  <input type="file" name="qualificationImageThree" defaultValue={qualificationImageThree} className={"form-control p-1"} id="exampleInputPassword10"  onChange={(e)=>setQualificationImageThree(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>



                </div>

                <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword11">Profile Image*</label>
                  <input type="file" name="image" defaultValue={profileImg} className={(profileImg === '' || profileImg === null)&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword11"  onChange={(e)=>setProfileImg(e.target.files[0])} placeholder="Enter Profile Image" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12 ">
                  <div className="form-group">
                  <label htmlFor="exampleInputEmai12">Select Gender*</label>

                  <select  className={gender === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              value={gender}
                              onChange={handleSelectChange}
                              >
                                  <option value="none">--------------------Select--------------------</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>

                          </select>
                  </div>
                </div>

                
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword13">Post Code*</label>
                  <input type="text" name="postcode"  className={postCode === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword13"  onChange={handlePostcodeInputChange} placeholder="Enter PostCode" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color , textTransform:"uppercase"}} />
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