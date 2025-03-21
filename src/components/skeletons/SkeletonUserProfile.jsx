import React from 'react'
import SkeletonElement from './SkeletonElement'
import "../../styles/components/skeleton/skeleton.css"

const SkeletonUserProfile = () => {
    return (
      <div className="skeleton-user-profile">
        <div className="skeleton-header">
          <SkeletonElement type="logo" />
          <div className="skeleton-header-info">
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
          </div>
        </div>
  
        <div className="skeleton-details">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
  
        <div className="skeleton-stats">
          <SkeletonElement type="logo" />
          <SkeletonElement type="text" />
          <SkeletonElement type="logo" />
          <SkeletonElement type="text" />
        </div>
      </div>
    );
  };
  
  export default SkeletonUserProfile;