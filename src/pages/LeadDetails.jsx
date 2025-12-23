import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import { useEffect } from 'react'
import Select from "react-select"
import {  toast } from 'react-toastify';

function LeadDetails() {

  const stat = useParams()  
  const [edit,setEdit] = useState(false)

  const {data,loading,error} = useFetch("https://crm-backend-amber-ten.vercel.app/leads")
  const commentsData = useFetch(`https://crm-backend-amber-ten.vercel.app/leads/${stat.id}/comments`)

  const statData = data ?.find(dt=>dt._id==stat.id)
  const [commentsForm,setComment] = useState({
    lead:stat.id,
    author: "",
    commentText:""
  })

  useEffect(() => {
  if (!commentsData.loading && commentsData.data.length > 0) {
    setComment(prev => ({
      ...prev,
      author: commentsData.data[0].author._id
    }));
  }
}, [commentsData.loading]);

  const handleComment=(e)=>{
    const value = e.target.value
    setComment((prevData)=>({
      ...prevData,
      commentText:value
    }))
  }

  const handleSubmit= async  ()=>{
     
    try {
       const response = await fetch(`https://crm-backend-amber-ten.vercel.app/leads/${stat.id}/comments`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(commentsForm)
       })

       if(!response.ok){
         throw "Comment not created."
       }

    } catch (error) {
       console.log(error)
    }

    window.location.reload()
  }

  
  const agentsData = useFetch("https://crm-backend-amber-ten.vercel.app/agents")
   

  const [leadForm,setLead] = useState({
     name:"",
     source:"",
     salesAgent:"",
     status:"",
     tags:[],
     timeToClose:"",
     priority:""
  })

  useEffect(() => {
    if (!loading && statData) {
      setLead({
        name: statData.name,
        source: statData.source,
        salesAgent: statData.salesAgent._id,
        status: statData.status,
        tags: statData.tags || [],
        timeToClose: statData.timeToClose,
        priority: statData.priority
      })
    }
  }, [loading])


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


  const handleEditSubmit= async (event)=>{
     event.preventDefault()
     const payload = {...leadForm} 
     console.log(payload)
     try {
          const response = await fetch(`https://crm-backend-amber-ten.vercel.app/leads/${stat.id}`,{
               method:"POST",
               headers:{'Content-Type':"application/json"},
               body:JSON.stringify(payload)
          })

          if(!response.ok){
               throw "Failed to add a lead."
          }

          const data = await response.json()
          console.log(data)
          toast("Details Edited")

     } catch (error) {
          console.log(error)
     }


     setEdit(!edit)
     window.location.reload()
  }



 

  const tagsOptions = [{value:"interested",label:"Interested"},
     {value:"follow up",label:"Follow Up"},{value:"cold lead",label:"Cold lead"},
     {value:"proposal",label:"Proposal"},{value:"important",label:"Important"},
     {value:"hot",label:"Hot"}
  ]


 



  return (
    <>
       <header className='d-flex justify-content-center py-3 align-items-center bg-info text-info-emphasis'>
               <h2 className='display-3'>Lead Details</h2>
       </header>
       <div className='row g-0 ' >
            <div className='col-4 bg-primary col-lg-2 text-white ' style={{minHeight:"480px"}}>
                  <h3 className='display-5 text-center'>SideBar</h3>
                  <div className='bg-primary-subtle d-flex justify-content-center align-items-center mx-3' style={{minHeight:"200px",borderRadius:"15px"}}>
                        <Link className='btn btn-outline-info' to='/' >Back to dashboard</Link>
                  </div>
            </div>
            <div className='col-8 bg-primary-subtle col-lg-10 overflow-auto'>
                { !loading && statData && <h3 className='display-5  text-center'  >Lead Management: {statData.name}</h3>}
                    <hr />
                       <h3 className='px-4'>Lead Details</h3>
                    <hr />
                    {
                      !loading && statData && <div className='px-4'>
                             <p><strong>Lead Name:</strong> {statData.name}</p>
                             <p><strong>Sales Agent:</strong> {statData.salesAgent.name}</p>
                             <p><strong>Lead Source:</strong> {statData.source}</p>
                             <p><strong>Lead Status:</strong> {statData.status}</p>
                             <p><strong>Priority:</strong> {statData.priority}</p>
                             <p><strong>Time to Close:</strong> {statData.timeToClose}</p>
                      </div>   
                    }
                    <hr />
                    {edit?
              <form className='bg-info-subtle px-2' onSubmit={handleEditSubmit}  >
                                  <h1 className='display-5 text-center'>Edit Details</h1>
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
              <div className='input-group mb-3  text-black pb-2'>
                   <span  className='input-group-text'  >Sales Agent</span>
                   <select className='form-select' name="salesAgent" value={leadForm.salesAgent} onChange={handleChange} >
                        <option >Select a value</option>
                        {!agentsData.loading && agentsData.data && agentsData.data.map(dt=><option value={dt._id} key={dt._id} >{dt.name}</option>)}
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
                  <button  className='btn btn-warning my-2 float-center'>Edit Lead Button</button>
              </div>
              </form>:
              <button className='btn btn-warning m-3'  onClick={()=>setEdit(!edit)}  >Edit Lead Details</button> }
                   <hr />
                   <h3 className='display-5 text-center'>Comments Section</h3>
                   <hr />
                   {!commentsData.loading  && <div className='px-4'>
                        {commentsData.data.map(cmt=><div>
                          <p><strong>{cmt.author.name}</strong> - <strong>{new Date(cmt.createdAt).toLocaleDateString()}/{new Date(cmt.createdAt).toLocaleTimeString()}</strong></p>
                          <p><strong>Comment:</strong>  {cmt.commentText}</p>
                        </div>)}
                    </div>}
                    <hr />
                    <div className='form-floating m-4'>
                          <textarea  className='form-control' id="commentForm" value={commentsForm.commentText} onChange={handleComment}  style={{height:"100px"}} ></textarea>
                          <label htmlFor="commentForm">Comments</label>
                          <button className='btn btn-info my-2 float-end'  onClick={handleSubmit} >Submit</button>
                    </div>
            </div>  
       </div>
       <footer className='d-flex justify-content-center py-5 align-items-center bg-info text-info-emphasis' >
           &copy;ClientConnect.All Rights Reserved.
       </footer>
    </>
  )
}

export default LeadDetails
