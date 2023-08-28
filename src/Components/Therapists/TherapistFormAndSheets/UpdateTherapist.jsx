import {useLocation , useNavigate} from 'react-router-dom';
import React,{useState,useRef,useEffect} from 'react';
import colorScheme from '../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';


const UpdateTherapist = () => {
  const location = useLocation();
  const {ID} = location.state;
  const navigate = useNavigate();

  const formRef = useRef(null);

    // Therapist ID hook:
    const[therapistID , setTherapistID] = useState(ID)

    // Therapist Form Hooks:
    const[multiPostcode , setMultiPostcode ] = useState('');
    const[multiPostcodeRegion , setMultiPostcodeRegion] = useState('')

    const[address , setAddress] = useState('');
    const[postCode, setPostCode] = useState('');
    const[postcodeRegion , setPostcodeRegion] = useState('');

    const[profileImg , setProfileImg] = useState('');
    const[showprofileImg , setShowProfileImg] = useState('');



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


    const handlePostcodeInputChange = (e)=>{
      setMultiPostcode(e.target.value)

    }

    const hanldeRegionInputChange = (e)=>{
      setMultiPostcodeRegion(e.target.value)

    }

    // Filling up input fields function:

    function gettingIndviTherapist(){
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
      const postcodeArray = multiPostcode.split(",").map((value)=> value.trim());
      const postcodeRegionArray = multiPostcodeRegion.split(",").map((value)=> value.trim());
        
      var formdata = new FormData();

      
      address &&
      formdata.append("address",address);
      if (multiPostcode) {
        const postcodeArray = multiPostcode.split(",").map((value) => value.trim());
        formdata.append("postcode", postcodeArray);
      }
      else{
        postCode &&
        formdata.append("postcode",postCode);
      }


      if (multiPostcodeRegion) {
        const postcodeRegionArray = multiPostcodeRegion.split(",").map((value) => value.trim());
        formdata.append("postcode_address", postcodeRegionArray);
      }
      else{
        postcodeRegion && 
        formdata.append("postcode_address",postcodeRegion);
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
    gettingIndviTherapist()
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
            {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
            </div>
            {/* /.card-header */}
            
            {/* form start */}
      <form ref={formRef} onSubmit={updateTherapistPostCode}>

              <div className="card-body">
                <div className="row">
                    {/* <div className="col-lg-4 col-sm-12">
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

                        </Select> */}

                        {/* <select  className={selectCategory === ''&& input === true?"form-control border border-danger":"form-control"}
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
                          

                          </select> */}
                    {/* </div>
                    
                    </div> */}
                    
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
                  <label htmlFor="exampleInputPassword8">Post Code*</label>
                  <input type="text" name="postcode" defaultValue={postCode} className={"form-control"} id="exampleInputPassword8"  onChange={handlePostcodeInputChange} placeholder="Enter PostCode" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                            
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword11">Regions*</label>
                  <input type="text" name="postcodeRegion" defaultValue={postcodeRegion} className={"form-control"} id="exampleInputPassword11"  onChange={hanldeRegionInputChange} placeholder="Enter Region" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
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