import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from "axios";
const LevelRewardSheet = () => {

    const [getLevelRewards , setLevelRewardSheet] = useState([]);

    // Function fetching rewards according the defined levels in application:

    function gettingLevelRewards(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetch_requested_level_rewards`)
        .then((res)=>{
            setLevelRewardSheet(res.data.data)
        })
        .catch((error)=>{
          return null;
        })
      }

      // Function to approved the level reward when the user unlock/achieve that level:

      function approveReqLevelReward(id,userID,rewardPrice){
        const rewardAppObj = {
            id:id,
            user_id:userID,
            reward:rewardPrice
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}approve_requested_level_rewards`,rewardAppObj)
        .then((res)=>{
          toast.info("Reward Price Approved !", {theme:"dark"})
          setInterval(() => {
            window.location.reload(true)
          }, 2500);

        })
        .catch((res)=>{
                toast.warn("Already got reward", {theme:"dark"})
        })

      }

    useEffect(() => {
        gettingLevelRewards()
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
                  Level Reward
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
                  {/* <li className="breadcrumb-item active">Add Package</li> */}
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Level Reward Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
                  {
                    getLevelRewards.length === 0?

                    <div className="text-center">
                    <h2>No Rewards to Approve !</h2>
                    </div>
                    :
                    <table className="table  text-nowrap">
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Reward Price</th>
                        <th>Level</th>
                        <th>Status</th>
                        {/* <th>Date</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {      
                      
                      getLevelRewards.map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.user_id}</td>
                            <td>{items.title}</td>
                            <td>{items.body}</td>
                             <td>{items.reward_price}</td>
                             <td>{items.level}</td>
                             {items.is_got === "1"?<td style={{color:"#64dd17"}}>Taken</td>:<td style={{color:"#ff1744"}}>Not Taken</td>}
                            {/* <td>{items.Idate}</td> */}
                            
                            <td>
                             <div className="d-flex justify-content-center">
                              <button className="btn btn-outline-info btn-sm" onClick={()=>approveReqLevelReward(items.id , items.user_id, items.reward_price)}>
                                  <i className="fa fa-circle-check"></i>
                                </button>
                              </div>   
                            </td>
                          </tr>
                          )
                        })
                      
                      }

                    </tbody>
                  </table>
                

                  }
                  
            
                    
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

export default LevelRewardSheet