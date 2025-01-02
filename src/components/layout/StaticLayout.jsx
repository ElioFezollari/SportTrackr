import React from 'react'
import StaticNavbar from './StaticNavbar'
import { Outlet } from 'react-router'
import StaticFooter from './StaticFooter'

function StaticLayout() {
  return (
    <><StaticNavbar/>
    <Outlet/>
    <StaticFooter/>
    </>
  )
}

export default StaticLayout