import {usePackagePostMutation} from '../services/Packages.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import React,{ useState } from "react";

const AddPackagesForm = () => {

  const[packagePost , result ] = usePackagePostMutation();
  const [packageTitle, setPackageTitle] = useState("");
  const [packageQuantity, setPackageQuantity] = useState("10");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageIncome, setPackageIncome] = useState("");

  const [profitIncome , setProfitIncome] = useState("");
  const[profitDuration , setProfitDuration] = useState("");
  const[cycleIncome , setCycleIncome] = useState("");
  const[cycleDuration,setCycleDuration] = useState("");
  const[singlePayment , setSinglePayment] = useState("");
  const[profitPercent , setProfitPercent] = useState("");
  const[cyclePercent , setCyclePercent] = useState("");


  const [packageDays , setPackageDays] = useState("");
  const [packageDescrip, setPackageDescrip] = useState("");
  const [packageStatus, setPackageStatus] = useState("active");
  const [packageImage, setPackageImage] = useState("");

  const[loading , setLoading] = useState(false)
  const [input, setInput] = useState(false);



  function cycleCalculation(e){
    const val = e.target.value;
    if(val<2000){
      setProfitIncome("")
      setProfitDuration("")
      setProfitPercent("")
      setCycleDuration("")
      setCyclePercent("")
      setCycleIncome("")
      setSinglePayment("")
      setPackageDays("")

    }
      else if(val>=2000 && val<=50000){
      

        const result = Math.round((35/100)*val);
        const singleRes = Math.round((result/30));
        const cycle_Income = Math.round((11.66/100)*val);
        setProfitIncome(result)
        setProfitDuration(30)
        setProfitPercent(35)
        setCycleDuration(10)
        setPackageDays(10)
        setCyclePercent((11.66).toFixed(2))
        setCycleIncome(cycle_Income)
        setSinglePayment(singleRes.toFixed(2))
        setPackageIncome(cycle_Income)

      }
      else if(val>=50000 && val<=100000){
        const result =  Math.round((40/100)*val);
        const singleRes =  Math.round((result/30));
        const cycle_Income =  Math.round((20/100)*val);
        setProfitIncome(result)
        setProfitDuration(30)
        setProfitPercent(40)
        setCycleDuration(15)
        setPackageDays(15)
        setCyclePercent(20)
        setCycleIncome(cycle_Income)
        setSinglePayment(singleRes.toFixed(2))
        setPackageIncome(cycle_Income)

      }
      else if(val>=100000 && val<=500000){
        const result =  Math.round((45/100)*val);
        const singleRes =  Math.round((result/30));
        const cycle_Income =  Math.round((45/100)*val);
        setProfitIncome(result);
        setProfitDuration(30)
        setProfitPercent(45)
        setCycleDuration(30)
        setPackageDays(30)
        setCyclePercent(45)
        setCycleIncome(cycle_Income)
        setSinglePayment(singleRes.toFixed(2))
        setPackageIncome(cycle_Income)

      }
      else if(val>=500000){
        const result =  Math.round((50/100)*val);
        const singleRes =  Math.round((result/45));
        const cycle_Income =  Math.round((50/100)*val);
        setProfitIncome(result)
        setProfitDuration(45)
        setProfitPercent(50)
        setCycleDuration(45)
        setPackageDays(45)
        setCyclePercent(50)
        setCycleIncome(cycle_Income)
        setSinglePayment(singleRes.toFixed(2))
        setPackageIncome(cycle_Income)


      }
      else{
        return null;
      }
  

  }

  const submitPackage = async(e) => {
    setLoading(true)
    e.preventDefault();
    if(packageTitle && packageQuantity && packagePrice && packageIncome && packageDescrip && packageDays && packageStatus && packageImage) {
      var formdata = new FormData();
      formdata.append("title", packageTitle);
      formdata.append("quantity", "10");
      formdata.append("price", packagePrice);
      formdata.append("income", packageIncome);
      formdata.append("total_days", packageDays);
      formdata.append("description",packageDescrip);
      formdata.append("status", packageStatus);
      formdata.append("image",packageImage, "[PROXY]");

      formdata.append("profit_income", profitIncome);
      formdata.append("profit_duration",profitDuration);
      formdata.append("cycle_income", cycleIncome);
      formdata.append("cycle_duration", cycleDuration);
      formdata.append("single_payment", singlePayment);
      formdata.append("profit_percent", profitPercent);
      formdata.append("cycle_percent", cyclePercent);



      
      
    
    
    await packagePost(formdata).unwrap()
    .then((res)=>{
      setLoading(false)
      toast.info("Package Submitted!",{theme:"dark"});
      console.log(res)

    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});
      setLoading(false)
    })

    setPackageTitle('');
    setPackageQuantity('');
    setPackagePrice('');
    setPackageIncome('');
    setProfitIncome('');
    setProfitDuration('');
    setCycleIncome('')
    setCycleDuration('')
    setSinglePayment('');
    setProfitPercent('');
    setCyclePercent('');
    setPackageDays('');
    setPackageDescrip('');
    setPackageImage('');
    setInput(false);
    
    }
    else {
      setLoading(false);
      setInput(true);
      toast.warn("Complete the details !",{theme:"dark"});
    
    }
  };
  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
        <div
          className="content-wrapper p-3"
          style={{ background: colorScheme.body_bg_color }}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 style={{ color: colorScheme.card_txt_color }}>
                    Packages Form
                  </h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}
                    {/* <li className="breadcrumb-item active">Add Package</li> */}
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-sm-12">
                  {/* jquery validation */}
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">Add Packages</div>
                    {/* /.card-header */}

                    {/* form start */}
                    <form onSubmit={submitPackage}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Title*</label>
                              <input
                                type="text"
                                name="title"
                                value={packageTitle}
                                className={
                                  packageTitle === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                onChange={(e) =>
                                  setPackageTitle(e.target.value)
                                }
                                placeholder="Enter Package Title"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Price*
                              </label>
                              <input
                                type="number"
                                name="Price"
                                value={packagePrice}
                                className={
                                  packagePrice === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword1"
                                onChange={(e) =>
                                  {
                                    setPackagePrice(e.target.value)
                                    cycleCalculation(e)
                                  }
                               
                                }
                                placeholder="Enter Package Price"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>
                          {/* <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Quantity*
                              </label>
                              <input
                                type="number"
                                name="Quantity"
                                value={packageQuantity}
                                className={
                                  packageQuantity === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword1"
                                onChange={(e) =>
                                  setPackageQuantity(e.target.value)
                                }
                                placeholder="Enter Quantity"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div> */}
                        </div>

                        <div className="row">
                      

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Income*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={packageIncome}
                                className={
                                  packageIncome === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   {
                                //     setPackageIncome(e.target.value)
                                //     cycleCalculation(e)
                                //   }
                             
                                // }
                                placeholder="Enter Income"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                        {/* Package Cycle Inputs */}

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                              profit Income*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={profitIncome}
                                className={
                                  profitIncome === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setProfitIncome(e.target.value)
                                // }
                                placeholder="Enter Profit"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Profit Duration*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={profitDuration}
                                className={
                                  profitDuration === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setProfitDuration(e.target.value)
                                // }
                                placeholder="Enter Duration"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>
                            
                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Cycle Income*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={cycleIncome}
                                className={
                                  cycleIncome === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setCycleIncome(e.target.value)
                                // }
                                placeholder="Enter Cycle"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Cycle Duration*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={cycleDuration}
                                className={
                                  cycleDuration === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setCycleDuration(e.target.value)
                                // }
                                placeholder="Enter cycle duration"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>


                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Single Payment*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={singlePayment}
                                className={
                                  singlePayment === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setSinglePayment(e.target.value)
                                // }
                                placeholder="Single payment"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Profit %*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={profitPercent}
                                className={
                                  packageIncome === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setProfitPercent(e.target.value)
                                // }
                                placeholder="Enter Profit %"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Cycle %*
                              </label>
                              <input
                                type="number"
                                name="Income"
                                value={cyclePercent}
                                className={
                                  cyclePercent === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setCyclePercent(e.target.value)
                                // }
                                placeholder="Enter Cycle %"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          {/* Package Cycle Inputs End*/}

                                   
                        <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Total Days*
                              </label>
                              <input
                                type="number"
                                name="packageDays"
                                value={packageDays}
                                className={
                                  packageDays === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputEmail1"
                                // onChange={(e) =>
                                //   setPackageDays(e.target.value)
                                // }
                                placeholder="Enter Total Days"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="row">
                          <div className="col-lg-12 mb-1">
                            <label
                              className="form-label"
                              htmlFor="company-column"
                            >
                              <b>Description*</b>
                            </label>
                            <textarea
                              type="text"
                              id="company-column"
                              value={packageDescrip}
                              className={
                                packageDescrip === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              name="Description"
                              onChange={(e) =>
                                setPackageDescrip(e.target.value)
                              }
                              placeholder="Description..."
                              rows={4}
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="row">
                          
                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label className="form-label">
                                Status*
                              </label>
                              <select
                               className={
                                packageStatus === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                                aria-label="Default select example"
                                style={{
                                  background: colorScheme.login_card_bg,
                                  color: colorScheme.card_txt_color,
                                }}
                              onChange={(e) => setPackageStatus(e.target.value)}
                              
                              >
                                <option value="active">Active</option>
                                <option value="in-active">In-Active</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                File input
                              </label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="exampleInputFile"
                                    placeholder="Choose file"
                                    onChange={(e) =>
                                      setPackageImage(e.target.files[0])
                                    }
                                  />
                                  <label
                                    className={
                                      packageImage === "" && input === true
                                        ? "custom-file-label border border-danger"
                                        : "custom-file-label"
                                    }
                                    htmlFor="exampleInputFile"
                                    style={{
                                      background: colorScheme.login_card_bg,
                                      color: colorScheme.card_txt_color,
                                    }}
                                  >
                                    <span style={{ fontSize: "1em" }}>
                                      {packageImage.name ?packageImage.name :"Choose file" }
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer text-right">
                        <button type="submit" className="btn btn-outline-info">
                          {
                          loading === true?"Loading...":"Submit"
                          }
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
  );
};

export default AddPackagesForm;
