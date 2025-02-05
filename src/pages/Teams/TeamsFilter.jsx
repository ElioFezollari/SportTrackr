import React, { useState } from 'react'
import Dropdown from '../../components/Dropdown'
function TeamsFilter() {
      const [selectedName, setSelectedName] = useState("Pick  League");
  return (
    <div className='selection-filter'>
    <Dropdown
    name={selectedName}
    options={["Option 1", "Option 2", "Option 3"]}
    onChange={setSelectedName}
  />
  </div>
  )
}

export default TeamsFilter