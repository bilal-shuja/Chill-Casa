import {useLocation , useNavigate} from 'react-router-dom';
import React,{useState,useRef,useEffect} from 'react';
import colorScheme from '../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Select from 'react-select';
import axios from 'axios';


const UpdateTherapist = () => {
  const location = useLocation();
  const {ID} = location.state;
  const navigate = useNavigate();

  const formRef = useRef(null);

    // Therapist ID hook:
    const[therapistID , setTherapistID] = useState(ID)

    // Therapist Form Hooks:

    const[address , setAddress] = useState('');
    const[postCode, setPostCode] = useState('');
    const[postcodeRegion , setPostcodeRegion] = useState('');

    const[postCodeForHook , setPostCodeForHook] = useState(postCode);
    const[postCodeForRegHook , setPostCodeForRegHook] = useState(postcodeRegion);

    const[profileImg , setProfileImg] = useState('');
    const[showprofileImg , setShowProfileImg] = useState('');

        // Selecting multi Postcode hooks:
    const[therapistPostcode , setTherapistPostCode] = useState([]);
    const[selectPostcodeCategory , setPostCodeCategory] = useState([]);
    const[selectedPostcodeValues , setSelectedPostCodeValues] = useState([]);
    const[selectedPostcodeAddress , setSelectedPostCodeAddress] = useState([]);

    const[titleOne , setTitleOne] = useState('');
    const[qualificationImageOne , setQualificationImageOne] = useState('');
    const[showQualificationImageOne , setShowQualificationImageOne] = useState('');


    const[titleTwo , setTitleTwo] = useState('');
    const[qualificationImageTwo , setQualificationImageTwo] = useState('');
    const[showQualificationImageTwo , setShowQualificationImageTwo] = useState('');


    const[titleThree , setTitleThree] = useState('');
    const[qualificationImageThree , setQualificationImageThree] = useState('');
    const[showQualificationImageThree , setShowQualificationImageThree] = useState('');



    // loading and conditing hooks:
    const[loading , setLoading] = useState(false);


    
    //  Getting All Postcode function:

    const   gettingPostCode = async ()=>{     
      
     await axios.post(`${process.env.REACT_APP_BASE_URL}fetch_location`)
      .then((res)=>{
        setTherapistPostCode(res.data.Location)
        gettingIndviTherapist(res.data.Location)

      })
      .catch((err)=>{
        return err;
      })
      
      }
  

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
    }

   // Multiple Postcode input functions:
  const handlePostcodeInputChange = (selectedValues)=>{
    setPostCodeCategory(selectedValues);
    const selectedPostcodeValues = selectedValues.map((item) => item.value);
    setSelectedPostCodeValues(selectedPostcodeValues)
    const selectedPostcodeAddress = selectedValues.map((item) => item.label);
    setSelectedPostCodeAddress(selectedPostcodeAddress)
  }

