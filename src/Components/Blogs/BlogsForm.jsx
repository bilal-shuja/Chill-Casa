import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { useQuill } from 'react-quilljs';
import { toast } from "react-toastify";
import 'quill/dist/quill.snow.css';
import axios from "axios";


const BlogsForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [autherName, setAutherName] = useState("");
    const [blogViews , setBlogViews] = useState("");
    const [blogImg , setBlogImg] = useState('');
  
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState(false);
  // const blogContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))


  const { quill, quillRef } = useQuill();
    function submitTipsTricks() {
      setLoading(true)
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("body", body);
      formdata.append("views",blogViews);
      formdata.append("auther_name", autherName);
      blogImg &&
      formdata.append("blog_image",blogImg, "[PROXY]");
      if(title && body && autherName && blogViews && blogImg){
        axios
        .post(
          `${process.env.REACT_APP_BASE_URL}post_blog`,
          formdata
        )
        .then((res) => {
          toast.info("Blog Submitted!", { theme: "dark" });
          setInput(false);
          setLoading(false);
          setTimeout(() => {
              setTitle("")
              setBody("")
              setAutherName("")
              setBlogViews("")
              quill.on('text-change', () => {
                setBody("")
              });
          }, 2000);
        })
        .catch((error) => {
          toast.warn("Something went wrong", { theme: "dark" });
          setInput(false);
          setLoading(false);
        });


      }
      else{
        toast.warn("Fields are empty!", { theme: "dark" });
        setInput(true);
        setLoading(false);

      }

    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
              setBody(quillRef.current.firstChild.innerHTML)
            });
        }
    }, [quill]);
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
                    Blogs
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
                    <div className="card-header">Blogs Form</div>
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
                            <label htmlFor="exampleInputPassword1">Blog Image*</label>
                            <input
                              type="file"
                              name="Blog Image"
                              defaultValue={blogImg}
                              className={
                                blogImg === "" && input === true
                                  ? "form-control border border-danger p-1"
                                  : "form-control p-1"
                              }
                              id="exampleInputPassword1"
                              onChange={(e) => setBlogImg(e.target.files[0])}
                              placeholder="Blog Image"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Auther Name*</label>
                            <input
                              type="text"
                              name="Auther Name"
                              value={autherName}
                              className={
                                autherName === "" && input === true
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              id="exampleInputEmail1"
                              onChange={(e) => setAutherName(e.target.value)}
                              placeholder="Enter Auther Name"
                              style={{
                                background: colorScheme.login_card_bg,
                                color: colorScheme.card_txt_color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Blog Views*</label>
                            <input
                              type="number"
                              name="Blog Views"
                              value={blogViews}
                              className={
                                blogViews === "" && input === true
                                  ? "form-control border border-danger p-1"
                                  : "form-control p-1"
                              }
                              id="exampleInputPassword1"
                              onChange={(e) => setBlogViews(e.target.value)}
                              placeholder="Enter Blog Views"
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
                              Enter Blog*
                            </label>
                            <div>
                              {body === "" && input === true ? 
                               <div theme="snow" ref={quillRef}
                               style={{                                        
                                 background: colorScheme.login_card_bg,
                                 color: colorScheme.card_txt_color,
                                 borderColor:"red",
                                 height:"10em"
                                 }}
                         />
                              
                              :
                                 <div theme="snow" ref={quillRef}
                                 style={{                                        
                                   background: colorScheme.login_card_bg,
                                   color: colorScheme.card_txt_color,
                                   height:"10em"
                                   }}
                           />
                              
                              }
                             
                                </div>
                     
                            {/* <textarea
                         
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
                                border:""
                              }}
                              rows="6"
                            /> */}
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

export default BlogsForm;
