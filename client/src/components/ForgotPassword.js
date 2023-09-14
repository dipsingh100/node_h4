import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const handleChange = (e) => {
        const { value } = e.target
        setEmail(value)
      }
    
    return (
        <div className='flex center h-100'>
            <div className="container">
                <div className="header center ft-2">Forgot Password</div>
                <div className="form">
                    <div className="inp-container">
                        <input type="email" name="email" required onChange={handleChange} value={email}/>
                        <label>Email</label>
                    </div>
                    <div className="footer flex">
                        <p></p>
                        <button type="submit" className='btn-primary'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
