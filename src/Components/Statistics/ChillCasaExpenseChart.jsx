import ReportEndPoints from '../Api/ReportEndPoints.js';
import colorScheme from "../Colors/Styles.js";
import {useQuery} from 'react-query';
import Chart from 'react-apexcharts';
import React,{useState} from 'react';


const ChillCasaExpenseChart = () => {
  const [totalChillCasaExpense , setTotalChillCasaExpense] = useState('');

  useQuery('chillcasa_total_expense',ReportEndPoints.fetchChillCasaExpenses,{
    onSuccess:(data)=>{
      setTotalChillCasaExpense(data.data.total_chillcassa_expense)
      
   },
   onError: (err) => {
    return err;
  }
}

 )

    const data ={
        options: {
          chart: {
            id: 'apexchart-example',
            responsive: true,
            maintainAspectRatio: false
          },
          xaxis: {
            categories: ['24 Hours','Last_7 Days','Last_30 Days','Last_6 months', 'Last_30 months'],
            labels: {
            style: {
              colors: "white",
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          }
        }
    },
          yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    colors: "white",
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                }
            }

        }
        },
        seriesA: [
          {
          name: 'Deposits',
          data: [totalChillCasaExpense.last_24_hours ,totalChillCasaExpense.last_7_days, totalChillCasaExpense.last_30_days,totalChillCasaExpense.last_6_months,totalChillCasaExpense.last_12_months],
          color:"#00CFE8",
        }
    
      ],
      
      }

      const dataTwo ={
        options: {
          chart: {
            id: 'apexchart-example',
            responsive: true,
            maintainAspectRatio: false
          },
    
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
            // categories:  gettingExpenseDate
            labels: {
              style: {
                colors: "white",
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            }
          }
          },
          
          yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    colors: "white",
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                }
            }
            // axisBorder: {
            //     show: true,
            //     color: '#78909C',
            //     offsetX: 0,
            //     offsetY: 0
            // },
            // axisTicks: {
            //     show: true,
            //     borderType: 'solid',
            //     color: '#78909C',
            //     width: 6,
            //     offsetX: 0,
            //     offsetY: 0
            // }
            
        }
        },
        seriesB: [
          {
          name: 'Income',
          data: [310, 40, 35, 150, 89, 60, 70, 91, 125],
          // data: gettingExpenseAmount,
          color:"#E64444"
        },
    
      ],
    
      }
  return (
    <>
      <div className="scroll-view-two scrollbar-secondary-two">

 <div className="content-wrapper"  style={{ background: colorScheme.body_bg_color }}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Expense Chart</h1>
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
              <h3 className="card-title">ChillCase Expense Chart</h3>
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
              <div className="chart">
              <Chart  
                height={270}
                options={data.options} series={data.seriesA} type="bar"  />
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
            <div className="card-header">
              <h3 className="card-title">Income Chart</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart">
              <Chart  
                height={270}
                options={dataTwo.options} series={dataTwo.seriesB} type="bar"  />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      </div>
    </section>
</div>
</div>
    </>
  )
}

export default ChillCasaExpenseChart