import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'
import CheckToken from './components/CheckToken'
import ForgotPassword from './components/ForgotPassword'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            {/* endpoint should provided without leading '/' */}
            <Route path='/dashboard' element={<CheckToken Component={Dashboard} endpoint={"dashboard/"} />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRoutes
