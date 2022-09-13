import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Authenticate from "./pages/auth";
import Home from "./pages/home";
import NewProject from "./pages/home/newproject";
import LandingPage from "./pages/landingpage"
import ProjectPage from "./pages/home/projectpage"
import ProjectPreview from "./pages/home/projectpreview";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<Authenticate/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/newproject" element={<NewProject/>}/>
        <Route path="/projectpage/:pid" element={<ProjectPage/>}/>
        <Route path="/projectpreview/:pid" element={<ProjectPreview/>} />
      </Routes>
    </Router>
  );
}

export default App;
