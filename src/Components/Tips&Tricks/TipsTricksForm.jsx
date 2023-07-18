import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
const TipsTricksForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);

  function submitTipsTricks() {
    setLoading(true);
    const tipsTricksObj = {
      title: title,
      body: body,
      embeded_link: link,
    };

    if (title && body && link) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}add_tipsandtricks`,
          tipsTricksObj
        )
        .then((res) => {
          toast.info("Tips&Tricks Submitted!", { theme: "dark" });
          setInput(false);
          setLoading(false);
          console.log(res);
          setTimeout(() => {
            setTitle("");
            setBody("");
            setLink("");
          }, 2000);
        })
        .catch((error) => {
          toast.warn("Something went wrong", { theme: "dark" });
          console.log(error);
          setInput(false);
          setLoading(false);
        });
    } else {
      setInput(true);
      setLoading(false);
      toast.warn("Fields are empty!", { theme: "dark" });
    }
    setInput(true);
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
                    Tips&Tricks
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
                  {/* jquery validation */}
                  <div
                    className="card"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
                    <div className="card-header">Tips&Tricks Form</div>
                    {/* /.card-header */}
                    {/* form start */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title*</label>
                            <input
                              type="text"
                              name="Title"
                              value={title}
                              className={
                                title === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail1"
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Enter Title"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Body*</label>
                            <input
                              type="text"
                              name="Body"
                              value={body}
                              className={
                                body === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputPassword1"
                              onChange={(e) => setBody(e.target.value)}
                              placeholder="Enter Body"
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
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Enter Link*
                            </label>
                            <input
                              type="text"
                              name="Link"
                              value={link}
                              className={
                                link === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail1"
                              onChange={(e) => setLink(e.target.value)}
                              placeholder="Enter Link"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
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
                        onClick={submitTipsTricks}
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

export default TipsTricksForm;
