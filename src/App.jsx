import {BrowserRouter} from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return(
  <div>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  </div>
  )
}

export default App;
