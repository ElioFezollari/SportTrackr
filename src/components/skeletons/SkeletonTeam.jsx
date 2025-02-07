import React from 'react'
import SkeletonElement from './SkeletonElement'
import "../../styles/components/skeleton/skeleton.css"
import Shimmer from './Shimmer'

function SkeletonTeam() {
  return (
    <div className='skeleton-info'>
        <div className='league-heading'>
            <SkeletonElement type={"logo"}/>
            <SkeletonElement type={"text"}/>
        </div>
        <div className='skeleton-main'>
        <SkeletonElement type="logo"/>
        <div className='skeleton-description'>
            <div className='skeleton-description-header'>
            <SkeletonElement type="title"/>
            <div>
            <SkeletonElement type="title"/>
            <SkeletonElement type="title"/>
            </div>
            </div>            <div>
                <SkeletonElement type={"text"}/>
                <SkeletonElement type={"text"}/>
                <SkeletonElement type={"text"}/>
                <SkeletonElement type={"text"}/>
                <SkeletonElement type={"text"}/>
            </div>
        </div>
        </div>
        <div className='league-stats'>
        <div><SkeletonElement type={"logo"}/>
        <SkeletonElement type={"text"}/></div>
        <div><SkeletonElement type={"logo"}/>
        <SkeletonElement type={"text"}/></div>
        <div><SkeletonElement type={"logo"}/>
        <SkeletonElement type={"text"}/></div>
        <div><SkeletonElement type={"logo"}/>
        <SkeletonElement type={"text"}/></div>



        </div>
        </div>
  )
}

export default SkeletonTeam