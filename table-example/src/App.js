import React, { useEffect, useState, useMemo } from 'react'
import dataService from './services/data'
import TableContainer from './components/TableContainer'

function App() {
  const [data, setData] = useState([])

  //Prepared the data
  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getAll()
      const contacts = data.results

      setData(contacts)
    }

    fetchData()
  }, [])

  //Define Columns
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: 'name.title' },
      { Header: 'First Name', accessor: 'name.first' },
      { Header: 'Last Name', accessor: 'name.last' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'City', accessor: 'location.city' },
    ],
    []
  )

  return <TableContainer columns={columns} data={data} />
}

export default App
