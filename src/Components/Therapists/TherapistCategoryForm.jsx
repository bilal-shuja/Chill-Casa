import therapistCategoryEndPoint from "../Api/TherapistCateEndPoint.js";
import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const TherapistCategoryForm = () => {

    const {mutate:therapistCategoryForm} = therapistCategoryEndPoint.useTherapistCategory();


        // Category Form Hooks:
        const[categoryName,setCategory] = useState('');
        const[profileImg,setProfileImg] = useState(null);


        // loading and conditing hooks:
        const[input , setInput] = useState(false);
        const[loading , setLoading] = useState(false);

        const formRef = useRef(null);


        const handleImageChange = (event) => {
            // Handle image selection logic here
            setProfileImg(event.target.files[0]);
          };
        

    function therapistCategorySubmit(e){
        e.preventDefault();
        setLoading(true)

        if(categoryName && profileImg){
            var formdata = new FormData();
          formdata.append("title", categoryName);
          profileImg &&
          formdata.append("icon", profileImg, "[PROXY]")

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
            
            
            setCategory('')
            setProfileImg(null)
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
                    Therapist Category
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
                      Therapist Category Form
                      {/* <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5> */}
                    </div>
                    {/* /.card-header */}

                    <form ref={formRef} onSubmit={therapistCategorySubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-4 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword6">
                                Category Name*
                              </label>
                              <input
                                type="text"
                                name="categoryName"
                                value={categoryName}
                                className={
                                    categoryName === "" && input === true
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                id="exampleInputPassword6"
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Enter Username"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-sm-12 ">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword9">
                                Profile Image
                              </label>
                              <input
                                type="file"
                                name="profileImg"
                                className={
                                  (profileImg === "" || profileImg === null) && input === true
                                    ? "form-control border border-danger p-1"
                                    : "form-control p-1"
                                }
                                id="exampleInputPassword9"
                                onChange={handleImageChange}
                                placeholder="Enter Profile Image"
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                              />
                            </div>
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
