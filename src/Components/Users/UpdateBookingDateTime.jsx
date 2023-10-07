import therapistCategoryEndPoint from '../Api/TherapistCateEndPoint.js';
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {useQuery} from 'react-query';
import Select from "react-select";
import axios from "axios";

const UpdateBookingDateTime = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID } = location.state;
  const { Date } = location.state;
  const { Time } = location.state;
  const { Address } = location.state;
  const { CategoryName } = location.state;

  const[category, setCategory] = useState([]);

  const [loading, setLoading] = useState("");
  const [input, setInput] = useState("");

  const [bookingDate, setBookingDate] = useState(Date);
  const [bookingTime, setBookingTime] = useState(Time);
  const [bookingAddress , setBookingAddress] = useState(Address)

  //   Selecting Multiple Categories therapist Hooks:
  const [selectCategoryOptions, setSelectCategoryOptions] = useState([]);
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);

  // Custom Colors integration in Select:
  const customStyles = {
    option: (base, { isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isSelected
          ? colorScheme.card_bg_color
          : isFocused
          ? colorScheme.card_bg_color
          : colorScheme.card_txt_color,
        color: isFocused ? "#fff" : "black",
        borderColor: isFocused ? colorScheme.card_bg_color : "gray",
      };
    },
  };

  // Selecting Multiple Categories therapist function:
  const handleOptionChange = (selectedValues) => {
    setSelectCategoryOptions(selectedValues);
    const selectedLabels = selectedValues.map((option) => option.label);
    setSelectedCategoryOptions(selectedLabels);
  };

  // Getting therapist categories function:
  const options = category.map((category) => ({
    value: category.id,
    label: category.title,
  }))

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

  function updateBookingInfo(e) {
    e.preventDefault();
    setLoading(true);

    var formdata = new FormData();
    formdata.append("date", bookingDate);
    formdata.append("time", bookingTime);
    formdata.append("address", bookingAddress);
    if (selectedCategoryOptions && selectedCategoryOptions.length > 0) {
      formdata.append("category_name", selectedCategoryOptions);
    }
    else {
      // If selectedCategoryOptions is empty, append the existing categories (if any)
      formdata.append("category_name", CategoryName.join(","));
    }
    

    axios
      .post(`${process.env.REACT_APP_BASE_URL}update_booking/${ID}`, formdata)
      .then((res) => {
        toast.info("Booking Updated!", { theme: "dark" });
        setLoading(false);
        setTimeout(() => {
          navigate("/UserBookingSheet");
        }, 2500);
      })
      .catch((error) => {
        setLoading(false);
        toast.warn("Something went wrong", { theme: "dark" });
      });
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
                    Update Booking
                  </h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right"></ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
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
                      Update Booking Date & Time
                    </div>
                    {/* /.card-header */}
                    {/* form start */}

                    <div className="card-body">
                      <div className="row">
                        
                      <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Existing Services*
                            </label>
                            <input
                              type="text"
                              name="bookingServices"
                              defaultValue={CategoryName}
                              className="form-control"
                              id="exampleInputEmail2"
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                          <label htmlFor="exampleInputEmail1">
                            Select Services*
                          </label>
                          <Select
                            placeholder="Select category"
                            styles={customStyles}
                            isSearchable={true}
                            isMulti
                            options={options}
                            value={selectCategoryOptions}
                            onChange={handleOptionChange}
                          ></Select>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Update Date*
                            </label>
                            <input
                              type="date"
                              name="bookingDate"
                              defaultValue={Date}
                              className={
                                bookingDate === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail2"
                              onChange={(e) => setBookingDate(e.target.value)}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Update Time*
                            </label>
                            <input
                              type="text"
                              name="bookingTime"
                              defaultValue={Time}
                              className={
                                bookingTime === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputPassword3"
                              onChange={(e) => setBookingTime(e.target.value)}
                              placeholder="Enter Time"
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Update Address*
                            </label>
                            <textarea
                              type="date"
                              name="bookingAddress"
                              defaultValue={Address}
                              className={
                                bookingAddress === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail2"
                              onChange={(e) => setBookingAddress(e.target.value)}
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              rows={5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer text-right">
                      <button
                        type="submit"
                        className="btn btn-outline-info"
                        onClick={updateBookingInfo}
                      >
                        {loading === true ? "loading..." : "Submit"}
                      </button>
                    </div>
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

export default UpdateBookingDateTime;
