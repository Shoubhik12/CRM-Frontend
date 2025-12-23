import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'


function Settings() {

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/agents")
  const leads = useFetch("https://crm-backend-amber-ten.vercel.app/leads")

  const deleteLeads = async (id) => {
      try {
         const response = await fetch(`https://crm-backend-amber-ten.vercel.app/leads/${id}`,{
            method:"DELETE"
         })

         if(!response.ok){
           throw "Lead not deleted."
         }

         window.location.reload()
      } catch (error) {
         throw error
      }
  }

  const deleteAgents = async (id) => {
      try {
         const response = await fetch(`https://crm-backend-amber-ten.vercel.app/agents/${id}`,{
            method:"DELETE"
         })

         if(!response.ok){
            throw "Agent not deleted."
         }

         window.location.reload()

      } catch (error) {
         throw error
      }
  }

 
  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Settings</h2>
       </header>
       <div className='row g-0 ' >
            <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                         <Link className='btn btn-outline-info '  to='/'>Back to dashboard</Link>
                  </div>
            </div>
            <div className='col-12 bg-primary-subtle col-lg-10 overflow-auto'>
                <h3 className='display-5  text-center'  >Lead List</h3>
                {
                        !loading && <ul className='px-4'>
                             {
                                data.map(dt=><li className='py-3 '>
                                    Agent: {dt.name} - {dt.email}   <button className='btn btn-danger float-end' onClick={()=>deleteAgents(dt._id)}   >Delete</button>
                                </li>)
                             }
                        </ul>
                }
                <hr />
                <h3 className='display-5  text-center'  >Agents</h3>
                {
                    !leads.loading && <ul className='px-4'>{
                             leads.data.map(dt=><li className='py-3'>{dt.name}   <button className='btn btn-danger float-end' onClick={()=>deleteLeads(dt._id)}  >Delete</button></li>)
                      }</ul>
                }
            </div>
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default Settings
