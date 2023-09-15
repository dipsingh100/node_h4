import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../loader.css"
import host from '../host'

const CheckToken = ({ Component, endpoint, ...rest }) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        const checkToken = async () => {
            try {
                const res = await axios.get(`${host}/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(res.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                navigate("/")
            }
        }

        if (!token) {
            setIsLoading(false)
            navigate("/")
        } else {
            checkToken()
        }
    }, [endpoint, navigate])

    if (isLoading) {
        return (
            <div className="loader">
                <div class="dot-spinner">
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                </div>
            </div>
        )
    }
    return (
        <Component {...rest} data={data} />
    )
}

export default CheckToken
