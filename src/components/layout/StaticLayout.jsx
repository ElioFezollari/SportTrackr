import React from 'react'
import StaticNavbar from './StaticNavbar'
import { Outlet } from 'react-router'

function StaticLayout() {
  return (
    <><StaticNavbar/>
    <Outlet/>
    </>
  )
}

export default StaticLayout