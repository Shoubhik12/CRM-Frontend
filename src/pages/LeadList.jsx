import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'


function Leadlist() {

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/leads")
  const [filter,setFilter] = useState("status")
  console.log(filter)
 
  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Lead List</h2>
       </header>
       <div className='row ' >
            <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                        <Link className='btn btn-outline-info' to='/' >Back to dashboard</Link>
                  </div>
            </div>
            <div className='col-12 bg-primary-subtle col-lg-10 '>
                <h3 className='display-5  text-center'  >Lead Overview</h3>
                    <hr />
                    <ol>
                         {
                            !loading && <>{
                                data.map(dt=><li>{filter=="status"?dt.status:dt.salesAgent.name} - {"  "} {dt.name}</li>)
                            }</>
                         }
                    </ol>
                    <hr />
                    <strong className='mx-2'>Filters:</strong> <button className='btn btn-primary m-2'  onClick={()=>setFilter("status")}  >Status</button> <button className='btn btn-warning m-2'  onClick={()=>setFilter("salesAgent")} >Sales Agent</button> <br />
                    <Link className='btn btn-info m-2' to='/addlead' >Add New Lead Button</Link>

            </div>  
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default Leadlist
