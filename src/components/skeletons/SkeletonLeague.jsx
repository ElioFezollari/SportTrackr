import React from 'react'
import "../../styles/components/skeleton/skeleton.css"
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'
function SkeletonLeague() {
  return (
    <div className='skeleton-wrapper'>
        <div className='skeleton-league'>
            <SkeletonElement type={"logo"}/>
            <div>
            <SkeletonElement type={"title"}/>
            <SkeletonElement type={"text"}/>
            <SkeletonElement type={"button"}/>
            </div>
        </div>
        <Shimmer/>
    </div>
  )
}

export default SkeletonLeague