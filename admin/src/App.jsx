import React, { useContext } from 'react'
import { PhysiotherapistContext } from './context/PhysiotherapistContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddPhysiotherapist from './pages/Admin/AddPhysiotherapist';
import PhysiotherapistsList from './pages/Admin/PhysiotherapistsList';
import Login from './pages/Login';
import PhysiotherapistAppointments from './pages/Physiotherapist/PhysiotherapistAppointments';
import PhysiotherapistDashboard from './pages/Physiotherapist/PhysiotherapistDashboard';
import PhysiotherapistProfile from './pages/Physiotherapist/PhysiotherapistProfile';

const App = () => {

  const { dToken } = useContext(PhysiotherapistContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-physiotherapist' element={<AddPhysiotherapist />} />
          <Route path='/physiotherapist-list' element={<PhysiotherapistsList />} />
          <Route path='/physiotherapist-dashboard' element={<PhysiotherapistDashboard />} />
          <Route path='/physiotherapist-appointments' element={<PhysiotherapistAppointments />} />
          <Route path='/physiotherapist-profile' element={<PhysiotherapistProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App