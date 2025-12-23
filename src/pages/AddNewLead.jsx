import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../useFetch'
import Select from "react-select"
import {  toast } from 'react-toastify';


function AddNewLead() {

  const  navigate = useNavigate() 

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/agents")
   

  const [leadForm,setLead] = useState({
     name:"",
     source:"",
     salesAgent:[],
     status:"",
     tags:[],
     timeToClose:"",
     priority:""
  })

  const handleChange=(e)=>{
     const {name,value} = e.target
     setLead((prevData)=>({
          ...prevData,
          [name]: value
     }))
  }
  
  const handleTagsChange=(selected)=>{
     const options = selected? selected.map(opt=>opt.value):[]
     setLead((prevData)=>({
          ...prevData,
          tags:options
     }))
  }


  const handleSubmit= async (event)=>{
     event.preventDefault()
     try {
          const response = await fetch("https://crm-backend-amber-ten.vercel.app/leads",{
               method:"POST",
               headers:{'Content-Type':"application/json"},
               body:JSON.stringify(leadForm)
          })

          if(!response.ok){
               throw "Failed to add a lead."
          }

          const data = await response.json()
          console.log(data)

          toast("New Lead added. ")

          navigate("/list")

     } catch (error) {
          console.log(error)
     }

  }



 

  const tagsOptions = [{value:"interested",label:"Interested"},
     {value:"follow up",label:"Follow Up"},{value:"cold lead",label:"Cold lead"},
     {value:"proposal",label:"Proposal"},{value:"important",label:"Important"},
     {value:"hot",label:"Hot"}
  ]


  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Add a new Lead</h2>
       </header>
       <div className='row'>
          <div className='col-12 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                        <Link className='btn btn-outline-info' to='/' >Back to dashboard</Link>
                  </div>
          </div>
         <div className='col-12 col-lg-10  bg-primary d-flex justify-content-center align-items-center py-3'>
         <form className='bg-secondary text-white px-2 py-2  '  style={{width:"1000px"}} onSubmit={handleSubmit} >
              <h1 className='display-5 text-center'>Lead Details</h1>
              <div className='input-group mb-3'>
                    <span  className='input-group-text'   >Name</span>
                    <input type="text" name="name"  className='form-control' value={leadForm.name}  onChange={handleChange} />
              </div>
              <div className='input-group mb-3'>
                   <span className='input-group-text' >Lead Source</span>
                   <select className='form-select' name="source"  value={leadForm.source} onChange={handleChange} >
                        <option >Select a value</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Email">Email</option>
                        <option value="Others">Others</option>
                   </select>
              </div>
              <div className='text-black pb-2'>
                   <span  >Sales Agent</span>
                   <select className='form-select' name="salesAgent" value={leadForm.salesAgent} onChange={handleChange} >
                        <option >Select a value</option>
                        {!loading && data && data.map(dt=><option value={dt._id} key={dt._id} >{dt.name}</option>)}
                   </select>
              </div>
              <div className='input-group mb-3'>
                   <span className='input-group-text' >Lead Status</span>
                   <select className='form-select' name="status" value={leadForm.status} onChange={handleChange} >
                        <option >Select a value</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                   </select>
              </div>
              <div className='input-group mb-3'>
                   <span className='input-group-text' >Priority</span>
                   <select className='form-select' name="priority" value={leadForm.priority} onChange={handleChange} >
                        <option >Select a value</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                   </select>
              </div>
              <div className='input-group mb-3'>
                   <span className='input-group-text' >Time to Close</span>
                   <input type="number" name="timeToClose"  value={leadForm.timeToClose}  className='form-control'onChange={handleChange} />
              </div>
              <div className='text-dark pb-2'>
                   <span >Tags</span>
                   <Select options={tagsOptions}  isMulti   value={tagsOptions.filter(opt=>leadForm.tags.includes(opt.value))} onChange={handleTagsChange} />
              </div>
              <div className='d-flex justify-content-center'>
                  <button  className='btn btn-warning float-center'>Create Lead Button</button>
              </div>
         </form>
       </div>
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default AddNewLead
