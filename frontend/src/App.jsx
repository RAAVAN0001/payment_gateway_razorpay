import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Porduct from './pages/Porduct'
import Success from './pages/Success'
import Failed from './pages/Failed'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Porduct />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App