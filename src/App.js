import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from './test/dashboard'

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Dashboard} />
           </BrowserRouter>
      </div>
    </div>
  )
}

export default App;