import { useState } from "react"
import LayOut from "./layout/LayOut"

const App = () => {
  const [currentUser, setCurrentUser] = useState(false)
  return (
    <>
      {
        currentUser? "" : <LayOut />
      }
    </>
  )
}

export default App