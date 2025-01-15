import React, { useState } from 'react'
import AppNavbar from './AppNavbar'

import AppSidebar from './AppSidebar'

function AppLayout() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
        <AppNavbar isActive={isActive} setIsActive={setIsActive}/>    

        <AppSidebar isActive={isActive} />


    </>
  )
}

export default AppLayout