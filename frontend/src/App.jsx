import { useState } from 'react'
import './App.css'
import Sign from './sign'
import Login from './login'
import Home from './home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <div>
        <Home/>
      </div>
      <BrowserRouter>
        <Routes>
        <Route path='/home' element={<Home />}></Route>
          <Route path='/register' element={<Sign />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
