import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {default as Header} from '../components/PrimarySearchAppBar'
import getAxios from '../Axios'

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
    <Header cartItemsCount={cartItemsCount}/>
    <Outlet context={getCartItemsCount}/>
    </>
  )
}
