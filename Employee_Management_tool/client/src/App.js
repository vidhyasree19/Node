import React from 'react'
    import LoginPage from './pages/LoginPage'
    import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import Dashboard from './pages/Dashboard'
    import AdminDashboard from './pages/AdminDashboard'
    import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeProfile from './pages/EmployeeProfile'
import ViewTeamDetails from './pages/ViewTeamDetails'
import RaiseComplaint from './pages/RaiseComplaint'
import ViewComplaints from './pages/ViewComplaints'
import AddEmployee from './pages/adminscreens/AddEmployee'
import AllEmployees from './pages/adminscreens/AllEmployees'
import Complaints from './pages/adminscreens/Complaints'
import UpdateEmployee from './pages/adminscreens/UpdateEmployee'

    
    const App = () => {
    
    
    
      return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/dashboard' element ={<Dashboard/>}/>
              <Route path='/Admindashboard' element ={<AdminDashboard/>}/>
              <Route path='/Employeedashboard' element ={<EmployeeDashboard/>}/>
              <Route path="/employee/profile" element={<EmployeeProfile/>} />
              <Route path="/employee/team" element={<ViewTeamDetails/>} />
              <Route path="/employee/complaints/raise" element={<RaiseComplaint/>} />
              <Route path="/employee/complaints/all" element={<ViewComplaints/>} />
              <Route path="/addEmployee" element={<AddEmployee/>}/>
              <Route path='/allemployees' element={<AllEmployees/>}/>
              <Route path='/complaints' element={<Complaints/>}/>
              <Route path='/updateEmployees' element={<UpdateEmployee/>}/>
             
            </Routes>
          </BrowserRouter>
        </div>
      )
    }
    
    

export default App
