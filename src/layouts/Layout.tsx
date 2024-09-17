import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../components/AppBar'
import AxiosContext from '../AxiosProvider'


export const Layout = () => {
  
  return (
    <>
    <AppBar />
    <Outlet />
    </>
  )
}
