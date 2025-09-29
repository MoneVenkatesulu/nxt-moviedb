const FailureView = ({reFetch}) => (
  <div className="no-data-view-container">
    <img
      src="https://res.cloudinary.com/dmlk7cxkm/image/upload/v1758691571/Screenshot_2025-09-24_105521_fie2v9.png"
      alt="server issue"
      className="no-data-view-img"
    />
    <h1 className="no-data-view-heading">Something went wrong!</h1>
    <button
      type="button"
      className="no-data-view-retry-btn"
      onClick={() => reFetch()}
    >
      retry
    </button>
  </div>
)

export default FailureView
