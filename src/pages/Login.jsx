import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../services/user';
import { toast } from 'react-toastify';
import { UserContext } from '../app/App';
import config from '../services/config';
import axios from 'axios';

function Login() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signin = async () => {
        try {
            const result = await loginUser(email, password)
            if (result.status == 'success') {
                window.sessionStorage.setItem('token', result.data.token)
                setUser({
                    name: result.data.name,
                    email: result.data.email,
                    mobile: result.data.mobile
                })
                toast.success('Login Successful')
                const headers = { token: window.sessionStorage.getItem("token") }
                const responseProfile = await axios.get(config.BASE_URL + '/user/userprofile', { headers })
                if (responseProfile.data.data.length == 1) {
                    const responsePhotos = await axios.get(config.BASE_URL + '/photos/userphotos', { headers })
                    if (responsePhotos.data.data.length == 6) {
                        const responsePreferences = await axios.get(config.BASE_URL + '/user/userpreferences', { headers })
                        if (responsePreferences.data.data.length == 1) {
                            navigate("/home")
                        } else {
                            navigate("/preferences")
                        }
                    } else {
                        navigate('/addphotos')
                    }
                } else {
                    navigate('/createProfile')
                }
            }
            else
                toast.error(result.error)
        }
        catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div style={{ width: '100%', height: 750, position: 'relative' }}>
            

            <div className='container w-50'>
                <div className="mb-3 mt-3">
                    <label for="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder='password' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <button className='btn btn-success' onClick={signin}>Signin</button>
                </div>
                <div>
                    <label> Don't have an account ?</label>
                    <Link to="/register"> Click Here</Link>
                </div>
            </div>
        
        </div>
    )
}

export default Login
