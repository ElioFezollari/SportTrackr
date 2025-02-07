import SkeletonElement from './SkeletonElement'
import "../../styles/components/skeleton/skeleton.css"
import Shimmer from './Shimmer'
// import Shimmer from './Shimmer'
function SkeletonMatchUpload() {
  return (
    <div className='skeleton-info'>
        <header className='skeleton-info-back'>
            <SkeletonElement type="title"/> 
            <SkeletonElement type="logo"/>
            <SkeletonElement type="logo"/>           
        </header>

        <div className='skeleton-main'>
            <div className='skeleton-description'>
                <div className='skeleton-description-header'>
                    <SkeletonElement type="logo"/>           
                    <SkeletonElement type="title"/>
                </div>            
                <table>
                    <thead>
                        <tr>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                        </tr>
                        <tr>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                            <SkeletonElement type={"text"}/>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className='league-stats'>
            <div><SkeletonElement type={"logo"}/>
            <SkeletonElement type={"text"}/></div>
        </div>

        <Shimmer/>
    </div>
  )
}

export default SkeletonMatchUpload