// Getting postcodes:
  const postcodeOption = therapistPostcode.map((item) => ({
    value: item.postcode,
    label: item.address,
  })
  );

    // Filling up input fields function:

    function gettingIndviTherapist(poscodeLoc){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchtherapistwithid/${ID}`)
        .then((res)=>{
          setAddress(res.data.data.address)
          setPostCode(res.data.data.postcode)
          setPostcodeRegion(res.data.data.postcode_address)
          setShowProfileImg(res.data.data.image)
          setShowQualificationImageOne(res.data.data.image1)
          setShowQualificationImageTwo(res.data.data.image2)
          setShowQualificationImageThree(res.data.data.image3)
        
          setTitleOne(res.data.data.image1_name)
          setTitleTwo(res.data.data.image2_name)
          setTitleThree(res.data.data.image3_name)


        })
        .catch((error)=>{
          return null;
        })
    }


    // Updating function for postcode of therapist:
    function updateTherapistPostCode(e){
      e.preventDefault();
      setLoading(true)
        
      let formdata = new FormData();

      address &&
      formdata.append("address",address);
      if (selectedPostcodeValues && selectedPostcodeValues.length > 0) {
        formdata.append("postcode", selectedPostcodeValues);
      }
      else{
        postCodeForHook &&
        formdata.append("postcode",postCodeForHook.join(","));
      }


      if (selectedPostcodeAddress && selectedPostcodeAddress.length >0) {
        formdata.append("postcode_address", selectedPostcodeAddress);
      }
      else{
        postCodeForRegHook &&
        formdata.append("postcode_address",postCodeForRegHook.join(","));
      }


      profileImg  &&
      formdata.append("image", profileImg);

      titleOne &&
      formdata.append("image1_name", titleOne);
      qualificationImageOne &&
      formdata.append("image1", qualificationImageOne);

      titleTwo &&
      formdata.append("image2_name", titleTwo);
      qualificationImageTwo &&
      formdata.append("image2", qualificationImageTwo);

      
      titleThree &&
      formdata.append("image3_name", titleThree);
      qualificationImageThree &&
      formdata.append("image3", qualificationImageThree);


      axios.post(`${process.env.REACT_APP_BASE_URL}updateTherapistPostcode/${therapistID}`, formdata)
      .then((res)=>{
        toast.info("Info Updated!", {theme:"dark"})
        setLoading(false)
        setTimeout(() => {
          navigate('/TherapistSheet')
        }, 2500);
      })
      .catch((err)=>{
        if(err.response.data.status === '401'){

          toast.warn("Profile & Qualification-1 type must be: jpeg,jpg,pdf ",{theme:"dark"}) 
          setLoading(false)
        }
        else{
          toast.warn("Something went wrong",{theme:"dark"}) 
          setLoading(false)
        }
              


      })

  

    }



  


  useEffect(() => {
    gettingPostCode()

  }, [])
  
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6 d-flex">
          <h1 style={{color:colorScheme.card_txt_color}}>Update Therapist</h1>&nbsp;&nbsp;
          {/* <h2> \ </h2>&nbsp;&nbsp;
          <Link to="/TherapistSheet" className="text-white"><h3>"Therapist Sheet"</h3></Link> */}
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
        
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form ref={formRef} onSubmit={updateTherapistPostCode}>

              <div className="card-body">
                <div className="row">
                    
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Profile Image* (Optional)</label>
                  <input type="file" name="image" className="form-control p-1" id="exampleInputPassword6"  onChange={(e)=>setProfileImg(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}}/>
                    <a alt="img-1" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${showprofileImg}`,'_blank')}>
                    <span>preview profile_image</span>
                    </a>
                </div>
                    </div>
                  
                                              
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword11">Existing Postcode*</label>
                  <input type="text" name="postcodeRegion" defaultValue={postcodeRegion} className={"form-control"} id="exampleInputPassword11"   placeholder="Enter Region" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>
                    
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Select Postcodes*</label>
                  <Select 
                        placeholder="Select postcode"
                            styles={customStyles}
                            isSearchable={true}
                            isMulti
                            options={postcodeOption}
                            value={selectPostcodeCategory}
                            onChange={handlePostcodeInputChange}

                        >
                  </Select>
                
                </div>
                </div>




                </div>

                <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword16">Address*</label>
                  <input type="text" name="address" defaultValue={address} className={"form-control"} id="exampleInputPassword16"  onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

             
                <div className="row">

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword12">Title 1*</label>
                  <input type="text" name="titleOne" defaultValue={titleOne} className={"form-control"} id="exampleInputPassword12"  onChange={(e)=>setTitleOne(e.target.value)} placeholder="Enter Title One" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">Qualification 1*(Optional)</label>
                        <input type="file" name="image-1"  className="form-control p-1" id="exampleInputEmail5"  onChange={(e)=>setQualificationImageOne(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-1" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${showQualificationImageOne}`,'_blank')}>
                    <span>preview pdf-1/docx</span>
                    </a>
                    </div>
                    </div>

                    
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword13">Title 2*(Optional)</label>
                  <input type="text" name="titleTwo" defaultValue={titleTwo} className={"form-control"} id="exampleInputPassword13"  onChange={(e)=>setTitleTwo(e.target.value)} placeholder="Enter Title Two" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>


                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail7">Qualification 2*(Optional)</label>
                        <input type="file" name="image-2"  className="form-control p-1" id="exampleInputEmail7"  onChange={(e)=>setQualificationImageTwo(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-2" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${showQualificationImageTwo}`,'_blank')}>
                    <span>preview pdf-2/docx</span>
                    </a>
                    </div>
                    </div>

                    
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword14">Title 3*(Optional)</label>
                  <input type="text" name="titleThree" defaultValue={titleThree} className={"form-control"} id="exampleInputPassword13"  onChange={(e)=>setTitleThree(e.target.value)} placeholder="Enter Title Three" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                    

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail9">Qualification 3*(Optional)</label>
                        <input type="file" name="image-3"  className="form-control p-1" id="exampleInputEmail9"  onChange={(e)=>setQualificationImageThree(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-3" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${showQualificationImageThree}`,'_blank')}>
                    <span>preview pdf-3/docx</span>
                    </a>
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