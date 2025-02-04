import axios from 'axios'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/user', {
          withCredentials: true
        })
        console.log('User:', data)
        return data
      } catch (error) {
        console.error('Error fetching user:', error)
        return null
      }
    }
    fetchUser()
  }, [])
  return (
    <>
      <div>Hello World</div>
    </>
  )
}

export default App
