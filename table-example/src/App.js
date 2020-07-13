import React, { useEffect, useState, useMemo } from 'react'
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import dataService from './services/data'
import TableContainer from './components/TableContainer'
import { SelectColumnFilter } from './filter'

const renderRowSubComponent = (row) => {
  const {
    name: { first, last },
    location: { city, street, postcode },
    picture,
    cell,
  } = row.original

  return (
    <Card style={{ width: '18rem', margin: '0 auto' }}>
      <CardImg top src={picture.large} alt="Card image cap" />
      <CardBody>
        <CardTitle>
          <strong>{`${first} ${last}`}</strong>
        </CardTitle>
        <CardText>
          <strong>Phone</strong>: {cell}
          <br />
          <strong>Address</strong>
          {`${street.name} ${street.number} - ${postcode} - ${city}`}
        </CardText>
      </CardBody>
    </Card>
  )
}

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
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: 'Title',
        accessor: 'name.title',
        Filter: SelectColumnFilter,
        disableSortBy: true,
      },
      { Header: 'First Name', accessor: 'name.first' },
      { Header: 'Last Name', accessor: 'name.last' },
      { Header: 'Email', accessor: 'email', disableSortBy: true },
      { Header: 'City', accessor: 'location.city' },
      {
        Header: 'Hemisphere',
        accessor: (values) => {
          const { latitude, longitude } = values.location.coordinates
          const first = Number(latitude) > 0 ? 'N' : 'S'
          const second = Number(longitude) > 0 ? 'E' : 'W'
          return first + '/' + second
        },
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equal',
        Cell: ({ cell }) => {
          const { value } = cell

          const pickEmoji = (value) => {
            let first = value[0]
            let second = value[2]
            const options = ['⇖', '⇗', '⇙', '⇘']
            let num = first === 'N' ? 0 : 2
            num = second === 'E' ? num + 1 : num
            return options[num]
          }

          return (
            <div style={{ textAlign: 'center', fontSize: 18 }}>
              {pickEmoji(value)}
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  )
}

export default App
