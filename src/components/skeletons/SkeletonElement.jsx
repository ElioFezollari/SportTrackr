import React from 'react'
import "../../styles/components/skeleton/skeleton.css"
function SkeletonElement({type}) { 
  return (
    <div className={`skeleton ${type}`}></div>
  ) 
}

export default SkeletonElement