import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkbox from "./components/checkbox/checkbox";
import SignUp from './components/signup/singup';
import SignIn from './components/login/signin';
import { useState } from 'react';
import { auth } from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';


function App() {
  const [logged, setLogged] = useState(false)
  const [loadingState, setLoadingState] = useState(true)
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in user")
      setLogged(true)
      setLoadingState(false)
    } else {
      console.log("No logged in user")
      setLoadingState(false)
    }
  })

  if (!loadingState) {
    return(
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<SignIn />} /> */}
        {logged ? <Route index element={<Checkbox />} /> : <Route index element={<SignIn />} />}
        <Route path='/checkbox' element={<Checkbox />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
    )
  } else {
    <h1>Loading...</h1>
  }
}

export default App;
