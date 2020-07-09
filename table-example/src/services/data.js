import axios from 'axios'

const baseUrl = 'https://randomuser.me/api/?results=100'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
