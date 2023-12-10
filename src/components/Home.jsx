import React, { useState,useEffect } from 'react'
import axios from '../api/axios';

function Home() {

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id')

  const [userdata, setUserData] = useState(null);


  useEffect(() => {
    if (token !== null) {
      axios.get(`/${id}`)
        .then(res => {
          console.log(res.data.user[0]);
          setUserData(res.data.user[0])

        }).catch(err => {
             console.log(err);
        })
    }

  }, [])
console.log("this is out ",userdata);
  return (
    <div>
      
      <h1>Welcome {userdata?.username}</h1>
      <h3>Your ID is {userdata?.ID}</h3>
      
    </div>
  )
}

export default Home