import { Router } from "@pages/index"
import "@shared/styles/global.scss"
import { BrowserRouter } from "react-router-dom"

const App = () => {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App