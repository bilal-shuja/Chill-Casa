import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from "axios";

const LevelSheet = () => {
    const [levelSheet , setLevelSheet] = useState([]);

    // Function for fetching level reward in the sheet:

    function gettingLevels(){
        axios.get( `${process.env.REACT_APP_BASE_URL}fetchalllevels`)
        .then((res)=>{
            setLevelSheet(res.data.Data)
        })
        .catch((error)=>{
          return null;
        })
    }



    useEffect(() => {
        gettingLevels()
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
                  Level Sheet
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
                    <h5>Level Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>level</th>
                          <th>Unlock At</th>
                          <th>Investment Start</th>
                          <th>Investment End</th>
                          <th>Reward</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        levelSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.level}</td>
                              <td>{items.unlocks_at}</td>
                              <td>{items.investment_start}</td>
                               <td>{items.investment_limit}</td>
                               <td>{items.reward}</td>
                              <td>{items.Idate}</td>

                              <td>
                               <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                               
                                </div>   
                                 
                              </td>
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

export default LevelSheet