import React,{useState , useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import axios from 'axios';

const TipsTrickSheet = () => {

  const [getTipTricks , setTipsTricks] = useState([])

  function gettingTipsTricks(){
    axios.post(`${process.env.REACT_APP_BASE_URL}fetchall_tipsandtricks`)
    .then((res)=>{
      setTipsTricks(res.data.Data)
    })
    .catch((error)=>{
      return null;
    })
  }

  useEffect(() => {
    gettingTipsTricks();
  }, [])
  
  
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
    <section className="content-header">
<div className="container-fluid">
<div className="row mb-2">
  <div className="col-sm-6">
    <h1 style={{color:colorScheme.card_txt_color}}>Tips&Tricks Tutorials</h1>
  </div>
  <div className="col-sm-6">
    <ol className="breadcrumb float-sm-right">
    </ol>
  </div>
</div>
</div>{/* /.container-fluid */}
</section>
  



<div className="row">
  {
    getTipTricks.map((items,index)=>{
      return(
        <div className="col-12">
        <div className="accordion" id="accordionExample" >
        <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
          <div className="card-header" id={`heading${items.id}`}>
            <h2 className="mb-0">
              <button className="btn text-white btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse${items.id}`} aria-expanded="true" aria-controls={`collapse${items.id}`}>
              {items.title}
              </button>
            </h2>
          </div>
          <div id={`collapse${items.id}`} className="collapse" aria-labelledby={`heading${items.id}`} data-parent="#accordionExample">
            <div className="card-body">
            <iframe title={index} className="embed-responsive-item w-100" src={items.embeded_link} allowFullScreen style={{minHeight:"23em"}}/>
            </div>
          </div>
        </div>
        </div>
        </div>

      )
    })

}

</div>
</div>
</div>
    </>
  )
}

export default TipsTrickSheet