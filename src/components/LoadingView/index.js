import Loader from 'react-loader-spinner'

const LoadingView = () => (
  <div className="no-data-view-container">
    <Loader type="TailSpin" height={80} width={80} />
  </div>
)

export default LoadingView
