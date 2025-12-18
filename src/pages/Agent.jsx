import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'


function Agent() {

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/agents")

 
  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Sales Agent Management</h2>
       </header>
       <div className='row g-0 ' >
            <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                         <Link className='btn btn-outline-info'  to='/'>Back to dashboard</Link>
                  </div>
            </div>
            <div className='col-12 bg-primary-subtle col-lg-10 '>
                <h3 className='display-5  text-center'  >Sales Agent List</h3>
                <hr />
                {
                        !loading && <ul>
                             {
                                data.map(dt=><li>
                                    Agent: {dt.name} - {dt.email}
                                </li>)
                             }
                        </ul>
                }
                <hr />
                <div className='d-flex justify-content-center align-item-center gap-3'>
                           <Link className='btn btn-warning' to='/addagent' >Add  New Agent Button </Link>
                </div>
            </div>
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default Agent
