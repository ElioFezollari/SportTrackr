import React, { useState } from 'react'
import AppNavbar from './AppNavbar'

import AppSidebar from './AppSidebar'
import { Outlet } from 'react-router';

function AppLayout() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
        <AppNavbar isActive={isActive} setIsActive={setIsActive}/>    

<div className='app-content'>
        <AppSidebar isActive={isActive} setIsActive={setIsActive} />

        <div className='app-outlet'><Outlet/></div>
        </div>

    </>
  )
}

export default AppLayout