import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import colorScheme from "../Colors/Styles.js";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';



ChartJs.register(
  Tooltip, Title, ArcElement, Legend
)
const RevenueChart = () => {
  const data ={
     
    datasets: [
      {
        data: [
          300, 50, 100
          // gettingFeeSum, gettingExpenseSum, gettingTotalRevenue
          
        ]
        ,
        backgroundColor:[
          // '#00cfe8',
          '#ff6e40',
          '#ffc107',
          '#ff9f43'
          // '#18ffff'
        ]
    },
  ]
  
  ,
  labels: [


      `Income`,
      `Expense`,
      `Revenue`
  
      
  ]
  
  
  
}



  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">
<div className="content-wrapper"  style={{ background: colorScheme.body_bg_color }}>
 <section className="content-header">
   <div className="container-fluid">
     <div className="row mb-2">
       <div className="col-sm-6">
         <h1>Revenue Chart</h1>
       </div>
       <div className="col-sm-6">
         <ol className="breadcrumb float-sm-right">
           <li className="breadcrumb-item"><a href="#">Home</a></li>
           <li className="breadcrumb-item active">ChartJS</li>
         </ol>
       </div>
     </div>
   </div>
 </section>
 <section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12">
         <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
           <div className="card-header">
             <h3 className="card-title">Deposits Chart</h3>
             <div className="card-tools">
               <button type="button" className="btn btn-tool" data-card-widget="collapse">
                 <i className="fas fa-minus" />
               </button>
               {/* <button type="button" className="btn btn-tool" data-card-widget="remove">
                 <i className="fas fa-times" />
               </button> */}
             </div>
           </div>
           <div className="card-body">
             <div className="chart w-50 d-block mx-auto">
             <Doughnut  data={data}  />
             </div>
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

export default RevenueChart