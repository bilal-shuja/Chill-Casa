import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

const ChillCaseExpenseForm = () => {
    const[loading, setLoading] = useState('');
    const[input , setInput] = useState('');


    const[title , setTitle] = useState('');
    const[price , setPrice] = useState('');
    const[description , setDescription] = useState('');
  

    function submitPaymentInfo() {
          setLoading(true)
          if(title && price && description){
         
                var formdata = new FormData();
                formdata.append("title", title)
                formdata.append("price",price)
                formdata.append("description",description)

            axios.post(`${process.env.REACT_APP_BASE_URL}post_expenses`,formdata)
            .then((res)=>{
                setLoading(false)
                toast.info("Expenses Submit!", {theme:"dark"})

       
            })
            .catch((error)=>{
              if(error.status === "401"){
                setLoading(false)
                toast.warn(error.data.message)
              }
              else{
                setLoading(false)
                toast.warn("Something went wrong",{theme:"dark"})
                console.log(error)
    
              }
             
             
          })
    
            setInput(false);
        }
        else{
          
          toast.warn("Fill the information !",{theme:"dark"})
          setLoading(false)
          setInput(true)
        }
        
        setTitle('')
        setPrice('')
        setDescription('')
      }
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Expenses</h1>
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
          <div className="card"  style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                      boxShadow: colorScheme.box_shadow_one,
                    }}
                  >
            <div className="card-header">
           Expense Form
            </div>
            {/* /.card-header */}
            {/* form start */}

              <div className="card-body">
                <div className="row">

            

                    
                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Title*</label>
                  <input type="text" name="title"  className={title === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title..."    style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }} />
                </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword2">Price*</label>
                  <input type="number" name="Price" className={price === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword2"  onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price..."
                  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}} />
                </div>
                </div>
                    

                <div className="col-lg-12 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea3">Description*</label>
            
                <textarea class="form-control"
                className={description === ''&& input === true?"form-control border border-danger p-1":"form-control"}
                id="exampleFormControlTextarea3"
                placeholder="Enter description..."
                 style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                  }}
                  onChange={(e)=>setDescription(e.target.value)}
                  rows={7}
                />
                </div>
                </div>

             
                </div>

               




              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={submitPaymentInfo}>
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

export default ChillCaseExpenseForm