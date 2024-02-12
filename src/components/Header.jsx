import axios from 'axios'
import React, { useEffect } from 'react'

export const Header = () => {
    useEffect(()=>{
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:80/sanctum/csrf-cookie').then(()=>{
          axios.defaults.withXSRFToken=true;
            axios.post('http://localhost:80/api/login',{
              email:'test@example.com',
              password:'password'
            }).then((data)=>{
              axios.get('http://localhost:80/api/test').then((data)=>{
                console.log(data)
            })
                })
         
        })
     
    },[])
  return (
    <div>Header</div>
  )
}
