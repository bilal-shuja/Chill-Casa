import React,{useState , useEffect} from 'react';
import colorScheme from "../Colors/Styles.js";
import Filter from '../Filters/Filter';
import axios from 'axios';

const StopPromotionSheet = () => {

  const[stopPromoData , setStopPromoData] = useState([])
  const[roleID , setRoleID] = useState('');
  const StopPromoSheetIdentifier = "StopPromoSheet";

  function gettingRewards (){
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_rewards`)
    .then((res)=>{
      setStopPromoData(res.data.Rewards)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

    function gettingDate(val){
      setStopPromoData(val)
    }

    function gettingPrice(val){
      setStopPromoData(val)
    }

    
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id);
      }
  
    } catch {
      return null;
    }
  }


  useEffect(() => {
    SetLocalLogin()
    gettingRewards()
  }, [])
  
  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">

         <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Stop Promotions
                </h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h5>Stop Promotions Sheet</h5>
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>

                  </div>
                  <div className="card-body table-responsive p-2">
                  <div className="row">
                  <Filter StopPromotionData={stopPromoData} DateFilter={gettingDate}  PriceStatus={gettingPrice} StopPromoSheetIdentifier={StopPromoSheetIdentifier}/>
                    
                  </div>
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Promotion ID</th>
                          <th>Promotion Amount</th>
                          <th>Date</th>
                          {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                          <th>Actions</th>
                          }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          stopPromoData.map((items, index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              
                              <td>{items.id}</td>
                              <td>{items.Promo_id}</td>
                              <td>{items.Amount}</td>
                              <td>{items.date}</td>
                              {
                             roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>   
                              <div className="d-flex justify-content-center">                            
                                  <button className="btn btn-outline-info btn-sm">
                                    <i className="fa-solid fa-check"></i>
                                  </button>
                                  &nbsp;&nbsp; &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa-solid fa-xmark"></i>
                                  </button>
                                  </div>
                              </td>
                              }
                            </tr>
                            )
                          })
                        }
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
</div>
    </>
  )
}

export default StopPromotionSheet