import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from '../api/axios';

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: user,
      password: pwd
    }
    axios.post("/Login", data)
      .then(res => {
        setPwd('');
        setUser('');
        console.log(res.data);
        
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
       
        window.location.replace('/home')
      }).catch(err => {
        console.log(err.response);
        if (!err.response) {
          setErrMsg('No server response')
        } else if (err.response.status === 404) {
          setErrMsg('Wrong username or password')
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized")
        } else {
          setErrMsg("Login failled")
        }

        errRef.current.focus();

      })

  }

  return (
    <div className='ldiv'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
      <h1>LOG-IN</h1>
      <form onSubmit={handleLogin}>

        <div className='rap'>
          <label htmlFor="username">Username:</label>
          <input
            className='inp'
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            value={user}
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className='rap'>
          <label htmlFor="password">Password</label>
          <input
            className='inp'
            type='password'
            id='password'
            required
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
        </div>
        <button className='lbtn'>Log In</button>
      </form>
      <p>Do not have an account <Link to='/'>Sign-In</Link> </p>
      <Outlet />
    </div>
  )
}

export default Login