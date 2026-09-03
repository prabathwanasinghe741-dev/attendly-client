import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Onboading from './pages/Onboading'
import Educator from './pages/Educator.jsx'
import Admin from './pages/Admin'
import NotFound from './components/NotFound'
import QRCode from './pages/QRCode'
import QR from './pages/QR'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Onboading />} />
      <Route path='/educator' element={<Educator />} />
      <Route path='/educator/scan' element={<QR />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/qr' element={<QRCode />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default App