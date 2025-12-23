import { useState } from "react"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import {  toast } from 'react-toastify';

function AddSalesAgent() {

  const navigate = useNavigate()

  const [agentForm,setAgent] = useState({
    name:"",
    email:""
  })

  const handleChange=(e)=>{
     const {name,value} = e.target
     setAgent((prev)=>({
      ...prev,
      [name]:value
     }))
  }

  const handleSubmit= async (event)=>{
    event.preventDefault()

    try {
      
       const response = await fetch("https://crm-backend-amber-ten.vercel.app/agents",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(agentForm)
       })

       if(!response.ok){
          throw "Agent not created"
       }
       toast("New Sales Agent Created")
       navigate("/agent")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Add New Sales Agent</h2>
       </header>
       <main className="row">
        <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                        <Link className='btn btn-outline-info' to='/' >Back to dashboard</Link>
                  </div>
            </div>
         <div className='bg-primary col-12 col-lg-10 d-flex justify-content-center align-items-center  py-5' style={{minHeight:"500px"}}  >
         <form className='bg-secondary text-white px-2 py-2  ' onSubmit={handleSubmit}  style={{width:"1000px"}} >
              <h1 className='display-5 text-center'>Sales Agent Details</h1>
              <div className='input-group mb-3'>
                    <span  className='input-group-text'  >Name</span>
                    <input type="text" name="name" value={agentForm.name} onChange={handleChange}  className='form-control' />
              </div>
              <div className='input-group mb-3'>
                    <span  className='input-group-text'  >Email</span>
                    <input type="text" name="email" value={agentForm.email} onChange={handleChange}  className='form-control' />
              </div>
              <div className='d-flex justify-content-center'>
                  <button  className='btn btn-warning float-center'>Create Sales Agent</button>
              </div>
         </form>
       </div>
       </main>
      
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default AddSalesAgent
