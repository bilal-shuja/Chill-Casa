import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';
const AddLevelForm = () => {

    const[Level , setLevel] = useState('');
    const[unlock , setUnlock] = useState('All');
    const[investmentStart , setInvestmentStart] = useState('');
    const[investmentLimit ,setInvestmentLimited] = useState('');
    const[reward ,setRewards] = useState('');
    const[loading , setLoading] = useState(false);
    const [input , setInput] = useState(false);


    // Function for submitting the level and rewards according users activity:

    function submitLevels(){
        setLoading(true)
        const levelObj ={
          level:Level,
          unlocks_at:unlock,
          reward:reward,
          investment_start:investmentStart,
          investment_limit:investmentLimit
        }
  
        if(Level && unlock && reward && investmentStart && investmentLimit){
        axios.post(`${process.env.REACT_APP_BASE_URL}post_level`,levelObj)
        .then((res)=>{
          toast.info("Levels Submitted!",{theme:"dark"});
          setInput(false);
          setLoading(false)
          setTimeout(() => {
            setLevel('');
            setRewards('');
            setUnlock('All');
            setInvestmentStart('');
            setInvestmentLimited('');
          }, 2000);
       
      
        })
        .catch((error)=>{
          toast.warn("Something went wrong",{theme:"dark"});
          setInput(false);
          setLoading(false)
  
        })
      }
      else{
          setInput(true);
          setLoading(false);
          toast.warn("Fields are empty!",{theme:"dark"});
  
      }
      setInput(true);
    
      }

  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
      <section className="content-header">
      <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Add Levels</h1>
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
          {/* jquery validation */}
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
            Add Levels
            </div>
            {/* /.card-header */}
            {/* form start */}
              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Level*</label>
                        <input type="number" name="Level" value={Level} className={Level === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail1" onChange={(e)=>setLevel(e.target.value)} placeholder="Enter Level" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                      <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Rewards*</label>
                      <input type="number" name="drawFee" value={reward} className={reward === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={(e)=>setRewards(e.target.value)} placeholder="Enter Rewards" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                      </div>
                      </div>

                      <div className="col-lg-4 col-sm-12">
                        <label htmlFor="" className="form-label">Unlock At:</label>
                      <div className="form-group">
                        <select type="text" className={unlock === ''&& input === true?"form-control border border-danger":"form-control"}
                        style={{
                          background: colorScheme.card_bg_color,
                          color: colorScheme.card_txt_color,
                          }}
                          onChange={(e)=>setUnlock(e.target.value)}
                          value={unlock}
                          >
                              <option value="All">All</option>
                              <option value="Unlock By Default">Unlock By Default</option>
                              <option value="Unlocks at 10 paid refers">Unlocks at 10 paid refers</option>
                              <option value="Unlocks at 20 paid refers">Unlocks at 20 paid refers</option>
                              <option value="Unlocks at 40 paid refers">Unlocks at 40 paid refers</option>
                              <option value="Unlocks at 100 paid refers">Unlocks at 100 paid refers</option>
                              <option value="Unlocks at 150 paid refers">Unlocks at 150 paid refers</option>

                          </select>
                      </div>
                      </div>

                </div>

                

                <div className="row">                
                <div className="col-lg-6 mb-1">
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Investment Start*</label>
                        <input type="number" name="drawTitle" value={investmentStart} className={investmentStart === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail1" onChange={(e)=>setInvestmentStart(e.target.value)} placeholder="Enter Investment" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                </div>

                <div className="col-lg-6 mb-1">
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Investment Ends*</label>
                        <input type="number" name="drawTitle" value={investmentLimit} className={investmentLimit === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail1" onChange={(e)=>setInvestmentLimited(e.target.value)} placeholder="Enter Investment Limit" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                </div>
                </div>


              

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info" onClick={submitLevels}>
                  {loading === true?"loading...":"Submit"}
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

export default AddLevelForm