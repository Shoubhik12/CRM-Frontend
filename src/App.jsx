import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import useFetch from './useFetch'


function App() {

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/leads")

 
  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>ClientConnect CRM Dashboard</h2>
       </header>
       <div className='row ' >
            <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                       <ul className='list-group  text-center'>
                            <li className='list-group-item'><a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href="/list">Leads</a></li>
                             <li className='list-group-item'><a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href="">Sales</a></li>
                              <li className='list-group-item'><a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href="/agent">Agents</a></li>
                               <li className='list-group-item'><a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href="/report">Reports</a></li>
                                <li className='list-group-item'><a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href="/settings">Settings</a></li>
                       </ul>
                  </div>
            </div>
            <div className='col-12 col-lg-10 bg-primary-subtle '>
                <h3 className='display-5  text-center'  >Main Content</h3>
                <hr />
                { !loading && <div className='row mx-2'>
                        {
                           data.map(dt=><div className='col'>
                               <div className='card text-center py-2 px-2'>
                                     <Link className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to={`/leads/id/${dt._id}`}    >{dt.name}</Link>
                               </div>
                           </div>)
                        }
                    </div>}
                    <hr />
                    <h4 className='text-center'>Lead Status:</h4>
                    <ul>
                         <li>New:  {data.filter((dt)=>dt.status=="New").length} Leads</li>
                         <li>Contacted: {data.filter((dt)=>dt.status=="Contacted").length} Leads</li>
                         <li>Qualified: {data.filter((dt)=>dt.status=="Qualified").length} Leads</li>
                    </ul>
                    <hr />
                     <h4 className='text-center'>Quick Filters:</h4>
                     <div className='d-flex justify-content-center gap-3'>
                           <Link className='btn btn-primary'  to='/leads/New'  >New</Link>
                           <Link className='btn btn-info' to='/leads/Contacted'  >Contacted</Link>
                           <Link className='btn btn-warning' to='/addlead' >Add a new Lead</Link>
                     </div>
            </div>
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default App
