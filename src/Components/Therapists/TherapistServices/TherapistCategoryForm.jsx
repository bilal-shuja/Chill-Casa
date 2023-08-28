import therapistCategoryEndPoint from "../../Api/TherapistCateEndPoint.js";
import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../../Colors/Styles.js";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const TherapistCategoryForm = () => {

    const {mutate:therapistCategoryForm} = therapistCategoryEndPoint.useTherapistCategory();


        // Services Form Hooks:
        const[serviceName , setServiceName] = useState('');
        const[servicePrice , setServicePrice] = useState('');
        const[serviceDuration , setServiceDuration] = useState('');
        const[percentage , setPercenntage] = useState('');
        const[endDate,setEndDate] = useState(null);
        const[serviceDescription , setServiceDescription] = useState('');



        


        // loading and conditing hooks:
        const[input , setInput] = useState(false);
        const[loading , setLoading] = useState(false);

        const formRef = useRef(null);




    function therapistCategorySubmit(e){
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

          therapistCategoryForm(
            formdata, {
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
            setPercenntage('')
            formRef.current.reset();
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
                      Therapist Services Form
                      {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
                    </div>
                    {/* /.card-header */}

                    <form ref={formRef} onSubmit={therapistCategorySubmit}>
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
                                value={serviceName}
                                className={
                                  serviceName === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword6"
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder="Enter Service Name"
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
                                name="service_price"
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
                              Therapist Percentage %*
                              </label>
                              <input
                                type="number"
                                name="percentage"
                                className={
                                  percentage === ""  && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword9"
                                onChange={(e) => setPercenntage(e.target.value)}
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
                          {loading === true ? "loading..." : "Submit"}
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
  );
};

export default TherapistCategoryForm;
