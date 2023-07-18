import {useLocation , useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import React,{useState , useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from 'axios';


const UpdatePackageForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {ID} = location.state;

  const [packageTitle, setPackageTitle] = useState("");
  const [packageQuantity, setPackageQuantity] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageIncome, setPackageIncome] = useState("");
  const [packageDays , setPackageDays] = useState("");
  const [packageDescrip, setPackageDescrip] = useState("");
  const [packageStatus, setPackageStatus] = useState("All");
  const [packageImage, setPackageImage] = useState("");

  const[packageImgTemp , setPackageImgTemp] = useState('');

  const[loading , setLoading] = useState(false)

  function gettingIndPackage(){
      axios.get(`${process.env.REACT_APP_BASE_URL}fetch_package_id/${ID}`)
      .then((res)=>{
        setPackageTitle(res.data.data.title)
        setPackageQuantity(res.data.data.quantity)
        setPackagePrice(res.data.data.price)
        setPackageIncome(res.data.data.income)
        setPackageDays(res.data.data.total_days)
        setPackageDescrip(res.data.data.description)
        setPackageStatus(res.data.data.status)
        setPackageImgTemp(res.data.data.image)

      })
      .catch((error)=>{
        console.log(error)
      })
  }

  function submitUpdatePackage(e){
    e.preventDefault()
    setLoading(true)

    var formdata = new FormData();
formdata.append("title",packageTitle);
formdata.append("quantity", packageQuantity);
formdata.append("price",packagePrice);
formdata.append("income", packageIncome);
formdata.append("total_days", packageDays);
formdata.append("description", packageDescrip);
formdata.append("status", packageStatus);

packageImage !== "" && formdata.append("image", packageImage);



    axios.post(`${process.env.REACT_APP_BASE_URL}UpdatePackage/${ID}`,formdata)
    .then((res)=>{
      toast.info("Package Submitted!",{theme:"dark"});
      setLoading(false)
      setTimeout(() => {
        navigate('/PackageSheet')
      }, 2500);
    })
    .catch((error)=>{
      setLoading(false)
      toast.warn("Something went wrong",{theme:"dark"})
    })
  }
  useEffect(() => {
    gettingIndPackage();

  }, [])
  

  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">

  <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Update Package</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
            {/* <li className="breadcrumb-item active">Add Package</li> */}
          </ol>
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
             Update a Package
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={submitUpdatePackage}>
              <div className="card-body">
                <div className="row">
                    <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title*</label>
                        <input type="text" name="title"  className="form-control " defaultValue={packageTitle} id="exampleInputEmail1" placeholder="Enter Title"   onChange={(e)=>setPackageTitle(e.target.value)} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>
                    <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Quantity*</label>
                      <input type="text" name="Quantity"  className="form-control"  defaultValue={packageQuantity}  id="exampleInputPassword1" placeholder="Enter Quantity"onChange={(e)=>setPackageQuantity(e.target.value)} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Total Days*</label>
                      <input type="number" name="total_Days"  className="form-control"  defaultValue={packageDays} id="exampleInputPassword1" placeholder="Enter Total Days" onChange={(e) => setPackageDays(e.target.value)}style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                  </div>

                </div>

                <div className="row">
                <div className="col-6">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Price*</label>
                  <input type="number" name="Price"  className="form-control" id="exampleInputPassword1"  defaultValue={packagePrice} placeholder="Enter Price" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}
                  onChange={(e) =>setPackagePrice(e.target.value)}
                  />
                </div>
                    </div>
                    <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Income*</label>
                        <input type="number" name="Income"  className="form-control" id="exampleInputEmail1"  defaultValue={packageIncome} placeholder="Enter Income" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}
                        onChange={(e) =>setPackageIncome(e.target.value)}
                        />
                    </div>
                    </div>
                </div>

                <div className="row">                
                <div className="col-12 mb-1">
                <label className="form-label" htmlFor="company-column"> 
                    <b>Description*</b> 
                </label>
                <textarea type="text" id="company-column"   className="form-control" name="Description"  defaultValue={packageDescrip} placeholder="Description..." rows={4} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} 
                 onChange={(e) =>setPackageDescrip(e.target.value)}
                />
                
                </div>
                </div>


                      <div className="row">
                      <div className="col-6">
                      <div className="form-group">
                              <label className="form-label">
                                Status*
                              </label>
                              <select
                               className="form-control"
                               
                                aria-label="Default select example"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              onChange={(e) => setPackageStatus(e.target.value)}
                              value={packageStatus}
                              >
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="In-Active">In-Active</option>
                              </select>
                            </div>
                      </div>
                    <div className="col-6">
                  
                    <div className="form-group" >
                <label htmlFor="exampleInputFile">Image*</label>
                <div className="input-group">
                    <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile"    onChange={(e) =>setPackageImage(e.target.files[0])}  />
                    <label className="custom-file-label" htmlFor="exampleInputFile" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}>{packageImage.name}</label>
                    </div>

                </div>
                    <img className="img-fluid w-50 rounded mt-2" src={`${process.env.REACT_APP_IMG_URL}${packageImgTemp}`} alt=""/>
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

export default UpdatePackageForm