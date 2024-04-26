import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../components/AppBar'
import getAxios from '../Axios'

export type getCartItemsCountType = ()=>{}

export const Layout = () => {
  const [cartItemsCount,setCartItemsCount] = useState(0)

  async function getCartItemsCount(){
    const axios = await getAxios() 
    const result = await axios.get("/cart/products/count")
    setCartItemsCount(result.data.count)
  }

  useEffect(()=>{
    getCartItemsCount()
  },[])
  return (
    <>
    <AppBar cartItemsCount={cartItemsCount}/>
    <Outlet context={getCartItemsCount}/>
    </>
  )
}
