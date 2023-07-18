import SendNotificationSubmissionEndPoint from '../Api/SendNotificationEndPoint.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';


const SendNotifications = () => {

  const {mutate:sendNotificationSubmission} = SendNotificationSubmissionEndPoint.useNotificationSubmission();

  const[loading, setLoading] = useState('');
  const[input , setInput] = useState('');

  const[category , selectCategory] = useState('--- Select Category ---');
  const[title , setTitle] = useState('');
  const[body , setBody] = useState('');

  function handleSelectChange(event){
    selectCategory(event.target.value)

  }

  function submitPromoInfo() {
        setLoading(true)
        if(category && title && body ){
       
              var formdata = new FormData();
              formdata.append("category", category);
              formdata.append("title",title)
              formdata.append("body",body)

              sendNotificationSubmission(formdata, {
                  onMutate: () => {
                    setLoading(true);
                  },
                  onSettled: () => {
      
                    setLoading(false);
                    setInput(false);
                  }
                })

                setBody('');
                setTitle('');
                selectCategory('--- Select Category ---');
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
  <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Notifications</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  <section className="content">
    <div className="container-fluid">      
    <div className="row">

        <div className="col-12 col-sm-12">
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
            Notification Form
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">

                
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Select Category*</label>
                  <select  className={selectCategory === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={handleSelectChange}
                              >
                      
                          <option>Select Category </option>
                          <option value="All">All</option>
                          <option value="Local">Local</option>
                          <option value="Hotel">Hotel</option>
                          </select>
                </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Title*</label>
                  <input type="text" name="discount" className={title === ''&& input === true?"form-control border border-danger p-1":"form-control"} id="exampleInputPassword4" placeholder="Enter title"  onChange={(e)=>setTitle(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                </div>

                <div className="col-lg-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Body*</label>
                  <textarea type="text" name="body" className={body === ''&& input === true?"form-control border border-danger p-1":"form-control"} id="exampleInputPassword5" placeholder="Start here..."  onChange={(e)=>setBody(e.target.value)}  style={{background:colorScheme.card_bg_color, color:colorScheme.card_txt_color}} rows={7}/>
                </div>
                </div>
                
              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={submitPromoInfo}>
                    {loading === true? "loading...":"Submit"}
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
  )
}

export default SendNotifications






