import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'
import {Chart } from "chart.js/auto"
import { Doughnut,Bar } from 'react-chartjs-2'


function Report() {


  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/leads")
  const pipeline = useFetch("https://crm-backend-amber-ten.vercel.app/report/pipeline")
  let closed 
  let inPipeline
  let agents={}
  let statuses= {}

  if(!loading && !pipeline.loading){
     closed = data.length-pipeline.data.totalLeadsInPipeline 
     console.log(closed)
     inPipeline= pipeline.data.totalLeadsInPipeline
     console.log(inPipeline)
     data.forEach(dt=>{
      const agentName = dt.salesAgent.name
      agents[agentName] = dt.status == "Closed"? 0 : +1
     })
     console.log(agents)
     data.forEach(dt=>{
        const status = dt.status
        statuses[status] = (statuses[status] || 0) +1
     })
     console.log(statuses)
  }

 
  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Lead List</h2>
       </header>
       <div className='row g-0  ' >
            <div className='col-4 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                        <Link className='btn btn-outline-info' to='/' >Back to dashboard</Link>
                  </div>
            </div>
            <div className='col-8 bg-primary-subtle px-2 col-lg-10 overflow-auto'>
                <h3 className='display-5  text-center'  >Report Overview</h3>
                    <hr />
                    <h2 className='text-center'>Total Leads closed and in pipeline</h2>
                    <div className='d-flex justify-content-center'  style={{maxHeight:"300px"}}>
                    {!loading && !pipeline.loading && <Doughnut  data = {{
                                 labels: [
                                          "Total leads in pipeline",
                                          'Total leads closed',
                                         ],
                                datasets: [{
                                label: 'Report',
                                data: [inPipeline,closed],
                                backgroundColor: [
                                 'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                ],
                                hoverOffset: 4
                                }]
                        }}  />}        
                    </div>   
                    <hr />
                    <h2 className='text-center'>Leads closed by Sales Agent</h2>
                    <div className='d-flex justify-content-center' style={{maxHeight:"300px"}}>
                      {
                        !loading && data && <Bar data={{
                           labels:Object.keys(agents),
                           datasets:[{
                             label:"Sales Agents",
                             data: Object.values(agents)
                           }]
                        }} /> 
                      }
                    </div>
                    <hr />
                    <h2 className='text-center'>Lead Status Distribution</h2>
                    <div className='d-flex justify-content-center my-2' style={{maxHeight:"300px"}}>
                       {!loading && !pipeline.loading && <Doughnut  data = {{
                                labels: Object.keys(statuses)  ,
                                datasets: [{
                                label: 'Status',
                                data: Object.values(statuses)
                                }]
                        }}  />}        
                    </div>
            </div>  
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default Report
