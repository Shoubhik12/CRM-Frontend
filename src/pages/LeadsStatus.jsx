import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useParams } from 'react-router-dom'
import useFetch from '../useFetch'

function LeadsStatus() {

  const { stat } = useParams()
  const { data, loading, error } = useFetch(
    "https://crm-backend-amber-ten.vercel.app/leads"
  )

  const [filter, setFilter] = useState("salesAgent")
  const [sortOrder, setSortOrder] = useState("asc")
  const [statData, setStatData] = useState([])

  
  useEffect(() => {
    if (data) {
      const filtered = data.filter(dt => dt.status === stat)
      setStatData(filtered)
    }
  }, [data, stat])


  const handleSortByTimeToClose = () => {
    const sorted = [...statData].sort((a, b) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    )

    setStatData(sorted)
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))
  }

  return (
    <>
      <header className='d-flex justify-content-center py-3 bg-info'  >
        <h2 className='display-3'>Leads By Status</h2>
      </header>

      <div className='row '>
        <div className='col-12 col-lg-2 bg-primary text-white'>
          <h3 className='text-center py-4'>SideBar</h3>
          <div className='d-flex justify-content-center my-3'>
            <Link className='btn btn-outline-info' to='/'>
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className='col-12 col-lg-10 bg-primary-subtle '  style={{minHeight:'550px'}} >
          <h3 className='text-center px-4'>Lead List By Status</h3>
          <hr />
          <h4 className='px-4'>Status: {stat}</h4>

          {!loading && (
            <ul>
              {statData.map(st => (
                <li key={st._id}>
                  {st.name} –{" "}
                  {filter === "salesAgent"
                    ? `Sales Agent: ${st.salesAgent.name}`
                    : `Priority: ${st.priority}`}
                  {" "}– Time to close: {st.timeToClose} days
                </li>
              ))}
            </ul>
          )}

          <hr />

          <div className='px-4'>
                <strong>Filters:</strong>
          <button
            className='btn btn-primary m-2'
            onClick={() => setFilter("priority")}
          >
            Priority
          </button>
          <button
            className='btn btn-warning m-2'
            onClick={() => setFilter("salesAgent")}
          >
            Sales Agent
          </button>

          <br />

          <strong>Sort By:</strong>
          <button
            className='btn btn-warning m-2'
            onClick={handleSortByTimeToClose}
          >
            Time to Close {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          </div>
        </div>
      </div>

      <footer className='text-center py-4 bg-info'>
        © ClientConnect. All Rights Reserved.
      </footer>
    </>
  )
}

export default LeadsStatus
