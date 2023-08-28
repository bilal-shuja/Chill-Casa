import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import ReportEndPoints from '../Api/ReportEndPoints.js'
import colorScheme from "../Colors/Styles.js";
import { Doughnut } from 'react-chartjs-2';
import {useQuery} from 'react-query';
import React,{useState} from 'react';



ChartJs.register(
  Tooltip, Title, ArcElement, Legend
)
const RevenueChart = () => {

  const [totalChillCasaRevenue , setTotalChillCasaRevenue] = useState('');

  // Getting Therapist Category function:
  useQuery('chill_casa_revenue',ReportEndPoints.fetchChillCasaTotalRevenue,{
    onSuccess:(data)=>{
      setTotalChillCasaRevenue(data.data.total_chillcassa_revenue)
   },
   onError: (err) => {
    return err;
  }
}

 )


  const data ={
     
    datasets: [
      {
        data: [
          totalChillCasaRevenue.last_24_hours , totalChillCasaRevenue.last_7_days , totalChillCasaRevenue.last_30_days, 
          totalChillCasaRevenue.last_6_months , totalChillCasaRevenue.last_12_months
        ]
        ,
        backgroundColor:[
          '#00cfe8',
          '#ff6e40',
          '#ffc107',
          '#ff9f43',
          '#18ffff'
        ]
    },
  ]
  
  ,
  labels: [


      `Last 24 Hours`,
      `Last 7 Days`,
      `Last 30 Days`,
      `Last 6 Months`,
      `Last 12 Months`
  
      
  ]
  
  
  
}

const options = {
  plugins: {
    legend: {
      labels: {
        color: '#fff', // Set the desired label text color
      },
    },
  },
};



  return (
    <>

<div className="scroll-view-two scrollbar-secondary-two">
<div className="content-wrapper"  style={{ background: colorScheme.body_bg_color }}>
 <section className="content-header">
   <div className="container-fluid">
     <div className="row mb-2">
       <div className="col-sm-6">
         <h1>Chill Casa Revenue</h1>
       </div>
       {/* <div className="col-sm-6">
         <ol className="breadcrumb float-sm-right">
           <li className="breadcrumb-item"><a href="#">Home</a></li>
           <li className="breadcrumb-item active">ChartJS</li>
         </ol>
       </div> */}
     </div>
   </div>
 </section>
 <section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12">
         <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
           <div className="card-header">
             <h3 className="card-title">Revenue Chart</h3>
             <div className="card-tools">
               <button type="button" className="btn btn-tool" data-card-widget="collapse">
                 <i className="fas fa-minus" />
               </button>
               {/* <button type="button" className="btn btn-tool" data-card-widget="remove">
                 <i className="fas fa-times" />
               </button> */}
             </div>
           </div>
           <div className="card-body text-white">
             <div className="chart w-50 d-block mx-auto">
             <Doughnut  data={data} options={options} />
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