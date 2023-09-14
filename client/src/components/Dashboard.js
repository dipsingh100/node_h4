import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
    const navigate = useNavigate()

    const { data } = props
    const handleLogout = (e) => {
        e.preventDefault()
        window.localStorage.removeItem("token")
        navigate("/")
    }

    // Once loading is complete, render the Dashboard component
    return (
        <div className='dashboard-cont'>
            <h1>Welcome to Dashboard, {data.username && data.username.split(" ")[0]}</h1>
            <p>{data && data.articles}</p>
            <button onClick={handleLogout} className='btn-primary out'>Logout</button>
        </div>
    )
}

export default Dashboard
