import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';


const AddLuckyDraw = () => {
    const [drawTitle , setDrawTitle] = useState('');
    const [drawDescrip , setDrawDescrip] = useState('');
    const [luckyDrawStatus ,setLuckyStatus] = useState('active');
    const [drawFee , setDrawFee] = useState('');
    const[winnerNo , setWinnerNo] = useState(0);
    const[multInputs, setMultInputs] = useState([]);
    const[multInputArr, setMultInputArr] = useState([]);

    const[loading , setLoading] = useState(false);
    const [input , setInput] = useState('');


    function submitLuckyDraw(){
      setLoading(true)
      const luckyDrawObj ={
        title:drawTitle,
        body:drawDescrip,
        fees:drawFee,
        status:luckyDrawStatus
      }

      if(drawTitle && drawFee && drawDescrip){
      axios.post(`${process.env.REACT_APP_BASE_URL}post_luckydraw`,luckyDrawObj)
      .then((res)=>{
        toast.info("Lucky Draw Submitted!",{theme:"dark"});
        setInput(false);
        setLoading(false)
        setDrawTitle('');
        setDrawFee('');
        setDrawDescrip('');
    
      })
      .catch((error)=>{
        toast.warn("Something went wrong",{theme:"dark"});
        console.log(error)
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


    const onChangeNumberOfQuestions = (e) => {
      const numberOfWinningPrice = e.target.value;
      
      setWinnerNo(numberOfWinningPrice);
      if(numberOfWinningPrice > 0){
        const generateArrays= Array.from(Array(Number(numberOfWinningPrice)).keys())
        setMultInputs(generateArrays);
      } else {
        setMultInputs([])
      }
  }

function onEnterPrizeName(e,index){
const prizeInputs = e.target.value;

let keyCode = e.code;
if( keyCode ==="Enter" || keyCode  === "NumpadEnter"){
  const prizeInputObj = {
    id:index+1,
    name:prizeInputs
  }
  setMultInputArr(p =>[...p , prizeInputObj])}


}

  function winnerInputs(){
    return multInputs.map((items, index)=>(
      //
      <div key={items+1} className="col-lg-4 col-sm-12">
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Prize Name {items+1}*</label>
        <input type="text" name="winnerInputs" className={winnerNo === ''&& input === true?"form-control border border-danger":"form-control"} id={`exampleInputPassword${items+1}`}  placeholder="Enter Winning Prize Name"  onKeyPress={(e)=>{onEnterPrizeName(e , index)}} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
        </div>
      </div>

      
    ))
  }
  
  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">

    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 style={{color:colorScheme.card_txt_color}}>Lucky Draw</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}
          {/* <li className="breadcrumb-item active">Add Package</li> */}
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
           Add Lucky Draw
          </div>
          {/* /.card-header */}
          {/* form start */}
            <div className="card-body">
              <div className="row">

              <div className="col-lg-4 col-sm-12">
                      <label htmlFor="" className="form-label"> Search with Status:</label>
                    <div className="form-group">
                      <select type="text" className={luckyDrawStatus === ''&& input === true?"form-control border border-danger":"form-control"}
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=>setLuckyStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="active">Active</option>
                            <option value="in-active">In-Active</option>
                         </select>
                    </div>
                    </div>

                  <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Title*</label>
                      <input type="text" name="drawTitle" value={drawTitle} className={drawTitle === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail1" onChange={(e)=>setDrawTitle(e.target.value)} placeholder="Enter Lucky Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                  </div>
                  </div>
                  <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                <label htmlFor="exampleInputPassword1">Fee*</label>
                <input type="number" name="drawFee" value={drawFee} className={drawFee === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={(e)=>setDrawFee(e.target.value)} placeholder="Enter Lucky Draw Fee" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
              </div>
                  </div>

                  <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                <label htmlFor="exampleInputPassword1">Winning Price*</label>
                <input type="number" name="drawFee" value={drawFee} className={drawFee === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={(e)=>setDrawFee(e.target.value)} placeholder="Enter Winning price" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
              </div>
                  </div>

                  <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                <label htmlFor="exampleInputPassword1">Total Winning*</label>
                <input type="number" name="winnerNo" value={winnerNo} className={winnerNo === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={onChangeNumberOfQuestions} placeholder="Enter No of Winners" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                </div>
                  </div>

                  {
                    multInputs.length ?(
                      <>

                        {winnerInputs()}
                      </>
                    )
                    :
                    null
                  }
           </div>

              

              <div className="row">                
              <div className="col-lg-12 mb-1">
              <label className="form-label" htmlFor="company-column"> 
                  <b>Description*</b> 
              </label>
              <textarea type="text" id="company-column" value={drawDescrip} className={drawDescrip === ''&& input === true?"form-control border border-danger":"form-control"} name="Description"  onChange={(e)=>setDrawDescrip(e.target.value)} placeholder="Description..." rows={4} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
              
              </div>
              </div>


             

            </div>
            {/* /.card-body */}
            <div className="card-footer text-right">
              <button type="submit" className="btn btn-outline-info" onClick={submitLuckyDraw}>
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

export default AddLuckyDraw