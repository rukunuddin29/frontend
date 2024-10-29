import React,{ useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import Footer from './components/header/Header.jsx'
import Header from './components/footer/Footer.jsx'

import './App.css'

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch= useDispatch();
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    }).finally(setLoading(false));
  },[])

return !loading ?  <h1 className="min-h-screen flex flex-wrap content-between bg-gray-600">
<Header></Header>
<main>
  
</main>
<Footer></Footer>
</h1>: null
}

export default App
