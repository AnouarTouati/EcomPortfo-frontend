import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../components/AppBar'
import AxiosContext from '../AxiosProvider'

export type getCartItemsCountType = ()=>{}

export const Layout = () => {
  const [cartItemsCount,setCartItemsCount] = useState(0)
  const axios = useContext(AxiosContext)
  async function getCartItemsCount(){
  ;
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
