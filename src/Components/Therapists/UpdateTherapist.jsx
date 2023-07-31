import therapistCategoryEndPoint from '../Api/TherapistCateEndPoint.js';
import {Link,useLocation , useNavigate} from 'react-router-dom';
import TherapistEndPoint from '../Api/TherapistEndPoints.js';
import React,{useState,useRef,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import {useQuery} from 'react-query';
import Select from 'react-select';
import axios from 'axios';


const UpdateTherapist = () => {
  const location = useLocation();
  const {ID} = location.state;
  const {mutate:regTherapist} = TherapistEndPoint.useRegTherapist();


    // Therapist ID hook:
    const[therapistID , setTherapistID] = useState(ID)

    // Therapist Form Hooks:
    const[multiPostcode , setMultiPostcode ] = useState('') 
    const[postCode, setPostCode] = useState('');
    const[profileImg , setProfileImg] = useState(null); 
    const[qualificationImageOne , setQualificationImageOne] = useState(null);
    const[qualificationImageTwo , setQualificationImageTwo] = useState(null);
    const[qualificationImageThree , setQualificationImageThree] = useState(null);


    
    const[getEmail , setEmail] = useState('');



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

    const handlePostcodeInputChange = (e)=>{
      setMultiPostcode(e.target.value)

    }

    // Filling up input fields function:

    function gettingIndviTherapist(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchtherapistwithid/${ID}`)
        .then((res)=>{
          setPostCode(res.data.data.postcode)
          setProfileImg(res.data.data.image)
          setQualificationImageOne(res.data.data.image1)
          setQualificationImageTwo(res.data.data.image2)
          setQualificationImageThree(res.data.data.image3)


      
  
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
      if(multiPostcode && profileImg){
        
      var formdata = new FormData();
      formdata.append("postcode",postcodeArray);
      formdata.append("image", profileImg);
      formdata.append("image1", qualificationImageOne);

      qualificationImageTwo &&
      formdata.append("image2", qualificationImageTwo);
      qualificationImageThree &&
      formdata.append("image3", qualificationImageThree);


      axios.post(`${process.env.REACT_APP_BASE_URL}updateTherapistPostcode/${therapistID}`, formdata)
      .then((res)=>{
        toast.info("Postcode Updated!", {theme:"dark"})
        setLoading(false)
        setInput(false)
      })
      .catch((err)=>{
        if(err.response.data.status === '401'){

          toast.warn("Profile & Qualification-1 type must be: jpeg,jpg,pdf ",{theme:"dark"}) 
          setLoading(false)
          setInput(false)
        }
        else{
          toast.warn("Something went wrong",{theme:"dark"}) 
          setLoading(false)
          setInput(false)
        }
              


      })

      }

      else{
      toast.warn("Fill the information!",{theme:"dark"})
      setLoading(false)
      setInput(true)

      }


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
  // const handleSubmitTherapistReg =  (e)=>{
  //   e.preventDefault();
  //     setLoading(true)
  //     if(selectedCategoryOptions && userName && getEmail  && profileImg){

  //         var formdata = new FormData();
  //         formdata.append("email", getEmail);
  //         formdata.append("therapist_name",userName);
  //         formdata.append("category_id", 1122);
  //         formdata.append("category_name", selectedCategoryOptions);
  //         formdata.append("password", password);
  //         formdata.append("postcode", postCode);
          
  //         profileImg &&
  //         formdata.append("image", profileImg, "[PROXY]")
          
  //         regTherapist(formdata, {
  //           onMutate: () => {
  //             setLoading(true);
  //           },
  //           onSettled: () => {

  //             setLoading(false);
  //             setInput(false);
  //           }
  //         })

  //         setPostCode('')
  //         setProfileImg(null)
  //         formRef.current.reset();

            
  //   }
  //   else{
      
  //     toast.warn("Fill the information !",{theme:"dark"})
  //     setLoading(false)
  //     setInput(true)
  //   }


  // }

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
          <h2> \ </h2>&nbsp;&nbsp;
          <Link to="/TherapistSheet" className="text-white"><h3>"Therapist Sheet"</h3></Link>
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
                    
                    <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Profile Image*</label>
                  <input type="file" name="image" className={(profileImg === null ||'')&& input === true?"form-control border border-danger p-1":"form-control p-1"} id="exampleInputPassword6"  onChange={(e)=>setProfileImg(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}}/>
                    <a alt="img-1" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${profileImg}`,'_blank')}>
                    <span>preview profile_image</span>
                    </a>
                </div>
                    </div>

                    
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Post Code*</label>
                  <input type="text" name="postcode" defaultValue={postCode} className={multiPostcode === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword8"  onChange={handlePostcodeInputChange} placeholder="Enter PostCode" style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color, textTransform:"uppercase"}} />
                </div>
                </div>


                </div>
             
                <div className="row">

                  

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">Qualification 1*</label>
                        <input type="file" name="image-1"  className="form-control p-1" id="exampleInputEmail5"  onChange={(e)=>setQualificationImageOne(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-1" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${qualificationImageOne}`,'_blank')}>
                    <span>preview pdf-1/docx</span>
                    </a>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail7">Qualification 2*</label>
                        <input type="file" name="image-2"  className="form-control p-1" id="exampleInputEmail7"  onChange={(e)=>setQualificationImageTwo(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-2" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${qualificationImageTwo}`,'_blank')}>
                    <span>preview pdf-2/docx</span>
                    </a>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail9">Qualification 3*</label>
                        <input type="file" name="image-3"  className="form-control p-1" id="exampleInputEmail9"  onChange={(e)=>setQualificationImageThree(e.target.files[0])}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                        <a alt="img-3" style={{cursor:"pointer"}} onClick={()=> window.open(`${process.env.REACT_APP_IMG_URL}${qualificationImageThree}`,'_blank')}>
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