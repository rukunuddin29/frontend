import React,{ useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'

import './App.css'

function App() {
  const [loading,setLoading]=useState(true);

  const dispatch= useDispatch();

  return (
    <>
     mega project
    </>
  )
}

export default App
