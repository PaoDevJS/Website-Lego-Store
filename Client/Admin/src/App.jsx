import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Layout from "./Layout/Layout"

const App = () => {
  const [currentUser, setCurrentUser] = useState(true)
  const navigate = useNavigate()

  {
    useEffect(() => {
      const path = () => {
        currentUser ? navigate("/") : 
        (
          navigate("/login")
        )
      }
      path()
    }, [currentUser, navigate])
  }

  return (
    <>
      {
        currentUser ? <Layout /> : <Login />
      }
    </>
  )
}

export default App