import React, { useState, useEffect } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import "./App.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import host from './host'


const LandingPage = () => {
    const [status, setStatus] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        const checkToken = async () => {
            try {
                const res = await axios.get(`${host}/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    navigate("/dashboard")
                }
            } catch (err) {
                console.error(err.response.data.message);
            }
        }
        if (token) {
            checkToken()
        }
    }, [navigate])

    return (
        <div className="main-container flex center h-100">
            <div className="container">
                <div className="header">
                    <div className={`login ${status ? "wh" : ""}`} onClick={() => setStatus(!status)}>Login</div>
                    <div className={`register ${status ? "" : "wh"}`} onClick={() => setStatus(!status)}>Register</div>
                </div>
                {
                    status ?
                        <Login /> :
                        <Register />
                }
            </div>
        </div>
    )
}

export default LandingPage
