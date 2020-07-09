import React, { useEffect, useState, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
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

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
    </Container>
  )
}

export default App
