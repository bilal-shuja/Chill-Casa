import therapistCategoryEndPoint from "../../Api/TherapistCateEndPoint.js";
import {Link,useLocation , useNavigate} from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import colorScheme from "../../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

const UpdateTherapistCategory = () => {
    const location = useLocation();
    const {ID} = location.state;
    const {mutate:updateTherapistCategoryForm} = therapistCategoryEndPoint.useUpdateTherapistCategory();

    function gettingTherapistCategory(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchcategorywithid/${ID}`)
        .then((res)=>{
            setServiceName(res.data.data.title)
            setServicePrice(res.data.data.service_price)
            setServiceDuration(res.data.data.duration)
            setEndDate(res.data.data.end_date)
            setServiceDescription(res.data.data.description)
            setPercentage(res.data.data.percentage)
        })
        .catch((err)=>{
          return err;
        })
    }


    // Services Form Hooks:
    const[serviceName , setServiceName] = useState('');
    const[servicePrice , setServicePrice] = useState('');
    const[serviceDuration , setServiceDuration] = useState('');
    const[percentage , setPercentage] = useState('');
    const[endDate,setEndDate] = useState(null);
    const[serviceDescription , setServiceDescription] = useState('');


    // loading and conditing hooks:
    const[input , setInput] = useState(false);
    const[loading , setLoading] = useState(false);

    const formRef = useRef(null);




function updateTherapistCategorySubmit(e){
    e.preventDefault();
    setLoading(true)

    if(serviceName && servicePrice && endDate && serviceDescription && serviceDuration && percentage){
        var formdata = new FormData();

        formdata.append("title", serviceName);
        formdata.append("end_date", endDate);
        formdata.append("description", serviceDescription);
        formdata.append("service_price", servicePrice);
        formdata.append("duration", serviceDuration);
        formdata.append("percentage", percentage);

        updateTherapistCategoryForm({formdata,ID}, 
        {
            onMutate: () => {
              setLoading(true);
            },
            onSettled: () => {
                setLoading(false);
                setInput(false);
            }
        }
        )
        
        
        setServiceName('')
        setServicePrice('')
        setServiceDuration('')
        setEndDate('')
        setServiceDescription('')
        setPercentage('')
        formRef.current.reset();
    }
    else{
  
        toast.warn("Fill the information !",{theme:"dark"})
        setLoading(false)
        setInput(true)
      }
  

}

useEffect(() => {
    gettingTherapistCategory()
}, [])

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
                    {" "}
                    Therapist Services
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">
                      Update Services Form
                      {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
                    </div>
                    {/* /.card-header */}

                    <form ref={formRef} onSubmit={updateTherapistCategorySubmit}>
                      <div className="card-body">

                        <div className="row">
                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword6">
                                Service Name*
                              </label>
                              <input
                                type="text"
                                name="categoryName"
                                defaultValue={serviceName}
                                className={
                                  serviceName === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword6"
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder="Enter Username"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword9">
                                Service Price*
                              </label>
                              <input
                                type="number"
                                name="servicePrice"
                                defaultValue={servicePrice}
                                className={
                                  servicePrice === ""  && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword9"
                                onChange={(e) => setServicePrice(e.target.value)}
                                placeholder="Enter Service price"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword9">
                                Service Duration*
                              </label>
                              <input
                                type="text"
                                name="service_duration"
                                defaultValue={serviceDuration}
                                className={
                                  serviceDuration === ""  && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword9"
                                onChange={(e) => setServiceDuration(e.target.value)}
                                placeholder="Enter Service duration"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword9">
                                Percentage %*
                              </label>
                              <input
                                type="number"
                                name="percentage"
                                defaultValue={percentage}
                                className={
                                  percentage === ""  && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword9"
                                onChange={(e) => setPercentage(e.target.value)}
                                placeholder="Enter Service price"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword9">
                                End Date*
                              </label>
                              <input
                                type="date"
                                name="endDate"
                                defaultValue={endDate}
                                className={
                                  endDate ==="" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword9"
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                          <label htmlFor="exampleInputPassword9">
                                Description*
                          </label>
                          <textarea  
                          className={ serviceDescription === ""  && input === true ? "form-control border border-danger": "form-control"} placeholder="Write description here..." id="floatingTextarea2" rows={7}
                          defaultValue={serviceDescription} 
                          onChange={(e) => setServiceDescription(e.target.value)}  
                            style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color
                          }}
                          
                          />
                          </div>
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer text-right">
                        <button type="submit" className="btn btn-outline-info">
                          {loading === true ? "loading..." : "Update"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default UpdateTherapistCategory