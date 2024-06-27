import React from 'react'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element ={<Dashboard/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
