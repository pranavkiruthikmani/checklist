import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkbox from "./components/checkbox/checkbox";
import SignUp from './components/signup/singup';


function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route index element={<SignUp />} />
      <Route path='/checkbox' element={<Checkbox />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
